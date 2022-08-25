<?php
namespace App\Models;

Class PlantesModel extends Model
{
    protected $id;
    protected $nom_fr;
    protected $nom_en;
    protected $nom_latin;
    protected $cultivar;
    protected $espece;
    protected $famille;
    protected $floraison;
    protected $image;
    protected $categorie;

    public function __construct()
    {
        $class = str_replace(__NAMESPACE__.'\\', '', __CLASS__);
        $this->table = strtolower(str_replace('Model', '', $class));
    }

    /**
     * Récupère le nom d'un user à partir de son id
     *
     * @param integer $id
     * @return mixed
     */
    public function findOneById(int $id)
    {
        return $this->request("SELECT * FROM $this->table WHERE id = ?", [$id])->fetch();
    }

    /**
     * Récupère les plantes pour le quizz normal
     * @return [Plantes]
     */
    public function findAllPlants()
    {
        return $this->request("SELECT * FROM $this->table ORDER BY nom_latin")->fetchAll();
    }

    /**
     * Récupère les plantes pour le quizz hiver
     * @return [Plantes]
     */
    public function findWinterPlants()
    {
        return $this->request("SELECT * FROM $this->table WHERE floraison RLIKE 'décembre|janvier|février|mars'")->fetchAll();
    }
}