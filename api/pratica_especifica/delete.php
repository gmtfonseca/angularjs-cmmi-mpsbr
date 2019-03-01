<?php
    include_once '../config/database.php';
    include_once '../objects/pratica_especifica.php';

    $database = new Database();
    $db = $database->getConnection();

    $praticaEspecifica= new PraticaEspecifica($db);

    $data = json_decode(file_get_contents("php://input"));

    $praticaEspecifica->id = $data->id;

    if($praticaEspecifica->delete())
    {
        echo '{';
            echo '"message": "Prática específica excluída com sucesso."';
        echo '}';
    }

    else
    {
        echo '{';
            echo '"message": "Não foi possível excluir a Prática específica."';
        echo '}';
    }
?>