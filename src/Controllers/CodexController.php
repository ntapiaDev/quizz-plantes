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
        // UsersModel::isLogged();

        $plantesModel = new PlantesModel;
        $plantes = $plantesModel->findAllPlants();

        // var_dump($plantes);

        // if(isset($_GET['page'])) {

        // }
        // var_dump(array_slice($plantes, 0, 1));

        $this->twig->display('codex/index.html.twig', [
            'plantes' => $plantes
        ]);
    }    
}