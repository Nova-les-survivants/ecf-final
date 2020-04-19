<?php

namespace App\Controller;

use App\Entity\Recipe;
use App\Entity\RecipeIngredient;
use App\Repository\RecipeRepository;
use App\Repository\IngredientRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/recipes", name="recipe_")
 */
class RecipeController extends AbstractController
{
    private $recipeRepository;
    private $manager;

    public function __construct(
        RecipeRepository $recipeRepository,
        EntityManagerInterface $manager
    )
    {
        $this->recipeRepository = $recipeRepository;
        $this->manager = $manager;
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
     * @IsGranted("ROLE_USER")
     * @Route("/", name="create", methods={"POST"})
     */
    public function create(Request $request, IngredientRepository $ingredientRepository)
    {
        $receivedRecipe = json_decode($request->getContent(), true);

        $recipe = new Recipe();
        $recipe
            ->setUser($this->getUser())
            ->setName($receivedRecipe['name'])
            ->setInstructions($receivedRecipe['instructions'])
            ->setPictureUrl($receivedRecipe['pictureUrl'])
        ;
            
        foreach ($receivedRecipe['ingredients'] as $ingredientData)
        {
            $ingredient = $ingredientRepository->find($ingredientData['id']);

            $recipeIngredient = new RecipeIngredient();
            $recipeIngredient
                ->setRecipe($recipe)
                ->setMeasure($ingredientData['measure'])
                ->setIngredient($ingredient)
            ;

            $this->manager->persist($recipeIngredient);

            $recipe->addRecipeIngredient($recipeIngredient);
        }

        $this->manager->persist($recipe);
        $this->manager->flush();
        
        return new JsonResponse(null);
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/{id<\d+>}", name="update", methods={"PUT"})
     */
    public function update(Recipe $recipe, Request $request, IngredientRepository $ingredientRepository)
    {
        $receivedRecipe = json_decode($request->getContent(), true);

        $recipe
            ->setUser($this->getUser())
            ->setName($receivedRecipe['name'])
            ->setInstructions($receivedRecipe['instructions'])
            ->setPictureUrl($receivedRecipe['pictureUrl'])
        ;

        foreach ($receivedRecipe['ingredients'] as $ingredientData)
        {
            $ingredient = $ingredientRepository->find($ingredientData['id']);

            $recipeIngredient = new RecipeIngredient();
            $recipeIngredient
                ->setRecipe($recipe)
                ->setMeasure($ingredientData['measure'])
                ->setIngredient($ingredient)
            ;

            $this->manager->persist($recipeIngredient);

            $recipe->addRecipeIngredient($recipeIngredient);
        }

        $this->manager->persist($recipe);
        $this->manager->flush();
        
        return new JsonResponse(null);
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/{id<\d+>}", name="delete", methods={"DELETE"})
     */
    public function delete(Recipe $recipe)
    {
        $this->manager->remove($recipe);
        $this->manager->flush();

        return new JsonResponse(null);
    }
}
