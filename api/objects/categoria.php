<?php
class Categoria{
 
    private $conn;
    private $table_name = "categorias";
 
    public $id;
    public $nome;
    public $modelo;
 
    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    function create()
    {
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    nome=:nome, id_modelo = :id_modelo";

        $stmt = $this->conn->prepare($query);

        $this->nome=htmlspecialchars(strip_tags($this->nome));

        $stmt->bindParam(":nome", $this->nome);
        $stmt->bindParam(":id_modelo", $this->modelo);

        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
    
    function read()
    {
        $query = "SELECT
                    id_categoria,nome,id_modelo
                FROM
                    " . $this->table_name;

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }
    
    function delete()
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id_categoria = ?";

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
                    id_categoria,nome,id_modelo
                FROM
                    " . $this->table_name . "
                WHERE
                    nome LIKE ?";

        $stmt = $this->conn->prepare($query);

        $keywords=htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";

        $stmt->bindParam(1, $keywords);

        $stmt->execute();

        return $stmt;
    }
    
    function update()
    {
        $query = "UPDATE
                    " . $this->table_name . "
                    SET
                        nome = :nome,
                        id_modelo = :id_modelo
                    WHERE
                        id_categoria = :id";

        $stmt = $this->conn->prepare($query);

        $this->nome=htmlspecialchars(strip_tags($this->nome));
        $this->id=htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':nome', $this->nome);
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':id_modelo', $this->modelo);

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
        $query = "SELECT id_categoria,nome,id_modelo
                FROM
                    " . $this->table_name . "
                WHERE id_categoria = ?
                LIMIT 0,1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->nome = $row['nome'];
        $this->id = $row['id_categoria'];
        $this->modelo = $row['id_modelo'];
    }
}