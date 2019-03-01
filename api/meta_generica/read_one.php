<?php
    include_once '../config/database.php';
    include_once '../objects/meta_generica.php';

    $database = new Database();
    $db = $database->getConnection();

    $metaGenerica = new MetaGenerica($db);

    $metaGenerica->id = isset($_GET['id']) ? $_GET['id'] : die();
    
    $metaGenerica->readOne();
    
    $metaGenerica_arr = array
    (
        "id" =>  $metaGenerica->id,
        "sigla" => $metaGenerica->sigla,
        "nome" => $metaGenerica->nome,
        "descricao" => $metaGenerica->descricao,
        "modelo" => $metaGenerica->modelo,
        "nivelCapacidade" => $metaGenerica->nivelCapacidade
    );

    print_r(json_encode($metaGenerica_arr));
?>