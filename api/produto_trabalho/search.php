<?php
    include_once '../config/database.php';
    include_once '../objects/produto_trabalho.php';

    $database = new Database();
    $db = $database->getConnection();

    $produtoTrabalho = new ProdutoTrabalho($db);

    $keywords=isset($_GET["s"]) ? $_GET["s"] : "";

    $stmt = $produtoTrabalho->search($keywords);
    $num = $stmt->rowCount();

    if($num>0)
    {
        $produtoTrabalhos_arr=array();
        $produtoTrabalhos_arr["records"]=array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $produtoTrabalho_item=array(
                "id_produto_trabalho" => $id_produto_trabalho,
                "nome" => html_entity_decode($nome),
                "descricao" => html_entity_decode($descricao),
                "template" => html_entity_decode($template)
            );

            array_push($produtoTrabalhos_arr["records"], $produtoTrabalho_item);
        }

        echo json_encode($produtoTrabalhos_arr);
    }

    else{
        echo json_encode(
            array("message" => "Nenhum Produto de Trabalho encontrado.")
        );
    }
?>