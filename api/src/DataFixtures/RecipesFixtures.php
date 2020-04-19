<?php

namespace App\DataFixtures;

use App\Entity\Tag;
use App\Entity\Recipe;
use App\Entity\Ingredient;
use App\Entity\RecipeIngredient;
use App\Repository\UserRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\DataFixtures\DataProviders\MealDbIdProvider;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class RecipesFixtures extends Fixture implements DependentFixtureInterface
{
    const RECIPES_AMOUNT = 10;

    private $faker;
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->faker = \Faker\Factory::create('fr_FR');
        $this->userRepository = $userRepository;
    }

    public function load(ObjectManager $manager)
    {
        $ingredients = [];
        $tags = [];

        $users = $this->userRepository->findAll();

        foreach(MealDbIdProvider::getmealDbId(self::RECIPES_AMOUNT) as $id) {
            $data = file_get_contents('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' . $id);

            $json_data = json_decode($data, true);
    
            $recipeData = $json_data['meals'][0];

            echo 'Generating data for meal #' . $id . ' (' . $recipeData['strMeal'] . ')' . PHP_EOL;

            $recipe = new Recipe();
            $recipe
                ->setName($recipeData['strMeal'])
                ->setCreatedAt($this->faker->dateTime())
                ->setPictureUrl($recipeData['strMealThumb'])
                ->setUser($users[rand(0, sizeof($users) - 1)])
            ;

            $tagNames = explode(',', $recipeData['strTags']);
            foreach ($tagNames as $tagName) {
                if (empty($tagName)) { continue; }

                if (isset($tags[$tagName])) {
                    $tag = $tags[$tagName];
                } else {
                    echo 'Generating new Tag "' . $tagName . '"' . PHP_EOL;

                    $tag = new Tag();

                    $tag->setName($tagName);

                    $tags[$tagName] = $tag;
                    $manager->persist($tag);
                }

                $recipe->addTag($tag);
            }

            for ($i = 1; $i <= 20; $i += 1) {
                if (!isset($recipeData['strIngredient' . $i])) { break; }
    
                $ingredientName = $recipeData['strIngredient' . $i];
    
                if (is_null($ingredientName)) { break; }
    
                if (empty($ingredientName)) { continue; }
    
                if (isset($ingredients[$ingredientName])) {
                    $ingredient = $ingredients[$ingredientName];
                } else {
                    echo 'Generating new Ingredient "' . $ingredientName . '"' . PHP_EOL;

                    $ingredient = new Ingredient();
    
                    $ingredient->setName($ingredientName);
    
                    $ingredients[$ingredientName] = $ingredient;
                    $manager->persist($ingredient);
                }
    
                $recipeIngredient = new RecipeIngredient();
    
                $recipeIngredient
                    ->setIngredient($ingredient)
                    ->setMeasure($recipeData['strMeasure' . $i])
                    ->setRecipe($recipe)
                ;
    
                $manager->persist($recipeIngredient);
            }

            $manager->persist($recipe);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return array(UserFixtures::class);
    }
}