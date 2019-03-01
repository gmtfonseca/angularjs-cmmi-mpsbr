<?php
    // get database connection
    include_once '../config/database.php';
    include_once '../objects/modelo.php';

    $database = new Database();
    $db = $database->getConnection();

    $modelo= new Modelo($db);

    // get posted data
    $data = json_decode(file_get_contents("php://input"));

    $modelo->sigla = $data->sigla;
    $modelo->nome = $data->nome;
    $modelo->descricao = $data->descricao;

    if($modelo->create())
    {
        echo '{';
            echo '"message": "Modelo criado com sucesso."';
        echo '}';
    }

    else
    {
        echo '{';
            echo '"message": "Não foi possível criar modelo."';
        echo '}';
    }
?>