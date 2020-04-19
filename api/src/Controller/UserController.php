<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/user", name="user_")
 */
class UserController extends AbstractController
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/current", name="get-current")
     */
    public function getCurrent() {
        $user = $this->getUser();

        return new JsonResponse($user);
    }

    /**
     * @Route("/{id<\d+>}/recipes", name="get-recipes", methods="{GET}")
     */
    public function getRecipes(User $user)
    {
        $recipes = $this->userRepository->findRecipes($user->getId());

        return new JsonResponse($recipes);
    }
}
