<?php

class BddManager {
    private $rappelRepository;
    private $connection;

    function __CONSTRUCT(){
        $this->connection = Connection::getConnection();
        $this->rappelRepository = new RappelRepository(Connection::getConnection());
    }

    function getRappelRepository(){
        return $this->rappelRepository;
    }
}

?>