<?php

namespace App\DataFixtures\DataProviders;

class MealDbIdProvider extends \Faker\Provider\Base
{
    protected static $mealDbId = [
        52794,
        52833,
        52854,
        52855,
        52858,
        52861,
        52888,
        52894,
        52897,
        52899,
        52900,
        52901,
        52902,
        52921,
        52970,
        52990,
        53007,
    ];

    public static function getmealDbId($amount){
        return static::randomElements(static::$mealDbId, $amount);
    }
}