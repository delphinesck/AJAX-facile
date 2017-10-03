<?php

class RappelRepository extends Repository {
    
    function getAll(){
        $query = "SELECT * FROM rappels";
        $result = $this->connection->query($query);
        $result = $result->fetchAll(PDO::FETCH_ASSOC);
        $rappels = [];
        foreach($result as $data){
            $rappels[] = new Rappel($data);
        }
        return $rappels;
    }

    function getById(Rappel $rappel){
        $query = "SELECT * FROM rappels WHERE id=:id";
        $prep = $this->connection->prepare($query);
        $prep->execute([
            "id" => $rappel->getId()
        ]);
        $result = $prep->fetch(PDO::FETCH_ASSOC);
        if(empty($result)){
            return false;
        }
        else{
            return new Rappel($result);
        }
    }

    function save(Rappel $rappel){
        if(empty($rappel->getId())){
            return $this->insert($rappel);
        }
        else{
            return $this->update($rappel);
        }
    }

    private function insert(Rappel $rappel){
        $query = "INSERT INTO rappels SET titre=:titre, description=:description, date_debut=:date_debut, date_fin=:date_fin";
        $prep = $this->connection->prepare($query);
        $prep->execute([
            "titre" => $rappel->getTitre(),
            "description" => $rappel->getDescription(),
            "date_debut" => $rappel->getDate_debut(),
            "date_fin" => $rappel->getDate_fin()
        ]);
        return $this->connection->lastInsertId();
    }

    private function update(Rappel $rappel){
        $query = "UPDATE rappels SET titre=:titre, description=:description, date_debut=:date_debut, date_fin=:date_fin WHERE id=:id";
        $prep = $this->connection->prepare($query);
        $prep->execute([
            "titre" => $rappel->getTitre(),
            "description" => $rappel->getDescription(),
            "date_debut" => $rappel->getDate_debut(),
            "date_fin" => $rappel->getDate_fin(),
            "id" => $rappel->getId()
        ]);
        return $prep->rowCount();
    }

    function delete(Rappel $rappel){
        $query = "DELETE FROM rappels WHERE id=:id";
        $prep = $this->connection->prepare($query);
        $prep->execute([
            "id" => $rappel->getId()
        ]);
        return $prep->rowCount();
    }
}

?>