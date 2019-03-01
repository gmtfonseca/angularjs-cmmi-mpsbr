<?php
    // get database connection
    include_once '../config/database.php';
    include_once '../objects/nivel_capacidade.php';

    $database = new Database();
    $db = $database->getConnection();

    $nivelCapacidade= new NivelCapacidade($db);

    // get posted data
    $data = json_decode(file_get_contents("php://input"));

    $nivelCapacidade->sigla = $data->sigla;
    $nivelCapacidade->nome = $data->nome;
    $nivelCapacidade->descricao = $data->descricao;
    $nivelCapacidade->modelo = $data->modelo;

    if($nivelCapacidade->create())
    {
        echo '{';
            echo '"message": "Nível de capacidade criado com sucesso."';
        echo '}';
    }

    else
    {
        echo '{';
            echo '"message": "Não foi possível criar Nível de capacidade."';
        echo '}';
    }
?>