<?php
    include_once '../config/database.php';
    include_once '../objects/meta_generica.php';

    $database = new Database();
    $db = $database->getConnection();

    $metaGenerica= new MetaGenerica($db);

    $data = json_decode(file_get_contents("php://input"));

    $metaGenerica->id = $data->id;

    // delete the product
    if($metaGenerica->delete())
    {
        echo '{';
            echo '"message": "Meta Genérica excluída com sucesso."';
        echo '}';
    }

    // if unable to delete the product
    else
    {
        echo '{';
            echo '"message": "Não foi possível excluir a Meta Genérica."';
        echo '}';
    }
?>