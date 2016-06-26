<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Advice;
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
        $trajet->setKmNotGood(0);
        $trajet->setKmGood(0);

        $point = new Point();
        $point->setValue(0);

        $toto = new User();
        $toto->setToken('toto');
        $toto->setPointGlobal(0);

        $titi = new User();
        $titi->setToken('titi');
        $titi->setPointGlobal(0);

        $advice = new Advice();
        $advice->setText("La consommation d'alcool reste la première cause d'accidents sur les routes françaises et est impliquée dans près d'un quart des accidents mortels (23,8%) chez les jeunes de 18 à 24 ans.");

        $advice2 = new Advice();
        $advice2->setText("N’oubliez pas d’avoir toujours à disposition un éthylotest en état de fonctionnement dans votre voiture.");

        $advice3 = new Advice();
        $advice3->setText("Si ce n’est pas vous qui conduisez, faites souffler votre ami conducteur, vous pourrez peut être sauver sa vie… et la vôtre !");

        $advice4 = new Advice();
        $advice4->setText("Gare aussi à la consommation de stupéfiants et de certains médicaments. Elle altère la concentration et peut provoquer des assoupissements au volant.");

        $advice5 = new Advice();
        $advice5->setText("Les excès de vitesse coûtent cher... En vies, en contraventions et en points sur le permis. Il est estimé que la vitesse est en cause dans 25% des accidents mortels.");

        $trajet->setUser($toto);
        $point->setUser($toto);

        $manager->persist($advice);
        $manager->persist($advice2);
        $manager->persist($advice3);
        $manager->persist($advice4);
        $manager->persist($advice5);
        $manager->persist($toto);
        $manager->persist($titi);
        $manager->persist($trajet);
        $manager->persist($point);

        $manager->flush();
    }

}