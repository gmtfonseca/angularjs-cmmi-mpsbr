<?php
    include_once '../config/database.php';
    include_once '../objects/categoria.php';

    $database = new Database();
    $db = $database->getConnection();

    $categoria= new Categoria($db);

    $data = json_decode(file_get_contents("php://input"));

    $categoria->id = $data->id;

    if($categoria->delete())
    {
        echo '{';
            echo '"message": "Categoria excluída com sucesso."';
        echo '}';
    }

    else
    {
        echo '{';
            echo '"message": "Não foi possível excluir a Categoria."';
        echo '}';
    }
?>