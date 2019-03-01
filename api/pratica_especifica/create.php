<?php
    // get database connection
    include_once '../config/database.php';
    include_once '../objects/pratica_especifica.php';

    $database = new Database();
    $db = $database->getConnection();

    $praticaEspecifica = new PraticaEspecifica($db);

    // get posted data
    $data = json_decode(file_get_contents("php://input"));

    $praticaEspecifica->sigla = $data->sigla;
    $praticaEspecifica->nome = $data->nome;
    $praticaEspecifica->descricao = $data->descricao;
    $praticaEspecifica->metaEspecifica = $data->metaEspecifica;

    if($praticaEspecifica->create())
    {
        echo '{';
            echo '"message": "Prática específica criada com sucesso."';
        echo '}';
    }
    else
    {
        echo '{';
            echo '"message": "Não foi possível criar Prática específica."';
        echo '}';
    }
?>