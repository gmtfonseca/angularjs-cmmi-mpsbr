<?php
    include_once '../config/database.php';
    include_once '../objects/nivel_maturidade.php';

    $database = new Database();
    $db = $database->getConnection();

    $nivelMaturidade = new NivelMaturidade($db);

    $data = json_decode(file_get_contents("php://input"));

    $nivelMaturidade->id = $data->id;

    if($nivelMaturidade->delete())
    {
        echo '{';
            echo '"message": "Nível de maturidade excluído com sucesso."';
        echo '}';
    }

    else
    {
        echo '{';
            echo '"message": "Não foi possível excluir o Nível de maturidade."';
        echo '}';
    }
?>