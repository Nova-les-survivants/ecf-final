<?php

namespace App\DataFixtures;

use Faker\Factory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\DataFixtures\DataProviders\MealIdProvider;
use App\DataFixtures\DataProviders\MealDbIdProvider;
use App\Entity\Recipe;

class AppFixtures extends Fixture
{
    const AMOUNT_RECIPES = 10;

    protected $faker;
    private $data;

    public function __construct() {
        $this->faker = Factory::create('en_US');
        $this->data = [];
    }

    public function load(ObjectManager $manager)
    {
        $this->createRecipes();

        foreach ($this->data as $dataType => $items) {
            foreach ($items as $item) $manager->persist($item);
        }

        $manager->flush();
    }

    private function createRecipes()
    {
        echo 'Creating recipes :-)'.PHP_EOL;

        $recipes = [];

        $mealDbId = MealDbIdProvider::getmealDbId(self::AMOUNT_RECIPES);

        $data = file_get_contents('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' . $mealDbId);

        $json_data = json_decode($data, true);

        $recipe = new Recipe();
        $recipe->setName($json_data['meals']['strMeal']);
    }

    private function createIngredients()
    {

    }

    private function createTags()
    {
        
    }
}