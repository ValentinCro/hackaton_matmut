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
        $toto->setTendance('toto');
        $toto->setEmail('toto@toto.org');

        $titi  = new User();
        $titi->setUsername('titi');
        $titi->setPassword('titi');
        $titi->setEmail('titi@titi.org');

        $manager->persist($toto);
        $manager->persist($titi);

        $manager->flush();
    }

}