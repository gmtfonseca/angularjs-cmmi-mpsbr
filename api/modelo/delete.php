<?php
    include_once '../config/database.php';
    include_once '../objects/modelo.php';

    $database = new Database();
    $db = $database->getConnection();

    $modelo= new Modelo($db);

    $data = json_decode(file_get_contents("php://input"));

    $modelo->id = $data->id;

    // delete the product
    if($modelo->delete())
    {
        echo '{';
            echo '"message": "Modelo excluído com sucesso."';
        echo '}';
    }

    // if unable to delete the product
    else
    {
        echo '{';
            echo '"message": "Não foi possível excluir o modelo."';
        echo '}';
    }
?>