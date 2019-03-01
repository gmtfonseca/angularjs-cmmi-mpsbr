<?php
    include_once '../config/database.php';
    include_once '../objects/nivel_capacidade.php';

    $database = new Database();
    $db = $database->getConnection();

    $nivelCapacidade= new NivelCapacidade($db);
    
    $stmt = $nivelCapacidade->read();
    $num = $stmt->rowCount();
    
    if($num>0)
    {

        $nivelCapacidades_arr=array();
        $nivelCapacidades_arr["records"]=array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            
            extract($row);

            $nivelCapacidade_item=array(
                "id_nivel_capacidade" => $id_nivel_capacidade,
                "sigla" => $sigla,
                "nome" => html_entity_decode($nome),
                "descricao" => html_entity_decode($descricao),
                "id_modelo"=> html_entity_decode($id_modelo)
            );

            array_push($nivelCapacidades_arr["records"], $nivelCapacidade_item);
        }

        echo json_encode($nivelCapacidades_arr);
    }

    else{
        echo json_encode(
            array("message" => "Nenhum modelo encontrado.")
        );
    }

?>