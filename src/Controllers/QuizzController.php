<?php

namespace App\Controllers;

class QuizzController extends Controller
{
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
     * Affiche la page du quizz
     *
     * @return void
     */
    public function results()
    {
        if($_POST === []) {
            header('Location: /quizz/');
            exit;
        }

        var_dump($_POST);

        $questions = $_POST["questions"];
        $answers = $_POST["answers"];
        $options = $_POST["options"];
        $proposals = $_POST["proposals"];
        $score = 0;

        foreach ($answers as $key => $answer) {
            $answer == $proposals[$key] ? $score++ : "";
        }

        $this->twig->display('quizz/results.html.twig', [
            "questions" => $questions,
            "answers" => $answers,
            "options" => $options,
            "proposals" => $proposals,
            "score" => $score
        ]);
    }
}
