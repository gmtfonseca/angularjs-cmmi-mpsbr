<?php
    include_once '../config/database.php';
    include_once '../objects/categoria.php';

    $database = new Database();
    $db = $database->getConnection();

    $categoria= new Categoria($db);
    
    $data = json_decode(file_get_contents("php://input"));

    $categoria->id = $data->id;
    $categoria->nome = $data->nome;
    $categoria->modelo = $data->modelo;

    // update the product
    if($categoria->update())
    {
        echo '{';
            echo '"message": "Categoria atualizada com sucesso."';
        echo '}';
    }

    // if unable to update the product, tell the user
    else
    {
        echo '{';
            echo '"message": "Não foi possível atualizar a categoria."';
        echo '}';
    }

?>