<?php
class ProdutoTrabalho{
 
    private $conn;
    private $table_name = "produtos_trabalho";
    
    public $id;
    public $nome;
    public $descricao;
    public $template;
 
    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    function create()
    {
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    nome=:nome, descricao=:descricao, template=:template";

        $stmt = $this->conn->prepare($query);

        $this->nome=htmlspecialchars(strip_tags($this->nome));
        $this->descricao=htmlspecialchars(strip_tags($this->descricao));
        $this->template=htmlspecialchars(strip_tags($this->template));

        $stmt->bindParam(":nome", $this->nome);
        $stmt->bindParam(":descricao", $this->descricao);
        $stmt->bindParam(":template", $this->template);
        
        if($stmt->execute())
        {
            $this->id = $this->conn->lastInsertId();
            return true;
        }else
        {
            return false;
        }
    }
    
    function read()
    {
        $query = "SELECT
                    id_produto_trabalho,nome,descricao,template
                FROM
                    " . $this->table_name;

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }
    
    function delete()
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id_produto_trabalho = ?";

        $stmt = $this->conn->prepare($query);

        $this->id=htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(1, $this->id);
        
        if($stmt->execute())
        {
            return true;
        }

        return false;
    }
    
    function search($keywords)
    {       
        $query = "SELECT
                    id_produto_trabalho,nome,descricao,template
                FROM
                    " . $this->table_name . "
                WHERE
                    nome LIKE ? OR descricao LIKE ?";

        $stmt = $this->conn->prepare($query);

        $keywords=htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";

        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);

        $stmt->execute();

        return $stmt;
    }
    
    function update()
    {
        $query = "UPDATE
                    " . $this->table_name . "
                    SET
                        nome = :nome,
                        descricao = :descricao,
                        template = :template
                    WHERE
                        id_produto_trabalho = :id_produto_trabalho";

        $stmt = $this->conn->prepare($query);

        $this->nome=htmlspecialchars(strip_tags($this->nome));
        $this->descricao=htmlspecialchars(strip_tags($this->descricao));
        $this->template=htmlspecialchars(strip_tags($this->template));

        $stmt->bindParam(':nome', $this->nome);
        $stmt->bindParam(':descricao', $this->descricao);
        $stmt->bindParam(':template', $this->template);

        if($stmt->execute())
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function readOne()
    {
        $query = "SELECT id_produto_trabalho,nome,descricao,template
                FROM
                    " . $this->table_name . "
                WHERE id_produto_trabalho = ?
                LIMIT 0,1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->nome = $row['nome'];
        $this->descricao = $row['descricao'];
        $this->id = $row['id_produto_trabalho'];
        $this->template = $row['template'];
    }
}