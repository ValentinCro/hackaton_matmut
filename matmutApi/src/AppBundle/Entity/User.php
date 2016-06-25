<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Table(name="user")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRepository")
 */
class User
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
     * @ORM\Column(name="token", type="text")
     */
    private $token;

    /**
     * @var string
     *
     */
    private $pointMonth;

    /**
     * @var string
     *
     * @ORM\Column(name="point_global", type="string", length=255)
     */
    private $pointGlobal;


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
     * Set token
     *
     * @param string $token
     *
     * @return User
     */
    public function setToken($token)
    {
        $this->token = $token;

        return $this;
    }

    /**
     * Get token
     *
     * @return string
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * Set pointMonth
     *
     * @param string $pointMonth
     *
     * @return User
     */
    public function setPointMonth($pointMonth)
    {
        $this->pointMonth = $pointMonth;

        return $this;
    }

    /**
     * Get pointMonth
     *
     * @return string
     */
    public function getPointMonth()
    {
        return $this->pointMonth;
    }

    /**
     * Set pointGlobal
     *
     * @param string $pointGlobal
     *
     * @return User
     */
    public function setPointGlobal($pointGlobal)
    {
        $this->pointGlobal = $pointGlobal;

        return $this;
    }

    /**
     * Get pointGlobal
     *
     * @return string
     */
    public function getPointGlobal()
    {
        return $this->pointGlobal;
    }
}

