<?php

namespace App\Controllers;

use App\Models\PlantesModel;

class QuizzController extends Controller
{
    /**
     * API qui renvoie toutes les plantes pour le quizz
     *
     * @return JSON
     */
    public function getAllPlantes()
    {
        $plantesModel = new PlantesModel;
        $plantes = $plantesModel->findAll();
        echo json_encode($plantes);
    }

    /**
     * API qui renvoie les plantes pour le quizz d'hiver
     *
     * @return JSON
     */
    public function getWinterPlantes()
    {
        $plantesModel = new PlantesModel;
        $winterPlants = $plantesModel->findWinterPlants();
        echo json_encode($winterPlants);
    }

    /**
     * Affiche la page du quizz
     *
     * @return void
     */
    public function index()
    {
        $this->twig->display('quizz/index.html.twig');
    }

    /**
     * Affiche la page des résultats
     *
     * @return void
     */
    public function results()
    {
        if($_POST === []) {
            header('Location: /quizz/');
            exit;
        }

        $quizz = $_POST["quizz"];
        $score = 0;

        foreach ($quizz as $question) {
            $question["answer"] == $question["proposal"] ? $score++ : "";
        }

        $this->twig->display('quizz/results.html.twig', [
            "quizz" => $quizz,
            "score" => $score
        ]);
    }
}
