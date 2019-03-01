<?php
    include_once '../config/database.php';
    include_once '../objects/nivel_capacidade.php';

    $database = new Database();
    $db = $database->getConnection();

    $nivelCapacidade = new NivelCapacidade($db);

    $nivelCapacidade->id = isset($_GET['id']) ? $_GET['id'] : die();
    
    $nivelCapacidade->readOne();
    
   $nivelCapacidade_arr = array
    (
        "id" =>  $nivelCapacidade->id,
        "sigla" => $nivelCapacidade->sigla,
        "nome" => $nivelCapacidade->nome,
        "descricao" => $nivelCapacidade->descricao,
        "modelo" => $nivelCapacidade->modelo
    );

    print_r(json_encode($nivelCapacidade_arr));
?>