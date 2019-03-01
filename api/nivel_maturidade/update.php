<?php
    include_once '../config/database.php';
    include_once '../objects/nivel_maturidade.php';

    $database = new Database();
    $db = $database->getConnection();

    $nivelMaturidade = new NivelMaturidade($db);
    
    $data = json_decode(file_get_contents("php://input"));

    $nivelMaturidade->id = $data->id;
    $nivelMaturidade->sigla = $data->sigla;
    $nivelMaturidade->nome = $data->nome;
    $nivelMaturidade->descricao = $data->descricao;
    $nivelMaturidade->modelo = $data->modelo;

    if($nivelMaturidade->update())
    {
        echo '{';
            echo '"message": "Nível de Maturidade atualizado com sucesso."';
        echo '}';
    }

    else
    {
        echo '{';
            echo '"message": "Não foi possível atualizar o Nível de Maturidade."';
        echo '}';
    }

?>