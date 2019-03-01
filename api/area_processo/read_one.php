<?php
    include_once '../config/database.php';
    include_once '../objects/area_processo.php';

    $database = new Database();
    $db = $database->getConnection();

    $areaProcesso = new AreaProcesso($db);

    $areaProcesso->id = isset($_GET['id']) ? $_GET['id'] : die();
    
    $areaProcesso->readOne();
    
    $areaProcesso_arr = array
    (
        "id" =>  $areaProcesso->id,
        "sigla" => $areaProcesso->sigla,
        "nome" => $areaProcesso->nome,
        "descricao" => $areaProcesso->descricao,
        "nivelMaturidade" => $areaProcesso->nivelMaturidade,
        "categoria" => $areaProcesso->categoria,
        "modelo" => $areaProcesso->modelo
    );

    print_r(json_encode($areaProcesso_arr));
?>