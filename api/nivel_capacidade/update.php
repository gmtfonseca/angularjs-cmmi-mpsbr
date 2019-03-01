<?php
    include_once '../config/database.php';
    include_once '../objects/nivel_capacidade.php';

    $database = new Database();
    $db = $database->getConnection();

    $nivelCapacidade= new NivelCapacidade($db);
    
    $data = json_decode(file_get_contents("php://input"));

    $nivelCapacidade->id = $data->id;
    $nivelCapacidade->sigla = $data->sigla;
    $nivelCapacidade->nome = $data->nome;
    $nivelCapacidade->descricao = $data->descricao;
    $nivelCapacidade->modelo = $data->modelo;

    if($nivelCapacidade->update())
    {
        echo '{';
            echo '"message": "Nível de capacidade atualizado com sucesso."';
        echo '}';
    }
    else
    {
        echo '{';
            echo '"message": "Não foi possível atualizar o Nível de capacidade."';
        echo '}';
    }

?>