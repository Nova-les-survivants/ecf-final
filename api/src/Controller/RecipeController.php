<?php

namespace App\Controller;

use App\Entity\Recipe;
use App\Repository\RecipeRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

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
     * @Route("/recent", name="recent", methods={"GET"})
     */
    public function getRecentRecipes()
    {
        $recipes = $this->recipeRepository->findLatest(5);

        return new JsonResponse($recipes);
    }

    /**
     * @Route("/{id<\d+>", name="create", methods={"POST"})
     */
    public function create()
    {
        $recipe = new Recipe();

        
    }
}
