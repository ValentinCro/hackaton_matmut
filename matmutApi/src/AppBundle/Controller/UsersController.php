<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\User;
use FOS\RestBundle\Controller\Annotations\View;

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

        $users = $em->getRepository('AppBundle:User')->findAll();
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
}
