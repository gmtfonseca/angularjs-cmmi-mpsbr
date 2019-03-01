<?php
    include_once '../config/database.php';
    include_once '../objects/meta_especifica.php';

    $database = new Database();
    $db = $database->getConnection();

    $metaEspecifica= new MetaEspecifica($db);
    
    $data = json_decode(file_get_contents("php://input"));

    $metaEspecifica->id = $data->id;
    $metaEspecifica->sigla = $data->sigla;
    $metaEspecifica->nome = $data->nome;
    $metaEspecifica->descricao = $data->descricao;
    $metaEspecifica->areaProcesso = $data->areaProcesso;

    if($metaEspecifica->update())
    {
        echo '{';
            echo '"message": "Meta específica atualizado com sucesso."';
        echo '}';
    }

    else
    {
        echo '{';
            echo '"message": "Não foi possível atualizar a Meta específica."';
        echo '}';
    }

?>