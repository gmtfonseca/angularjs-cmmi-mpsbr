<?php
    include_once '../config/database.php';
    include_once '../objects/pratica_especifica.php';

    $database = new Database();
    $db = $database->getConnection();

    $praticaEspecifica = new PraticaEspecifica($db);

    $keywords=isset($_GET["s"]) ? $_GET["s"] : "";

    $stmt = $praticaEspecifica->search($keywords);
    $num = $stmt->rowCount();

    if($num>0)
    {
        $praticaEspecificas_arr=array();
        $praticaEspecificas_arr["records"]=array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $praticaEspecifica_item=array(
                "id_pratica_especifica" => $id_pratica_especifica,
                "sigla" => $sigla,
                "nome" => html_entity_decode($nome),
                "descricao" => html_entity_decode($descricao),
                "id_meta_especifica" => html_entity_decode($id_meta_especifica)
            );

            array_push($praticaEspecificas_arr["records"], $praticaEspecifica_item);
        }

        echo json_encode($praticaEspecificas_arr);
    }

    else{
        echo json_encode(
            array("message" => "Nenhuma Prática específica encontrada.")
        );
    }
?>