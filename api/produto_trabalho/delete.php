<?php

    include_once '../config/database.php';
    include_once '../objects/produto_trabalho.php';

    $database = new Database();
    $db = $database->getConnection();

    $produtoTrabalho = new ProdutoTrabalho($db);

    $data = json_decode(file_get_contents("php://input"));
    $produtoTrabalho->id = $data->id;
    $produtoTrabalho->readOne();

    if($produtoTrabalho->delete())
    {   
        if($produtoTrabalho->template)
        {
            if(unlink("./templates/" . $produtoTrabalho->id . "." . substr($produtoTrabalho->template, strpos($produtoTrabalho->template, ".") + 1)))
            {
                echo '{';
                    echo '"message": "Produto de trabalho excluído com sucesso."';
                echo '}';   
            }
            else
            {
                echo '{';
                    echo '"message": "Não foi possível excluir o template do Produto de trabalho."';
                echo '}';
            }
        }
        else
        {
            echo '{';
                echo '"message": "Produto de trabalho excluído com sucesso."';
            echo '}';  
        }
        
    }
    else
    {
        echo '{';
            echo '"message": "Não foi possível excluir o Produto de Trabalho."';
        echo '}';
    }
?>