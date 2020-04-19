<?php

namespace App\Controller;

use App\Entity\Recipe;
use App\Repository\RecipeRepository;
use Symfony\Component\HttpFoundation\Request;
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
     * @Route("/create", name="create", methods={"POST"})
     */
    public function create(Request $request)
    {
        $receivedRecipe = json_decode($request->getContent());

        if (!empty($receivedRecipe)) {
            $recipe = new Recipe();
            $recipe
                ->setUser($this->getUser())
                ->setName($receivedRecipe['name'])
                ->setUri($receivedRecipe['uri'])
                ->setUrl($receivedRecipe['url'])
                ->setPortion($receivedRecipe['portion'])
                ->setPictureUrl($receivedRecipe['pictureUrl'])
                ->settotalTime($receivedRecipe['uri'])
                ->setPreparationTime($receivedRecipe['preparationTime'])
                ->setBakeTime($receivedRecipe['bakeTime'])
                ->setRestTime($receivedRecipe['restTime'])
            ;
                
                foreach ($receivedRecipe['tags'] as $tag)
                {
                    $recipe->addTag($tag);
                } 
                
                foreach ($receivedRecipe['recipeIngredients'] as $ingredient)
                {
                    $recipe->addRecipeIngredient($ingredient);
                }
    
            
            $this->manager->persist($recipe);
            $this->manager-flush();
            
            return new JsonResponse(JsonResponse::HTTP_CREATED);
        } else {
            return new JsonResponse(JsonResponse::HTTP_NO_CONTENT);
        }
    }
}
