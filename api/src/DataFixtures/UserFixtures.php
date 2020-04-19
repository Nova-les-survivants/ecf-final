<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    const AMOUNT = 8;

    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
        $this->faker = \Faker\Factory::create('fr_FR');
    }

    private function createUser(string $email, string $password, array $roles = [])
    {
        $user = new User();

        $user
            ->setEmail($email)
            ->setPassword($this->passwordEncoder->encodePassword(
                $user,
                $password
            ))
            ->setRoles($roles)
        ;

        return $user;
    }

    public function load(ObjectManager $manager)
    {
        $manager->persist($this->createUser('admin@test.com', 'admin', ['ROLE_ADMIN']));
        $manager->persist($this->createUser('user@test.com', 'user'));

        for ($i = 0; $i < self::AMOUNT; $i += 1) {
            $manager->persist($this->createUser($this->faker->email(), 'motdepasse'));
        }

        $manager->flush();
    }
}
