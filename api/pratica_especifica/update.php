<?php
    include_once '../config/database.php';
    include_once '../objects/pratica_especifica.php';

    $database = new Database();
    $db = $database->getConnection();

    $praticaEspecifica= new PraticaEspecifica($db);
    
    $data = json_decode(file_get_contents("php://input"));

    $praticaEspecifica->id = $data->id;
    $praticaEspecifica->sigla = $data->sigla;
    $praticaEspecifica->nome = $data->nome;
    $praticaEspecifica->descricao = $data->descricao;
    $praticaEspecifica->metaEspecifica = $data->metaEspecifica;      
         
    if($praticaEspecifica->update())
    {
        echo '{';
            echo '"message": "Prática específica atualizada com sucesso."';
        echo '}';
    }

    else
    {
        echo '{';
            echo '"message": "Não foi possível atualizar a Prática específica."';
        echo '}';
    }

?>