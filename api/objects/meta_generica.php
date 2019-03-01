<?php
class MetaGenerica{
 
    private $conn;
    private $table_name = "metas_genericas";
 
    public $id;
    public $sigla;
    public $nome;
    public $descricao;
    public $modelo;
    public $nivelCapacidade;
 
    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    function create()
    {
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    sigla=:sigla, nome=:nome, descricao=:descricao, id_modelo = :id_modelo, id_nivel_capacidade = :id_nivel_capacidade";

        $stmt = $this->conn->prepare($query);

        $this->sigla=htmlspecialchars(strip_tags($this->sigla));
        $this->nome=htmlspecialchars(strip_tags($this->nome));
        $this->descricao=htmlspecialchars(strip_tags($this->descricao));
        $this->modelo=htmlspecialchars(strip_tags($this->modelo));
        $this->nivelCapacidade=htmlspecialchars(strip_tags($this->nivelCapacidade));

        $stmt->bindParam(":sigla", $this->sigla);
        $stmt->bindParam(":nome", $this->nome);
        $stmt->bindParam(":descricao", $this->descricao);
        $stmt->bindParam(":id_modelo", $this->modelo);
        $stmt->bindParam(":id_nivel_capacidade", $this->nivelCapacidade);

        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
    
    function read()
    {
        $query = "SELECT
                    id_meta_generica,sigla,nome,descricao,id_modelo,id_nivel_capacidade
                FROM
                    " . $this->table_name;

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }
    
    function delete()
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id_meta_generica = ?";

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
                    id_meta_generica,sigla,nome,descricao,id_modelo,id_nivel_capacidade
                FROM
                    " . $this->table_name . "
                WHERE
                    nome LIKE ? OR descricao LIKE ? or sigla LIKE ?";

        $stmt = $this->conn->prepare($query);

        $keywords=htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";

        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);
        $stmt->bindParam(3, $keywords);

        $stmt->execute();

        return $stmt;
    }
    
    function update()
    {
        $query = "UPDATE
                    " . $this->table_name . "
                    SET
                        sigla = :sigla,
                        nome = :nome,
                        descricao = :descricao,
                        id_modelo = :id_modelo,
                        id_nivel_capacidade = :id_nivel_capacidade
                    WHERE
                        id_meta_generica = :id";

        $stmt = $this->conn->prepare($query);

        $this->sigla=htmlspecialchars(strip_tags($this->sigla));
        $this->nome=htmlspecialchars(strip_tags($this->nome));
        $this->descricao=htmlspecialchars(strip_tags($this->descricao));
        $this->id=htmlspecialchars(strip_tags($this->id));
        $this->modelo=htmlspecialchars(strip_tags($this->modelo));
        $this->nivelCapacidade=htmlspecialchars(strip_tags($this->nivelCapacidade));

        $stmt->bindParam(':sigla', $this->sigla);
        $stmt->bindParam(':nome', $this->nome);
        $stmt->bindParam(':descricao', $this->descricao);
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':id_modelo', $this->modelo);
        $stmt->bindParam(':id_nivel_capacidade', $this->nivelCapacidade);

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
        $query = "SELECT id_meta_generica, sigla, nome, descricao, id_modelo, id_nivel_capacidade
                FROM
                    " . $this->table_name . "
                WHERE id_meta_generica = ?
                LIMIT 0,1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->sigla = $row['sigla'];
        $this->nome = $row['nome'];
        $this->descricao = $row['descricao'];
        $this->id = $row['id_meta_generica'];
        $this->modelo = $row['id_modelo'];
        $this->nivelCapacidade = $row['id_nivel_capacidade'];
    }
    
    function readFromModelo()
    {
        $query = "SELECT id_meta_generica, sigla, nome, descricao, id_modelo, id_nivel_capacidade
                FROM
                    " . $this->table_name . "
                 WHERE id_modelo = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->modelo);
        $stmt->execute();

        return $stmt;
    }
}