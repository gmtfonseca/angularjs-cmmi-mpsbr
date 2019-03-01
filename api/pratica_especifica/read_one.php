<?php
    include_once '../config/database.php';
    include_once '../objects/pratica_especifica.php';

    $database = new Database();
    $db = $database->getConnection();

    $praticaEspecifica = new PraticaEspecifica($db);

    $praticaEspecifica->id = isset($_GET['id']) ? $_GET['id'] : die();
    
    $praticaEspecifica->readOne();
    
    $praticaEspecifica_arr = array
    (
        "id" =>  $praticaEspecifica->id,
        "sigla" => $praticaEspecifica->sigla,
        "nome" => $praticaEspecifica->nome,
        "descricao" => $praticaEspecifica->descricao,
        "metaEspecifica" => $praticaEspecifica->metaEspecifica
    );

    print_r(json_encode($praticaEspecifica_arr));
?>