<?php
    include_once '../config/database.php';
    include_once '../objects/nivel_maturidade.php';

    $database = new Database();
    $db = $database->getConnection();

    $nivelMaturidade = new NivelMaturidade($db);

    $keywords=isset($_GET["s"]) ? $_GET["s"] : "";

    $stmt = $nivelMaturidade->search($keywords);
    $num = $stmt->rowCount();

    if($num>0)
    {
        $nivelMaturidades_arr=array();
        $nivelMaturidades_arr["records"]=array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $nivelMaturidade_item=array(
                "id_nivel_maturidade" => $id_nivel_maturidade,
                "sigla" => $sigla,
                "nome" => html_entity_decode($nome),
                "descricao" => html_entity_decode($descricao),
                "id_modelo" => html_entity_decode($id_modelo)
            );

            array_push($nivelMaturidades_arr["records"], $nivelMaturidade_item);
        }

        echo json_encode($nivelMaturidades_arr);
    }

    else
    {
        echo json_encode
        (
            array("message" => "Nenhum Nível de Maturidade encontrado.")
        );
    }
?>