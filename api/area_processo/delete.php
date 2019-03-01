<?php
    include_once '../config/database.php';
    include_once '../objects/area_processo.php';

    $database = new Database();
    $db = $database->getConnection();

    $areaProcesso= new AreaProcesso($db);

    $data = json_decode(file_get_contents("php://input"));

    $areaProcesso->id = $data->id;

    if($areaProcesso->delete())
    {
        echo '{';
            echo '"message": "Área de Processo excluída com sucesso."';
        echo '}';
    }

    else
    {
        echo '{';
            echo '"message": "Não foi possível excluir a Área de Processo."';
        echo '}';
    }
?>