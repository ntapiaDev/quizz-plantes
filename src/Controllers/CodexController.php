<?php
namespace App\Controllers;

use App\Models\PlantesModel;
use App\Models\UsersModel;

class CodexController extends Controller
{
    /**
     * Affiche la page de codex
     *
     * @return void
     */
    public function index()
    {
        UsersModel::isLogged();
        $isAdmin = UsersModel::isAdmin();

        $plantesModel = new PlantesModel;
        $plantes = $plantesModel->findAllPlants();
        $familles = $plantesModel->getFamilies();
        $categories = $plantesModel->getCategories();

        // if(isset($_GET['page'])) {
        // }
        // var_dump(array_slice($plantes, 0, 1));

        $this->twig->display('codex/index.html.twig', [
            'plantes' => $plantes,
            'familles' => $familles,
            'categories' => $categories,
            'isAdmin' => $isAdmin
        ]);
    }  
    
    /**
     * Permet d'ajouter une nouvelle soumission
     */
    public function add()
    {
        if(!(isset($_POST['nameFr']) && isset($_SESSION['user']))) {
            header('Location: /codex/');
            exit;
        }

        $latin = ucfirst($_POST['gender']) . ' ' . lcfirst($_POST['species']);

        $submission = new PlantesModel;
        $alreadySubmitted = $submission->findOneByLatin($latin);
        if($alreadySubmitted) {
            echo $latin . ' est déjà présent dans notre base de données.';
        } else if ($_FILES['image']['size'] > 200000) {
            echo 'Votre image est trop grosse (200ko max).';
        } else if (getimagesize($_FILES['image']['tmp_name'])[0] !== 600 && getimagesize($_FILES['image']['tmp_name'])[1] !== 600) {
            echo 'Votre image doit avoir un format de 600px * 600px.';
        } else {
            $submission->setNom_fr(ucfirst($_POST['nameFr']))
                ->setNom_en(ucfirst($_POST['nameEn']))
                ->setNom_latin($latin)
                ->setFamille(ucfirst($_POST['family']))
                ->setCultivar(ucfirst($_POST['cultivar']))
                ->setFloraison($_POST['blossom'])
                ->setCategorie($_POST['category'])
                ->setImage($_FILES['image']['name'])
                ->setUsername($_SESSION['user']['username']);
        
            copy($_FILES['image']['tmp_name'], 'img/' . $_FILES['image']['name']); 
            $submission->create();

            echo "Soumission ajoutée";
        }
    }
}