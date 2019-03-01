<?php
    include_once '../config/database.php';
    include_once '../objects/nivel_maturidade.php';

    $database = new Database();
    $db = $database->getConnection();

    $nivelMaturidade = new NivelMaturidade($db);

    $nivelMaturidade->id = isset($_GET['id']) ? $_GET['id'] : die();
    
    $nivelMaturidade->readOne();
    
    $nivelMaturidade_arr = array
    (
        "id" =>  $nivelMaturidade->id,
        "sigla" => $nivelMaturidade->sigla,
        "nome" => $nivelMaturidade->nome,
        "descricao" => $nivelMaturidade->descricao,
        "modelo" => $nivelMaturidade->modelo
    );

    print_r(json_encode($nivelMaturidade_arr));
?>