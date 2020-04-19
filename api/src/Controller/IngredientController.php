<?php

namespace App\Controller;

use App\Repository\IngredientRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/ingredients", name="ingredients_")
 */
class IngredientController extends AbstractController
{
    private $ingredientRepository;

    public function __construct(IngredientRepository $ingredientRepository)
    {
        $this->ingredientRepository = $ingredientRepository;
    }

    /**
     * @Route("/", methods={"GET"}, name="get-all")
     */
    public function getAll()
    {
        return new JsonResponse($this->ingredientRepository->findAll());
    }
}
