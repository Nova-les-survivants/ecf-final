<?php

namespace App\Controller;

use App\Repository\RecipeRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @Route("/recipes", name="recipe_")
 */
class RecipeController extends AbstractController
{
    private $recipeRepository;

    public function __construct(RecipeRepository $recipeRepository)
    {
        $this->recipeRepository = $recipeRepository;
    }

    /**
     * @Route("recent", name="recent")
     */
    public function getRecentRecipes()
    {
        $recipes = $this->recipeRepository->findLatest(5);

        return new JsonResponse($recipes);
    }
}
