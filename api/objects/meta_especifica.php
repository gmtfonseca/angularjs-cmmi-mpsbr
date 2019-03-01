<?php
class MetaEspecifica{
 
    private $conn;
    private $table_name = "metas_especificas";
 
    public $id;
    public $sigla;
    public $nome;
    public $descricao;
    public $areaProcesso;
 
    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    function create()
    {
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    sigla=:sigla, nome=:nome, descricao=:descricao, id_area_processo = :id_area_processo";

        $stmt = $this->conn->prepare($query);

        $this->sigla=htmlspecialchars(strip_tags($this->sigla));
        $this->nome=htmlspecialchars(strip_tags($this->nome));
        $this->descricao=htmlspecialchars(strip_tags($this->descricao));
        $this->areaProcesso=htmlspecialchars(strip_tags($this->areaProcesso));

        $stmt->bindParam(":sigla", $this->sigla);
        $stmt->bindParam(":nome", $this->nome);
        $stmt->bindParam(":descricao", $this->descricao);
        $stmt->bindParam(":id_area_processo", $this->areaProcesso);

        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
    
    function read()
    {
        $query = "SELECT
                    id_meta_especifica,sigla,nome,descricao,id_area_processo
                FROM
                    " . $this->table_name;

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }
    
    function delete()
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id_meta_especifica = ?";

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
                    id_meta_especifica,sigla,nome,descricao,id_area_processo
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
                        id_area_processo = :id_area_processo
                    WHERE
                        id_meta_especifica = :id";

        $stmt = $this->conn->prepare($query);

        $this->sigla=htmlspecialchars(strip_tags($this->sigla));
        $this->nome=htmlspecialchars(strip_tags($this->nome));
        $this->descricao=htmlspecialchars(strip_tags($this->descricao));
        $this->id=htmlspecialchars(strip_tags($this->id));
        $this->areaProcesso=htmlspecialchars(strip_tags($this->areaProcesso));

        $stmt->bindParam(':sigla', $this->sigla);
        $stmt->bindParam(':nome', $this->nome);
        $stmt->bindParam(':descricao', $this->descricao);
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':id_area_processo', $this->areaProcesso);

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
        $query = "SELECT id_meta_especifica, sigla, nome, descricao, id_area_processo
                FROM
                    " . $this->table_name . "
                WHERE id_meta_especifica = ?
                LIMIT 0,1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->sigla = $row['sigla'];
        $this->nome = $row['nome'];
        $this->descricao = $row['descricao'];
        $this->id = $row['id_meta_especifica'];
        $this->areaProcesso = $row['id_area_processo'];
    }
}