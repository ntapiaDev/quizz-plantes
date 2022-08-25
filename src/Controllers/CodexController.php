<?php
namespace App\Controllers;

use App\Models\PlantesModel;

class CodexController extends Controller
{
    /**
     * Affiche la page de codex
     *
     * @return void
     */
    public function index()
    {
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