<?php
    include_once '../config/database.php';
    include_once '../objects/categoria.php';

    $database = new Database();
    $db = $database->getConnection();

    $categoria= new Categoria($db);
    
    $stmt = $categoria->read();
    $num = $stmt->rowCount();
    
    if($num>0)
    {

        $categorias_arr=array();
        $categorias_arr["records"]=array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            
            extract($row);

            $categoria_item=array(
                "id_categoria" => $id_categoria,
                "nome" => html_entity_decode($nome),
                "id_modelo" => html_entity_decode($id_modelo)
            );

            array_push($categorias_arr["records"], $categoria_item);
        }

        echo json_encode($categorias_arr);
    }

    else{
        echo json_encode(
            array("message" => "Nenhuma categoria encontrado.")
        );
    }

?>