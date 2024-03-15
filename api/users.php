<?php

require_once "db.php";

class Users
{
//get all users query
    public function getAll()
    {
        $con = new DataBase();
        try {
            $sql = 'SELECT * FROM users ORDER BY id DESC';
            $stmt = $con->connexion()->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll();
            $con->close(); 
            return $result;
        } catch (PDOException $e) {
            
            error_log('Error fetching all users: ' . $e->getMessage());
            return false;
        }
    }
    //get user by id query
    public function getOne($id)
    {
        $con = new DataBase();
        try {
           
            $sql = "SELECT * from users where id=:id";
            $stmt = $con->connexion()->prepare($sql);
            $stmt->execute(['id' => $id]);
            $result = $stmt->fetch();
            $con->close();
            return $result;
        } catch (PDOException $e) {
            
            error_log('Error fetching all users: ' . $e->getMessage());
            return false;
        }
    }
    //delete single user query 
    public function delete($id)
    {
        $con = new DataBase();
        try {
            $sql = 'DELETE From users where id = :id';
            $stmt = $con->connexion()->prepare($sql);
            $stmt->execute(['id' => $id]);
            return true;
        } catch (PDOException $e) {
            
            error_log('Error fetching all users: ' . $e->getMessage());
            return false;
        }
    }
}
