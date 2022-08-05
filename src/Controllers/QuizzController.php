<?php

namespace App\Controllers;

use App\Models\PlantesModel;
use App\Models\QuizzModel;

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
        if(!isset($_SESSION['user'])) {
            header('Location: /users/login');
            exit;
        }

        $username = $_SESSION['user']['username'];

        $this->twig->display('quizz/index.html.twig', [
            "username" => $username
        ]);
    }

    /**
     * Affiche la page du quizz
     *
     * @return void
     */
    public function normal()
    {
        if(!isset($_SESSION['user'])) {
            header('Location: /users/login');
            exit;
        }

        $this->twig->display('quizz/quizz.html.twig');
    }

    /**
     * Affiche la page du quizz
     *
     * @return void
     */
    public function hiver()
    {
        if(!isset($_SESSION['user'])) {
            header('Location: /users/login');
            exit;
        }
        
        $this->twig->display('quizz/quizz.html.twig');
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
        $infos = $_POST["infos"];
        $score = 0;

        foreach ($quizz as $question) {
            $question["answer"] == $question["proposal"] ? $score++ : "";
        }

        $username = $_SESSION['user']['username'];

        $quizzModel = new QuizzModel;
        $quizzModel->setUsername($username)
            ->setType($infos['type'])
            ->setLength($infos['length'])
            ->setChoices($infos['choices'])
            ->setDuration($infos['duration'])
            ->setSuccess($score);
        $quizzModel->create();

        $this->twig->display('quizz/results.html.twig', [
            "quizz" => $quizz,
            "score" => $score
        ]);
    }
}
