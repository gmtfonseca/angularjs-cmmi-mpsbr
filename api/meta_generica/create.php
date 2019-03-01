<?php
    // get database connection
    include_once '../config/database.php';
    include_once '../objects/meta_generica.php';

    $database = new Database();
    $db = $database->getConnection();

    $metaGenerica = new MetaGenerica($db);

    // get posted data
    $data = json_decode(file_get_contents("php://input"));

    $metaGenerica->sigla = $data->sigla;
    $metaGenerica->nome = $data->nome;
    $metaGenerica->descricao = $data->descricao;
    $metaGenerica->modelo = $data->modelo;
    $metaGenerica->nivelCapacidade = $data->nivelCapacidade;

    if($metaGenerica->create())
    {
        echo '{';
            echo '"message": "Meta Genérica criada com sucesso."';
        echo '}';
    }

    else
    {
        echo '{';
            echo '"message": "Não foi possível criar Meta Genérica."';
        echo '}';
    }
?>