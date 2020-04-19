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
     * @Route("/", name="get-all", methods={"GET"})
     */
    public function getAll()
    {
        return new JsonResponse($this->recipeRepository->findAll());
    }

    /**
     * @Route("/{id<\d+>}", name="get-by-id", methods={"GET"})
     */
    public function getById(Recipe $recipe)
    {
        return new JsonResponse($recipe);
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
