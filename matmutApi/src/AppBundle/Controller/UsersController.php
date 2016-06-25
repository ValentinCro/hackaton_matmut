<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\User;

class UsersController extends Controller
{
    /**
     * @return array
<<<<<<< HEAD
=======
     *
>>>>>>> 6a728334c639c0075374ca10c5300fee18c16eca
     */
    public function getUsersAction()
    {
        $em = $this->getDoctrine()->getManager();

        $users = $em->getRepository('AppBundle:User')->findAll();

        return array('users' => $users);
//        return new Response("ta mère");
    }

    /**
     * @param string $token
     * @return array
<<<<<<< HEAD
=======
     *
>>>>>>> 6a728334c639c0075374ca10c5300fee18c16eca
     */
    public function getUserAction($token)
    {
        $em = $this->getDoctrine()->getManager();

        $users = $em->getRepository('AppBundle:User')->findBy(
            array('token'=>$token)
        );

        return array('user' => $users);
    }
}
