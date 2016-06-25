<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Trajet;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\User;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Component\Validator\Constraints\DateTime;

class UsersController extends Controller
{
    /**
     * @return array
     * @View()
     */
    public function getUsersAction()
    {
        $em = $this->getDoctrine()->getManager();
        $result[] = null;

        $users = $em->getRepository('AppBundle:User')->findBy(
            array(),
            array("pointGlobal" => "ASC")
        );
        foreach($users as $user) {
            $trajets = $em->getRepository('AppBundle:Trajet')->findBy(
                array('user' => $user)
            );
            $points = $em->getRepository('AppBundle:Point')->findBy(
                array('user' => $user)
            );
            $result[$user->getId()] = array($user, array('points' => $points), array('trajets' => $trajets));
        }

        return array('users' => $result);
    }

    /**
     * @param string $token
     * @return array
     * @View()
     */
    public function getUserAction($token)
    {
        $em = $this->getDoctrine()->getManager();

        $result[] = null;

        $user= $em->getRepository('AppBundle:User')->findOneBy(
            array('token' => $token)
        );

        $trajets = $em->getRepository('AppBundle:Trajet')->findBy(
            array('user' => $user)
        );
        $points = $em->getRepository('AppBundle:Point')->findBy(
            array('user' => $user)
        );

        $result = array($user, array('points' => $points), array('trajets' => $trajets));

        return $result;
    }

    public function postUsersTrajetsAction(Request $request, $token)
    {
        $trajet = json_decode($request->get("trajet"), true);

        if ($trajet != null) {
            $kmGood = $trajet["km_good"];
            $kmNotGood = $trajet["km_not_good"];


            $em = $this->getDoctrine()->getManager();
            $entity = new Trajet();
            $entity->setKmGood($kmGood);
            $entity->setKmNotGood($kmNotGood);

            $user = $em->getRepository('AppBundle:User')->findOneBy(
                array('token' => $token)
            );

            $point = $kmGood - $kmNotGood;
            $user->setPointGlobal($user->getPointGlobal()+$point);

            $pointEntity =  $em->getRepository('AppBundle:Point')->findOneBy(
                array('user' => $user),
                array('createdAt' => 'ASC')
            );

            if ($pointEntity == null || $pointEntity->getCreatedAt()->format('m') != (new \DateTime())->format('m')) {
                $pointEntity = new Point();
                $pointEntity->setValue($point);
                $pointEntity->setUser($user);
            } else {
                $pointEntity->setValue($pointEntity->getValue()+$point);
                $pointEntity->setUpdatedAt(new \DateTime());
            }

            $entity->setUser($user);

            $em->persist($user);
            $em->persist($entity);
            $em->persist($pointEntity);
            $em->flush();

            return $entity;
        }

        return "";
    }
}
