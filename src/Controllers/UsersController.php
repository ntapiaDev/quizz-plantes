<?php
namespace App\Controllers;

use App\Core\Form;
use App\Models\UsersModel;

class UsersController extends Controller
{
    /**
     * Affiche la page principale du blog
     *
     * @return void
     */
    public function index()
    {
        // if(isset($_SESSION['user'])) {
        //     $user = $_SESSION['user'];
        // } else {
        //     $user = [];
        // }

        $this->twig->display('users/index.html.twig');
    }

    public function login()
    {
        if(isset($_SESSION['user'])) {
            header('Location: /');
            exit;
        }
    
        if(!empty($_POST)) {
            if(isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['password']) && !empty($_POST['password'])) {
                $userModel = new UsersModel;
                $userArray = $userModel->findOneByUsername(strip_tags($_POST['username']));
                if(!$userArray) {
                    $_SESSION['erreur'] = 'Le pseudo et/ou le mot de passe est incorrect.';
                    header('Location: /users/login');
                    exit;
                }
                
                $user = $userModel->hydrate($userArray);
                if(password_verify($_POST['password'], $user->getPassword())) {
                    $user->setSession();
                    header('Location: /quizz');
                    exit;
                } else {
                    $_SESSION['erreur'] = 'Le pseudo et/ou le mot de passe est incorrect.';
                    header('Location: /users/login');
                    exit;
                }
            } else {
                $_SESSION['erreur'] = "Vous n'avez pas rempli tous les champs demandés.";
            }
        }
        $form = new Form;

        $form->debutForm()
            ->ajoutLabelFor('input_pseudo', 'Votre pseudo :')
            ->ajoutInput('text', 'username', ['id' => 'input_pseudo', 'class' => 'form-control', 'placeholder' => 'Pseudo'])
            ->ajoutLabelFor('password', 'Votre mot de passe :')
            ->ajoutInput('password', 'password', ['id' => 'password', 'class' => 'form-control', 'placeholder' => 'Mot de passe'])
            ->ajoutBouton('Me connecter', ['class' => 'btn_form'])
            ->finForm();
    
        $this->twig->display('users/login.html.twig', [
            'loginForm' => $form->create(),
            'message' => isset($_SESSION['erreur']) ? $_SESSION['erreur'] : '']);
    }

    public function register()
    {
        if(isset($_SESSION['user'])) {
            header('Location: /');
            exit;
        }

        if(!empty($_POST)) {
                $lastname = strip_tags($_POST['lastname']);
                $firstname = strip_tags($_POST['firstname']);
                $username = strip_tags($_POST['username']);
                $email = strip_tags($_POST['email']);
                $password = password_hash($_POST['password'], PASSWORD_ARGON2I);
                
                $user = new UsersModel;
                $user->setLastname($lastname)
                    ->setFirstname($firstname)
                    ->setUsername($username)
                    ->setEmail($email)
                    ->setPassword($password);
    
                $user->create();
                header('Location: /');
                exit;
        } 
        $lastname = isset($_POST['lastname']) ? strip_tags($_POST['lastname']) : '';
        $firstname = isset($_POST['firstname']) ? strip_tags($_POST['firstname']) : '';
        $username = isset($_POST['username']) ? strip_tags($_POST['firstname']) : '';
        $email = isset($_POST['email']) ? strip_tags($_POST['email']) : '';
        
        
        $form = new Form;

        $form->debutForm('post', '#', ['enctype' => 'multipart/form-data'])
            ->ajoutLabelFor('lastname', 'Votre nom :')
            ->ajoutInput('text', 'lastname', ['id' => 'lastname', 'class' => 'form-control', 'placeholder' => 'Nom', 'value' => $lastname])
            ->ajoutLabelFor('firstname', 'Votre prénom :')
            ->ajoutInput('text', 'firstname', ['id' => 'firstname', 'class' => 'form-control', 'placeholder' => 'Prénom', 'value' => $firstname])
            ->ajoutLabelFor('username', 'Votre pseudo :')
            ->ajoutInput('text', 'username', ['id' => 'username', 'class' => 'form-control', 'placeholder' => 'Pseudo', 'value' => $username])
            ->ajoutLabelFor('email', 'Votre email :')
            ->ajoutInput('email', 'email', ['id' => 'email', 'class' => 'form-control', 'placeholder' => 'Adresse email', 'value' => $email])
            ->ajoutLabelFor('password', 'Votre mot de passe :')
            ->ajoutInput('password', 'password', ['id' => 'password', 'class' => 'form-control', 'placeholder' => 'Mot de passe'])
            ->ajoutBouton('M\'enregistrer', ['class' => 'btn_form'])
            ->finForm();

            $this->twig->display('users/register.html.twig', [
            'registerForm' => $form->create(),
            'message' => isset($_SESSION['erreur']) ? $_SESSION['erreur'] : ''
        ]);
        unset($_SESSION['erreur']);
    }
}
