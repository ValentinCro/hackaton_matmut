<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\User;

class LoadUserData implements FixtureInterface
{
    /**
     * Load data fixtures with the passed EntityManager
     *
     *
     */
    public function load(ObjectManager $manager)
    {
        $toto = new User();
        $toto->setToken('toto');
        $toto->setPointGlobal(0);

        $titi  = new User();
        $titi->setToken('titi');
        $titi->setPointGlobal(0);

        $manager->persist($toto);
        $manager->persist($titi);

        $manager->flush();
    }

}