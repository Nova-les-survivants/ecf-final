<?php

namespace App\DataFixtures;

use App\Entity\Ingredient;
use App\DataFixtures\CustomFixtures;

class IngredientFixtures extends CustomFixtures
{
    const AMOUNT = 30;

    protected function createObject()
    {
        $object = new Ingredient();

        $object->setName();
    }
}