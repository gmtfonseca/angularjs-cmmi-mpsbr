<?php
    include_once '../config/database.php';
    include_once '../objects/categoria.php';

    $database = new Database();
    $db = $database->getConnection();

    $categoria = new Categoria($db);

    $categoria->id = isset($_GET['id']) ? $_GET['id'] : die();
    
    $categoria->readOne();
    
    $categoria_arr = array
    (
        "id" =>  $categoria->id,
        "nome" => $categoria->nome,
        "modelo" => $categoria->modelo
    );

    print_r(json_encode($categoria_arr));
?>