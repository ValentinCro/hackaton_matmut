<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * User
 *
 * @ORM\Table(name="user")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRepository")
 * @UniqueEntity(fields="token", message="Token is already in use")
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
     * @ORM\Column(name="token", type="text", length=255)
     */
    private $token;

    /**
     * @var int
     *
     * @ORM\Column(name="point_global", type="integer")
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
     * Set pointGlobals
     *
     * @param int $pointGlobal
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
     * @return int
     */
    public function getPointGlobal()
    {
        return $this->pointGlobal;
    }
}

