<?php
    // get database connection
    include_once '../config/database.php';
    include_once '../objects/categoria.php';

    $database = new Database();
    $db = $database->getConnection();

    $categoria= new Categoria($db);

    // get posted data
    $data = json_decode(file_get_contents("php://input"));

    $categoria->nome = $data->nome;
    $categoria->modelo = $data->modelo;

    if($categoria->create())
    {
        echo '{';
            echo '"message": "Categoria criada com sucesso."';
        echo '}';
    }

    else
    {
        echo '{';
            echo '"message": "Não foi possível criar Categoria."';
        echo '}';
    }
?>