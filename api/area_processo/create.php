<?php
    include_once '../config/database.php';
    include_once '../objects/area_processo.php';

    $database = new Database();
    $db = $database->getConnection();

    $areaProcesso= new AreaProcesso($db);

    $data = json_decode(file_get_contents("php://input"));

    $areaProcesso->sigla = $data->sigla;
    $areaProcesso->nome = $data->nome;
    $areaProcesso->descricao = $data->descricao;
    $areaProcesso->nivelMaturidade = $data->nivelMaturidade;
    $areaProcesso->categoria = $data->categoria;
    $areaProcesso->modelo = $data->modelo;

    if($areaProcesso->create())
    {
        echo '{';
            echo '"message": "Área de processo criada com sucesso."';
        echo '}';
    }

    else
    {
        echo '{';
            echo '"message": "Não foi possível criar a Área de Processo."';
        echo '}';
    }
?>