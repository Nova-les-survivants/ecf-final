<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/users", name="users_")
 */
class UserController extends AbstractController
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/{id<\d+>}/recipes", name="_recipes", methods="{GET}")
     */
    public function getRecipes(User $user)
    {
        $recipes = $this->userRepository->findRecipes($user->getId());

        return new JsonResponse($recipes);
    }
}
