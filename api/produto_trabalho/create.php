<?php

    include_once '../config/database.php';
    include_once '../objects/produto_trabalho.php';

    $database = new Database();
    $db = $database->getConnection();

    $produtoTrabalho = new ProdutoTrabalho($db);

    $produtoTrabalho->nome = $_POST['nome'];
    $produtoTrabalho->descricao = $_POST['descricao'];
    $produtoTrabalho->template = basename($_FILES["template"]["name"]);

    
    if($produtoTrabalho->create())
    {
        if($_FILES["template"]["tmp_name"])
        {
            $fileInfo = pathinfo($_FILES["template"]["name"]);
            $targetFile = "./templates/" . $produtoTrabalho->id . '.' . $fileInfo['extension'];
            
            //Uploads the file
            if(move_uploaded_file($_FILES["template"]["tmp_name"], $targetFile))
            {
                echo '{';
                    echo '"message": "Produto de trabalho criado com sucesso."';

                echo '}';
            }
            else
            {   
                echo '{';
                    echo '"message": "Não foi possível realizar o envio do template do Produto de trabalho."';
                echo '}';
            }
        }
        else
        {
            echo '{';
                    echo '"message": "Produto de trabalho criado com sucesso."';
            echo '}';
            
        }
    }
    else
    {
        echo '{';
                    echo '"message": "Não foi possível criar o Produto de trabalho."';
        echo '}';
    }

?>