<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\RecipeIngredientRepository")
 */
class RecipeIngredient implements \JsonSerializable
{
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'measure' => $this->measure,
            'ingredient' => $this->ingredient,
            'recipeId' => $this->recipe->getId(),
        ];
    }

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $measure;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Recipe", inversedBy="recipeIngredients")
     * @ORM\JoinColumn(nullable=false)
     */
    private $recipe;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Ingredient", inversedBy="recipeIngredients")
     * @ORM\JoinColumn(nullable=false)
     */
    private $ingredient;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMeasure(): ?string
    {
        return $this->measure;
    }

    public function setMeasure(string $measure): self
    {
        $this->measure = $measure;

        return $this;
    }

    public function getQuantity(): ?float
    {
        return $this->quantity;
    }

    public function setQuantity(float $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getRecipe(): ?Recipe
    {
        return $this->recipe;
    }

    public function setRecipe(?Recipe $recipe): self
    {
        $this->recipe = $recipe;

        return $this;
    }

    public function getIngredient(): ?Ingredient
    {
        return $this->ingredient;
    }

    public function setIngredient(?Ingredient $ingredient): self
    {
        $this->ingredient = $ingredient;

        return $this;
    }
}
