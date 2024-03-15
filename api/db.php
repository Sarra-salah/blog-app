<?php

class dataBase {
private const DBHOST = 'localhost';
private const DBUSER = 'root';
private const DBPASS ='';
private const DBNAME ='blog_app';

private $dsn ='mysql:host=' . self::DBHOST . ';dbname=' . self::DBNAME . '';

protected $conn = null ;

// connecting to dataBase

public function connexion()

{
    try{
        $this->conn = new PDO($this->dsn, self::DBUSER , self::DBPASS);
        $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $this->conn;
       
    }catch(PDOException $e){
      die('ERRor:'. $e->getMessage());
    }
}

public function close() {
    $this->conn = null;
    
}

}






?>


