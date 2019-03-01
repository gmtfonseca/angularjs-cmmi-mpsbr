<?php
    include_once '../config/database.php';
    include_once '../objects/modelo.php';

    $database = new Database();
    $db = $database->getConnection();

    $modelo = new Modelo($db);

    $modelo->id = isset($_GET['id']) ? $_GET['id'] : die();
    
    $modelo->readOne();
    
    $modelo_arr = array
    (
        "id" =>  $modelo->id,
        "sigla" => $modelo->sigla,
        "nome" => $modelo->nome,
        "descricao" => $modelo->descricao
    );

    print_r(json_encode($modelo_arr));
?>