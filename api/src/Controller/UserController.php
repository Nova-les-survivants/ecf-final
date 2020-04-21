<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Security\TokenAuthenticator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @Route("/user", name="user_")
 */
class UserController extends AbstractController
{
    private $authenticator;
    private $guardHandler;
    private $userRepository;
    private $passwordEncoder;
    private $validator;
    private $entityManager;

    public function __construct(
        TokenAuthenticator $authenticator,
        GuardAuthenticatorHandler $guardHandler,
        UserRepository $userRepository,
        UserPasswordEncoderInterface $passwordEncoder,
        ValidatorInterface $validator,
        EntityManagerInterface $entityManager
    )
    {
        $this->authenticator = $authenticator;
        $this->guardHandler = $guardHandler;
        $this->userRepository = $userRepository;
        $this->passwordEncoder = $passwordEncoder;
        $this->validator = $validator;
        $this->entityManager = $entityManager;
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/current", name="get-current")
     */
    public function getCurrent() {
        $user = $this->getUser();

        return new JsonResponse($user);
    }

    /**
     * @Route("/{id<\d+>}/recipes", name="get-recipes", methods={"GET"})
     */
    public function getRecipes(User $user)
    {
        $recipes = $user->getRecipes();

        return new JsonResponse($recipes->getValues());
    }

    /**
     * @Route("/", methods={"POST"}, name="create")
     */
    public function create(Request $request)
    {
        $userData = \json_decode($request->getContent(), true);

        if (strlen($userData['password']) < 8) {
            throw new BadRequestHttpException("Password must be at least 8 characters long.");
        }

        $user = new User();

        $user
            ->setEmail($userData['username'])
            ->setPassword($this->passwordEncoder->encodePassword(
                $user,
                $userData['password']
            ))
        ;

        $violationList = $this->validator->validate($user);

        if (count($violationList) > 0) {
            throw new BadRequestHttpException( (string) $violationList);
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        if ($userData['autoconnect'] === true) {
            $this->guardHandler->authenticateUserAndHandleSuccess(
                $user,          // the User object you just created
                $request,
                $this->authenticator, // authenticator whose onAuthenticationSuccess you want to use
                'main'          // the name of your firewall in security.yaml
            );
        }

        return new JsonResponse($user, JsonResponse::HTTP_CREATED);
    }
}
