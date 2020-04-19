<?php

namespace App\DataFixtures\DataProviders;

class MealDbIdProvider extends \Faker\Provider\Base
{
    protected static $mealDbId = [
            52770,
            52771,
            52773,
            52774,
            52775,
            52776,
            52779,
            52780,
            52781,
            52782,
            52783,
            52784,
            52785,
            52786,
            52787,
            52788,
        ];

        public static function getmealDbId($amount){
            return static::randomElements(static::$mealDbId, $amount);
        }
}