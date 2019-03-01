<?php
    include_once '../config/database.php';
    include_once '../objects/meta_especifica.php';

    $database = new Database();
    $db = $database->getConnection();

    $metaEspecifica = new MetaEspecifica($db);

    $keywords=isset($_GET["s"]) ? $_GET["s"] : "";

    $stmt = $metaEspecifica->search($keywords);
    $num = $stmt->rowCount();

    if($num>0)
    {
        $metaEspecificas_arr=array();
        $metaEspecificas_arr["records"]=array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $metaEspecifica_item=array(
                "id_meta_especifica" => $id_meta_especifica,
                "sigla" => $sigla,
                "nome" => html_entity_decode($nome),
                "descricao" => html_entity_decode($descricao),
                "id_area_processo" => $id_area_processo
            );

            array_push($metaEspecificas_arr["records"], $metaEspecifica_item);
        }

        echo json_encode($metaEspecificas_arr);
    }

    else{
        echo json_encode(
            array("message" => "Nenhuma Meta específica encontrada.")
        );
    }
?>