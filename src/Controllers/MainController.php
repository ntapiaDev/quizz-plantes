<?php
namespace App\Controllers;

use App\Core\Form;
use App\Models\UsersModel;

class MainController extends Controller
{
    /**
     * Affiche la page principale du blog
     *
     * @return void
     */
    public function index()
    {
        if(isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
        } else {
            $user = [];
        }

        $this->twig->display('main/index.html.twig');
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
                    header('Location: /user/login');
                    exit;
                }
                
                $user = $userModel->hydrate($userArray);
                if(password_verify($_POST['password'], $user->getPassword())) {
                    $user->setSession();
                    header('Location: /');
                    exit;
                } else {
                    $_SESSION['erreur'] = 'Le pseudo et/ou le mot de passe est incorrect.';
                    header('Location: /main/login');
                    exit;
                }
            } else {
                $_SESSION['erreur'] = "Vous n'avez pas rempli tous les champs demandés.";
            }
        }
        $form = new Form;

        $form->debutForm()
            ->ajoutLabelFor('username', 'Votre pseudo :')
            ->ajoutInput('text', 'username', ['id' => 'username', 'class' => '', 'placeholder' => 'Pseudo'])
            ->ajoutLabelFor('password', 'Votre mot de passe :')
            ->ajoutInput('password', 'password', ['id' => 'password', 'class' => '', 'placeholder' => 'Mot de passe'])
            ->ajoutBouton('Me connecter', ['class' => ''])
            ->finForm();
    
        $this->twig->display('main/login.html.twig', [
            'loginForm' => $form->create(),
            'message' => isset($_SESSION['erreur']) ? $_SESSION['erreur'] : '']);
    }

    public function register()
    {
        $this->twig->display('main/register.html.twig');
    }

    
}