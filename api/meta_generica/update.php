<?php
    include_once '../config/database.php';
    include_once '../objects/meta_generica.php';

    $database = new Database();
    $db = $database->getConnection();

    $metaGenerica= new MetaGenerica($db);
    
    $data = json_decode(file_get_contents("php://input"));

    $metaGenerica->id = $data->id;
    $metaGenerica->sigla = $data->sigla;
    $metaGenerica->nome = $data->nome;
    $metaGenerica->descricao = $data->descricao;
    $metaGenerica->modelo = $data->modelo;
    $metaGenerica->nivelCapacidade = $data->nivelCapacidade;

    if($metaGenerica->update())
    {
        echo '{';
            echo '"message": "Meta Genérica atualizada com sucesso."';
        echo '}';
    }

    else
    {
        echo '{';
            echo '"message": "Não foi possível atualizar a Meta Genérica."';
        echo '}';
    }

?>