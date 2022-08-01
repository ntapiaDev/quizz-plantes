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
}