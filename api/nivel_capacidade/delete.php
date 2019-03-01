<?php
    include_once '../config/database.php';
    include_once '../objects/nivel_capacidade.php';

    $database = new Database();
    $db = $database->getConnection();

    $nivelCapacidade= new NivelCapacidade($db);

    $data = json_decode(file_get_contents("php://input"));

    $nivelCapacidade->id = $data->id;

    // delete the product
    if($nivelCapacidade->delete())
    {
        echo '{';
            echo '"message": "Nível de capacidade excluído com sucesso."';
        echo '}';
    }

    // if unable to delete the product
    else
    {
        echo '{';
            echo '"message": "Não foi possível excluir o Nível de capacidade."';
        echo '}';
    }
?>