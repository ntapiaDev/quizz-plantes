<?php
session_start();
// Vérification que les valeurs de la variables globale sois présentes
if (isset($_POST['username']) && isset($_POST['password'])) {
    // Etablissement de la connexion avec la base de données
    $db_username = 'root';
    $db_password = 'BrokenButterfly';

    try {
        $db = new PDO('mysql:host=localhost:3306;dbname=authtest', $db_username, $db_password);
    } catch (PDOException $e) {
        print "Erreur!: " . $e->getMessage() . "<br/>";
        die();
    }

    // Utilisation de htmlspecialchars pour empécher les attaques injections avec le password hash 

    $lastname = htmlspecialchars($_POST['lastname']);
    $firstname = htmlspecialchars($_POST['firstname']);
    $username = htmlspecialchars($_POST['username']);
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars(password_hash($_POST['password'], PASSWORD_DEFAULT));

    // Vérification la présence de contenu dans les variables
    if ($lastname !== '' && $firstname !== '' && $username !== '' && $email !== '' && $password !== '') {
        $request = 'INSERT INTO authuser VALUES (:lastname, :firstname, :username, :email, :password)';
        $statement = $db->prepare($request);
        $statement->bindParam('lastname', $lastname, PDO::PARAM_STR);
        $statement->bindParam('firstname', $firstname, PDO::PARAM_STR);
        $statement->bindParam('username', $username, PDO::PARAM_STR);
        $statement->bindParam('email', $username, PDO::PARAM_STR);
        $statement->bindParam('password', $password, PDO::PARAM_STR);
        $statement->execute();
        $_SESSION['username'] = $username;
        header('Location: main.php');
    } else {
        header('Location: index.php?erreur=1'); // Champs vides
    }
} else {
    header('Location: index.php');
}
