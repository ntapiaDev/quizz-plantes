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
        // if(!(isset($_POST['submission']) && UsersModel::isLogged())) {
        //     header('Location: /codex/');
        //     exit;
        // }

        $submission = new PlantesModel;
        $submission->setNom_fr($_POST['nameFr'])
            ->setNom_en($_POST['nameEn'])
            ->setNom_latin($_POST['gender'] . ' ' . $_POST['species'])
            ->setFamille($_POST['family'])
            ->setCultivar($_POST['cultivar'])
            ->setFloraison($_POST['blossom'])
            ->setCategorie($_POST['category'])
            ->setImage($_FILES['image']['name'])
            ->setUsername($_SESSION['user']['username']);
        
        $submission->create();
        //Gestion de l'image

        echo "Soumission ajoutée";
    }
}