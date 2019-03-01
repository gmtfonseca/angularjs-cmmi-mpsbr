<?php
    include_once '../config/database.php';
    include_once '../objects/meta_especifica.php';

    $database = new Database();
    $db = $database->getConnection();

    $metaEspecifica = new MetaEspecifica($db);

    $metaEspecifica->id = isset($_GET['id']) ? $_GET['id'] : die();
    
    $metaEspecifica->readOne();
    
    $metaEspecifica_arr = array
    (
        "id" =>  $metaEspecifica->id,
        "sigla" => $metaEspecifica->sigla,
        "nome" => $metaEspecifica->nome,
        "descricao" => $metaEspecifica->descricao,
        "areaProcesso" => $metaEspecifica->areaProcesso
    );

    print_r(json_encode($metaEspecifica_arr));
?>