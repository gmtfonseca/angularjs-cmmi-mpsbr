<?php
    include_once '../config/database.php';
    include_once '../objects/modelo.php';

    $database = new Database();
    $db = $database->getConnection();

    $modelo = new Modelo($db);

    $keywords=isset($_GET["s"]) ? $_GET["s"] : "";

    $stmt = $modelo->search($keywords);
    $num = $stmt->rowCount();

    if($num>0)
    {
        $modelos_arr=array();
        $modelos_arr["records"]=array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $modelo_item=array(
                "id_modelo" => $id_modelo,
                "sigla" => $sigla,
                "nome" => html_entity_decode($nome),
                "descricao" => html_entity_decode($descricao)
            );

            array_push($modelos_arr["records"], $modelo_item);
        }

        echo json_encode($modelos_arr);
    }

    else{
        echo json_encode(
            array("message" => "Nenhum modelo encontrado.")
        );
    }
?>