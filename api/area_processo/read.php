<?php
    include_once '../config/database.php';
    include_once '../objects/area_processo.php';

    $database = new Database();
    $db = $database->getConnection();

    $areaProcesso= new AreaProcesso($db);
    
    $stmt = $areaProcesso->read();
    $num = $stmt->rowCount();
    
    if($num>0)
    {

        $areaProcessos_arr=array();
        $areaProcessos_arr["records"]=array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            
            extract($row);

            $areaProcesso_item=array(
                "id_area_processo" => $id_area_processo,
                "sigla" => $sigla,
                "nome" => html_entity_decode($nome),
                "descricao" => html_entity_decode($descricao),
                "id_nivel_maturidade" => $id_nivel_maturidade,
                "id_categoria" => $id_categoria,
                "id_modelo" => $id_modelo
            );

            array_push($areaProcessos_arr["records"], $areaProcesso_item);
        }

        echo json_encode($areaProcessos_arr);
    }

    else
    {
        echo json_encode
        (
            array("message" => "Nenhuma Área de Processo encontrado.")
        );
    }

?>