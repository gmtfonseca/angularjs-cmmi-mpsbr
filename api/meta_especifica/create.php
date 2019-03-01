<?php
    // get database connection
    include_once '../config/database.php';
    include_once '../objects/meta_especifica.php';

    $database = new Database();
    $db = $database->getConnection();

    $metaEspecifica= new MetaEspecifica($db);

    // get posted data
    $data = json_decode(file_get_contents("php://input"));

    $metaEspecifica->sigla = $data->sigla;
    $metaEspecifica->nome = $data->nome;
    $metaEspecifica->descricao = $data->descricao;
    $metaEspecifica->areaProcesso = $data->areaProcesso;

    if($metaEspecifica->create())
    {
        echo '{';
            echo '"message": "Meta específica criada com sucesso."';
        echo '}';
    }

    else
    {
        echo '{';
            echo '"message": "Não foi possível criar Meta específica."';
        echo '}';
    }
?>