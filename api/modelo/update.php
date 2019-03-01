<?php
    include_once '../config/database.php';
    include_once '../objects/modelo.php';

    $database = new Database();
    $db = $database->getConnection();

    $modelo= new Modelo($db);
    
    $data = json_decode(file_get_contents("php://input"));

    $modelo->id = $data->id;
    $modelo->sigla = $data->sigla;
    $modelo->nome = $data->nome;
    $modelo->descricao = $data->descricao;

    if($modelo->update())
    {
        echo '{';
            echo '"message": "Modelo atualizado com sucesso."';
        echo '}';
    }

    else
    {
        echo '{';
            echo '"message": "Não foi possível atualizar o modelo."';
        echo '}';
    }

?>