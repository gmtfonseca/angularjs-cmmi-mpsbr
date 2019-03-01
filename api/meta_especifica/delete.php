<?php
    include_once '../config/database.php';
    include_once '../objects/meta_especifica.php';

    $database = new Database();
    $db = $database->getConnection();

    $metaEspecifica= new MetaEspecifica($db);

    $data = json_decode(file_get_contents("php://input"));

    $metaEspecifica->id = $data->id;

    // delete the product
    if($metaEspecifica->delete())
    {
        echo '{';
            echo '"message": "Meta específica excluída com sucesso."';
        echo '}';
    }

    // if unable to delete the product
    else
    {
        echo '{';
            echo '"message": "Não foi possível excluir a Meta específica."';
        echo '}';
    }
?>