<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Trajet
 *
 * @ORM\Table(name="trajet")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\TrajetRepository")
 */
class Trajet
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="kmGood", type="decimal", precision=2, scale=0)
     */
    private $kmGood;

    /**
     * @var string
     *
     * @ORM\Column(name="kmNotGood", type="decimal", precision=2, scale=0)
     */
    private $kmNotGood;

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set kmGood
     *
     * @param string $kmGood
     *
     * @return Trajet
     */
    public function setKmGood($kmGood)
    {
        $this->kmGood = $kmGood;

        return $this;
    }

    /**
     * Get kmGood
     *
     * @return string
     */
    public function getKmGood()
    {
        return $this->kmGood;
    }

    /**
     * Set kmNotGood
     *
     * @param string $kmNotGood
     *
     * @return Trajet
     */
    public function setKmNotGood($kmNotGood)
    {
        $this->kmNotGood = $kmNotGood;

        return $this;
    }

    /**
     * Get kmNotGood
     *
     * @return string
     */
    public function getKmNotGood()
    {
        return $this->kmNotGood;
    }

    /**
     * Set idUser
     *
     * @param integer $idUser
     *
     * @return Trajet
     */
    public function setIdUser($idUser)
    {
        $this->idUser = $idUser;

        return $this;
    }

    /**
     * Get idUser
     *
     * @return int
     */
    public function getIdUser()
    {
        return $this->idUser;
    }
}

