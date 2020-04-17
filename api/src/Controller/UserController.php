<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/user", name="user_")
 */
class UserController extends AbstractController
{
    /**
     * @IsGranted("ROLE_USER")
     * @Route("/current", name="get-current")
     */
    public function getCurrent() {
        $user = $this->getUser();

        return new JsonResponse($user);
    }
}
