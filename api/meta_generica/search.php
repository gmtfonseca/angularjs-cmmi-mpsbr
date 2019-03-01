<?php
    include_once '../config/database.php';
    include_once '../objects/meta_generica.php';

    $database = new Database();
    $db = $database->getConnection();

    $metaGenerica = new MetaGenerica($db);

    $keywords=isset($_GET["s"]) ? $_GET["s"] : "";

    $stmt = $metaGenerica->search($keywords);
    $num = $stmt->rowCount();

    if($num>0)
    {
        $metaGenericas_arr=array();
        $metaGenericas_arr["records"]=array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $metaGenerica_item=array(
                "id_meta_generica" => $id_meta_generica,
                "sigla" => $sigla,
                "nome" => html_entity_decode($nome),
                "descricao" => html_entity_decode($descricao),
                "id_modelo" => html_entity_decode($id_modelo),
                "id_nivel_capacidade" => html_entity_decode($id_nivel_capacidade)
            );

            array_push($metaGenericas_arr["records"], $metaGenerica_item);
        }

        echo json_encode($metaGenericas_arr);
    }

    else{
        echo json_encode(
            array("message" => "Nenhuma Meta Genérica encontrado.")
        );
    }
?>