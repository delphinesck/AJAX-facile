<?php

class Rappel extends Model implements JsonSerializable {
    private $titre;
    private $description;
    private $date_debut;
    private $date_fin;
    
    function setTitre($titre) { $this->titre = $titre; }
    function getTitre() { return $this->titre; }
    function setDescription($description) { $this->description = $description; }
    function getDescription() { return $this->description; }
    function setDate_debut($date_debut) { $this->date_debut = $date_debut; }
    function getDate_debut() { return $this->date_debut; }
    function setDate_fin($date_fin) { $this->date_fin = $date_fin; }
    function getDate_fin() { return $this->date_fin; }    

    function jsonSerialize(){
        return [
            "id" => $this->id,
            "titre" => $this->titre,
            "description" => $this->description,
            "date_debut" => $this->date_debut,
            "date_fin" => $this->date_fin
        ];
    }
}

?>