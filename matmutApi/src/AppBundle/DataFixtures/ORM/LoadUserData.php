<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Point;
use AppBundle\Entity\Trajet;
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
        $trajet = new Trajet();
        $trajet->setKmGood(0);
        $trajet->setKmNotGood(0);

        $point = new Point();
        $point->setValue(0);

        $toto = new User();
        $toto->setToken('toto');
        $toto->setPointGlobal(0);

        $titi  = new User();
        $titi->setToken('titi');
        $titi->setPointGlobal(0);

        $trajet->setUser($toto);
        $point->setUser($toto);

        $manager->persist($trajet);
        $manager->persist($point);
        $manager->persist($toto);
        $manager->persist($titi);

        $manager->flush();
    }

}