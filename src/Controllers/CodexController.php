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
            //Gestion de l'image
            $upload_dir = ROOT . '/public/img/';
            $ext = pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);
            $file_name = basename(md5(rand()) . '.' . $ext);
            $upload_file = $upload_dir . $file_name;
            move_uploaded_file($_FILES["image"]["tmp_name"], $upload_file);

            $submission->setNom_fr(ucfirst($_POST['nameFr']))
                ->setNom_en(ucfirst($_POST['nameEn']))
                ->setNom_latin($latin)
                ->setFamille(ucfirst($_POST['family']))
                ->setCultivar(ucfirst($_POST['cultivar']))
                ->setFloraison($_POST['blossom'])
                ->setCategorie($_POST['category'])
                ->setImage($file_name)
                ->setUsername($_SESSION['user']['username']);
        
            $submission->create();

            echo "Soumission ajoutée";
        }
    }

    /**
     * Active une soumission
     *
     * @return void
     */
    public function activate(int $id)
    {
        if(!(isset($_SESSION['user']) && $_SESSION['user']['role'] === 'admin')) {
            echo 'Vous n\'avez pas l\'authorisation d\'accéder à cette page.';
            exit;
        }

        $plantesModel = new PlantesModel;
        // $plantesModel->activeSubmission($id);

        echo json_encode([
            'code' => 200,
            'message' => 'La soumission a bien été activée'
        ]);
    }

    /**
     * Supprimer une soumission
     *
     * @return void
     */
    public function delete(int $id)
    {
        if(!(isset($_SESSION['user']) && $_SESSION['user']['role'] === 'admin')) {
            echo 'Vous n\'avez pas l\'authorisation d\'accéder à cette page.';
            exit;
        }

        $plantesModel = new PlantesModel;
        // $plantesModel->deleteSubmission($id);

        echo json_encode([
            'code' => 200,
            'message' => 'La soumission a bien été supprimée'
        ]);
    }
}