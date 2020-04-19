# Examen en cours de formation

> _Bonjour, nous vous remercions pour cette dernière version fort prometteuse de notre application weCook.ie. Par rapport à notre [cahier des charges](https://docs.google.com/document/d/1KT46eb-CC8BdTpFKmpK3Ro0I69kkpuPE2cXIXuv2Z3w/edit?usp=sharing), il manque ce qui concerne les favoris (mettre une recette en favori, obtenir une liste des recettes les plus populaires). Egalement, nous avons remarqué qu'il est possible de se connecter, mais pas de s'inscrire, est-ce normal? Enfin, et après concertation avec l'équipe, nous aimerions remplacer le champ "instructions" actuel par une liste d'étapes (à la manière de la liste d'ingrédients), si possible. Cela permettrait aux contributeurs d'expliquer leurs recettes étape par étape, en précisant quel ingrédient de la recette est nécessaire à ce moment-là. Nous attendons votre retour par rapport à cette demande._

---

## Déroulement de l'examen

---

### Autorisations

- ✔️ Vous pouvez **chercher des réponses sur Internet**.
- ✔️ Vous pouvez **relire vos notes de cours**.
- ✔️ Vous pouvez **accéder aux dépôts vus en cours**.
- ✔️ Vous pouvez **copier-coller du code utilisé en cours**.
- ❌ En revanche, vous devez travailler de manière **individuelle**. Vous ne pouvez **pas** vous entraider. Vous ne pouvez **pas** consulter, et encore moins copier-coller le travail de vos camarades.

> ⚠️ _Et évitez de le faire, parce que ça se verra._

---

### Structure de l'épreuve

L'épreuve s'articule autour de trois points principaux:

- **Analyse de l'existant**: lire et tester le code déjà présent, être capable de le réutiliser et de l'améliorer, donner un avis critique sur les choix techniques.
- **Mise en place de fonctionnalités**: déterminer les éléments nécessaires à la création de nouvelles fonctionnalités à partir de la demande client et les mettre en oeuvre.
- **Tests et corrections**: à partir du _feedback_ d'utilisateurs, déterminer d'où vient un problème, et être capable de proposer une démarche pour le tester et le corriger.

Il n'y a pas d'ordre strict, vous serez libre de coder les fonctionnalités que vous jugez les plus abordables ou intéressantes. N'oubliez pas néanmoins que cette épreuve doit permettre d'évaluer l'ensemble des compétences professionnelles du REAC, votre travail doit donc refléter votre savoir-faire dans tous les aspects du développement. Lisez bien l'ensemble du sujet avant de commencer à travailler.

L'examen dure de 9h00 à 17h00. Vous pouvez néanmoins publier des _commits_ jusqu'à 18h00 afin de vous laisser un peu de marge.

---

### Gestion du projet Git

Pour chaque fonctionnalité que vous codez, vous **devez impérativement** créer une branche dans votre dépôt. Ces branches permettront de séparer les différentes parties du code. Elles vous permettront également de créer un _commit_ d'un code non-fonctionnel pour permettre d'évaluer votre travail, sans que cela n'ait d'impact sur le fonctionnement des autres branches. Elles permettront également de valider la compétence professionnelle n°9. A cet effet, vous pouvez fusionner vos branches au fur et à mesure mais **pas** les effacer.

---

### En cas de problème

Comme personne n'est parfait, il n'est pas exclu que cet examen contienne des coquilles. Si vous constatez une difficulté de nature bloquante, **n'hésitez pas** à en faire part à votre formateur, qui pourra rectifier le cas échéant.

---

## Installation du projet

---

### 1. Cloner le projet

### 2. Installation des dépendances

- Dans le dossier **/api**: `composer install`
- Dans le dossier **/client**: `yarn`

### 3. Configurer la base de données

- Dans le dossier **/api**, créer une copie du fichier **.env** nommée **.env.local** dans laquelle vous remplacerez la constante `DATABASE_URL` par le chemin de votre base de données.
> _Exemple:_ `DATABASE_URL=mysql://root:ROOT@127.0.0.1:3306/ecf-final?serverVersion=mariadb-10.4.12`

- Créer la base de données: `php bin/console doctrine:database:create`

- Exécuter les migrations: `php bin/console doctrine:migrations:migrate`

- Exécuter les _fixtures_: `php bin/console doctrine:fixtures:load`

### 4. Lancer les serveurs

- Dans le dossier **/api**: `symfony server:start`
- Dans le dossier **/client**: `yarn start`

> _Note: l'application React vous prévient si le serveur Symfony ne s'est pas lancé correctement._

### Note technique

L'application React inclut la bibliothèque Redux, qui permet de passer les informations de l'utilisateur actuellement connecté partout là où elles sont requises. Chaque composant qui a besoin de ses informations est encapsulé dans la fonction `withCurrentUser`, qui lui permet de récupérer dans ses _props_ l'objet `currentUser`, ainsi que les actions qui permettent de modiifier son état.

Cette note a pour but de démystifier le fonctionnement de ce composant, mais il n'est **pas** attendu de vous que vous utilisiez Redux, ou le code du dossier **/redux**, d'une quelconque façon. Vous pouvez considérer que `currentUser` est un _prop_ normal hérité directement du parent.

> ⚠️ _Je répète, n'essayez **pas** d'utiliser Redux._

---

## Travail à réaliser

---

### Conception de l'application

Lisez attentivement le cahier des charges et la demande client. Vérifiez que le modèle conceptuel de données (MCD) est complet, et si ce n'est pas le cas, mettez-le à jour en créant une copie du modèle fourni.

> _Adresse de mon MCD:_

A l'aide de LucidChart ou d'un autre outil de création de diagramme, créez un schéma représentant les différentes parties de l'application, et la façon dont elles sont organisées les unes par rapport aux autres.

> _Adresse de mon schéma:_

---

### Analyse de l'existant

Lancez et testez soigneusement les différentes fonctionnalités de l'application. En testant l'application et en lisant le code, vous devriez reamrquer plusieurs défauts. Pour chaque défaut que vous constatez, répondez aux questions suivantes:

> - _Quel est le défaut que j'ai constaté:_
> - _En quoi cela peut-il poser problème:_
> - _Que puis-je mettre en place pour régler ce défaut:_
> - _En quoi ma solution est-elle meilleure que le code existant:_

Vous pouvez réaliser ce travail au fur et à mesure que vous codez de nouvelles fonctionnalités et que vous découvrez différentes parties du code.

---

### Mise en place de fonctionnalités

Implémentez les améliorations demandées par le client. Vous n'aurez probablement pas le temps de tout traiter, aussi choisissez stratégiquement les fonctionnalités que vous voulez essayer de mettre en place. Dans l'ensemble, votre travail devra contenir chacun des éléments suivants:

- Au moins un composant/une page dans l'interface utilisateur
- Au moins une requête AJAX
- Au moins une méthode/un contrôleur dans l'API
- Au moins une requête à la base de données (idéalement avec le _query builder_ de Doctrine)

---

### Résolution de problèmes

Pour chacun des rapports de bug reçus, répondez aux questions correspondantes, et essayez de coder un correctif. Attention, les rapports de bug sont souvent imprécis, voire trompeurs. A vous de faire le travail de recherche nécessaire pour bien délimiter le périmètre de chaque problème.

#### _"Quand je modifie une recette, les ingrédients ne sont pas bons!"_

> - _Dans quel fichier se trouver le code responsable du problème_:
> - _Quelle est la cause du problème_:
> - _Que faudrait-il mettre en place pour résoudre le problème:_

#### _"Une de mes recettes a été supprimée alors que je n'ai pas cliqué sur le bouton!"_

> - _Dans quel fichier se trouver le code responsable du problème_:
> - _Quelle est la cause du problème_:
> - _Que faudrait-il mettre en place pour résoudre le problème:_

#### _"Je peux créer une nouvelle recette même si je suis déconnecté!"_

> - _Dans quel fichier se trouver le code responsable du problème_:
> - _Quelle est la cause du problème_:
> - _Que faudrait-il mettre en place pour résoudre le problème:_

---

### Tests automatisés

Réaliser au moins un test automatisé qui permette de valider le bon fonctionnement d'un contrôleur CRUD. Le test devrait commencer par créer un nouvel enregistrement en base de données, afin de vérifier que les routes d'accès/modification/suppression renvoient bien les réponses attendues.
