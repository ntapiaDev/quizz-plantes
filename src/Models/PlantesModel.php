<?php
namespace App\Models;

Class PlantesModel extends Model
{
    protected $id;
    protected $nom_fr;
    protected $nom_en;
    protected $nom_latin;
    protected $cultivar;
    protected $famille;
    protected $floraison;
    protected $image;
    protected $categorie;
    protected $username;
    protected $active;

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
     * Récupère le nom d'un user à partir de son nom latin
     *
     * @param string $latin
     * @return mixed
     */
    public function findOneByLatin(string $latin)
    {
        return $this->request("SELECT * FROM $this->table WHERE nom_latin = ?", [$latin])->fetch();
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

    /**
     * Récupère les familles de plantes
     * @return [Plantes]
     */
    public function getFamilies()
    {
        return $this->request("SELECT DISTINCT famille FROM $this->table ORDER BY famille ASC")->fetchAll();
    }

    /**
     * Récupère les categories de plantes
     * @return [Plantes]
     */
    public function getCategories()
    {
        return $this->request("SELECT DISTINCT Categorie FROM $this->table ORDER BY Categorie ASC")->fetchAll();
    }

    

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of nom_fr
     */ 
    public function getNom_fr()
    {
        return $this->nom_fr;
    }

    /**
     * Set the value of nom_fr
     *
     * @return  self
     */ 
    public function setNom_fr($nom_fr)
    {
        $this->nom_fr = $nom_fr;

        return $this;
    }

    /**
     * Get the value of nom_en
     */ 
    public function getNom_en()
    {
        return $this->nom_en;
    }

    /**
     * Set the value of nom_en
     *
     * @return  self
     */ 
    public function setNom_en($nom_en)
    {
        $this->nom_en = $nom_en;

        return $this;
    }

    /**
     * Get the value of nom_latin
     */ 
    public function getNom_latin()
    {
        return $this->nom_latin;
    }

    /**
     * Set the value of nom_latin
     *
     * @return  self
     */ 
    public function setNom_latin($nom_latin)
    {
        $this->nom_latin = $nom_latin;

        return $this;
    }

    /**
     * Get the value of cultivar
     */ 
    public function getCultivar()
    {
        return $this->cultivar;
    }

    /**
     * Set the value of cultivar
     *
     * @return  self
     */ 
    public function setCultivar($cultivar)
    {
        $this->cultivar = $cultivar;

        return $this;
    }

    /**
     * Get the value of famille
     */ 
    public function getFamille()
    {
        return $this->famille;
    }

    /**
     * Set the value of famille
     *
     * @return  self
     */ 
    public function setFamille($famille)
    {
        $this->famille = $famille;

        return $this;
    }

    /**
     * Get the value of floraison
     */ 
    public function getFloraison()
    {
        return $this->floraison;
    }

    /**
     * Set the value of floraison
     *
     * @return  self
     */ 
    public function setFloraison($floraison)
    {
        $this->floraison = $floraison;

        return $this;
    }

    /**
     * Get the value of image
     */ 
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set the value of image
     *
     * @return  self
     */ 
    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get the value of categorie
     */ 
    public function getCategorie()
    {
        return $this->categorie;
    }

    /**
     * Set the value of categorie
     *
     * @return  self
     */ 
    public function setCategorie($categorie)
    {
        $this->categorie = $categorie;

        return $this;
    }

    /**
     * Get the value of username
     */ 
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set the value of username
     *
     * @return  self
     */ 
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get the value of active
     */ 
    public function getActive()
    {
        return $this->active;
    }

    /**
     * Set the value of active
     *
     * @return  self
     */ 
    public function setActive($active)
    {
        $this->active = $active;

        return $this;
    }
}