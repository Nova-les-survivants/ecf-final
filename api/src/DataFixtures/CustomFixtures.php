<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

abstract class CustomFixtures extends Fixture
{
    protected $faker;

    public function __construct() {
        $this->faker = Faker\Factory::create('fr_FR');
    }

    public function load(ObjectManager $manager)
    {
        $this->beforeCreate();

        for ($i = 0; $i < static::AMOUNT; $i += 1) {
            $object = $this->createObject($i);
            $manager->persist($object);
        }

        $manager->flush();
    }

    protected function beforeCreate() { }

    abstract protected function createObject();

    abstract protected function amount(): int;
}
