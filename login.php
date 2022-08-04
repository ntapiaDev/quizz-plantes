<?php
session_start();
// Vérification que les valeurs de la variables globale sois présentes
if (isset($_POST['username']) && isset($_POST['password'])) {
    // Etablissement de la connexion avec la base de données
    $db_username = 'root';
    $db_password = 'BrokenButterfly';

    try {
        $db = new PDO('mysql:host=localhost:3306;dbname=logintest', $db_username, $db_password);
    } catch (PDOException $e) {
        print "Erreur!: " . $e->getMessage() . "<br/>";
        die();
    }

    // Utilisation de htmlspecialchars pour empécher les attaques injections
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['password']);

    // Vérification la présence de contenu dans les variables
    if ($username !== '' && $password !== '') {
        $request = 'SELECT count(*) FROM loginuser where 
        nom_utilisateur = :username and mot_de_passe = :password';
        $statement = $db->prepare($request);
        $statement->bindParam('username', $username, PDO::PARAM_STR);
        $statement->bindParam('password', $password, PDO::PARAM_STR);
        $statement->execute();
        // Vérification de la présence de l'élèment
        if($statement->rowCount() !== 0){
            $_SESSION['username'] = $username;
            header('Location: main.php');
        } else {
            header('Location: login.php?erreur=1'); // User et Mdp incorrect
        }

    } else {
        header('Location: index.php?erreur=2'); // User et Mdp vide
    }
} else {
    header('Location: index.php');
}
