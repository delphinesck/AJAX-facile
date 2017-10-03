<?php
header("Access-Control-Allow-Origin : *");

require "flight/Flight.php";
require "autoload.php";

Flight::set("BddManager", new BddManager());

Flight::route("GET /rappels", function(){
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getRappelRepository();
    $rappels = $repo->getAll();
    echo json_encode($rappels);
});

Flight::route("GET /rappel/@id", function($id){
    $status = [
        "success" => false,
        "rappel" => false
    ];
    $rappel = new Rappel();
    $rappel->setId($id);
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getRappelRepository();
    $rappel = $repo->getById($rappel);
    if($rappel != false){
        $status["success"] = true;
        $status["rappel"] = $rappel;
    }
    echo json_encode($status);
});

Flight::route("POST /rappel", function(){
    $titre = Flight::request()->data["titre"];
    $description = Flight::request()->data["description"];
    $date_debut = Flight::request()->data["date_debut"];
    $date_fin = Flight::request()->data["date_fin"];
    $status = [
        "success" => false,
        "id" => 0
    ];
    if(strlen($titre) > 0 && strlen($description) > 0 && strlen($date_debut) > 0 && strlen($date_fin) > 0){
        $rappel = new Rappel();
        $rappel->setTitre($titre);
        $rappel->setDescription($description);
        $rappel->setDate_debut($date_debut);
        $rappel->setDate_fin($date_fin);
        $bddManager = Flight::get("BddManager");
        $repo = $bddManager->getRappelRepository();
        $id = $repo->save($rappel);
        if($id != 0){
            $status["success"] = true;
            $status["id"] = $id;
        }
    }
    echo json_encode($status);
});

Flight::route("DELETE /rappel/@id", function($id){
    $status = [
        "success" => false,
        "id" => $id
    ];
    $rappel = new Rappel();
    $rappel->setId($id);
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getRappelRepository();
    $rowCount = $repo->delete($rappel);
    if($rowCount == 1){
        $status["success"] = true;
    }
    echo json_encode($status);
});

Flight::route("PUT /note/@id", function($id){
    $json = Flight::request()->getBody();
    $_PUT = json_decode($json, true);

    if(isset($_PUT["titre"]) && isset($_PUT["description"]) && isset($_PUT["date_debut"]) && isset($_PUT["date_fin"])){
        $status = [
            "success" => false
        ];
        $titre = $_PUT["titre"];
        $description = $_PUT["description"];
        $date_debut = $_PUT["date_debut"];
        $date_fin = $_PUT["date_fin"];

        $rappel = new Rappel();
        $rappel->setId($id);
        $rappel->setTitre($titre);
        $rappel->setDescription($description);
        $rappel->setDate_debut($date_debut);
        $rappel->setDate_fin($date_fin);

        $bddManager = Flight::get("BddManager");
        $repo = $bddManager->getRappelRepository();
        $rowCount = $repo->save($rappel);

        if($rowCount == 1){
            $status["success"] = true;
        }
    }
    echo json_encode($status);
});

Flight::start();
?>