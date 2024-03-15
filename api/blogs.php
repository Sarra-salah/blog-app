<?php
require_once "db.php";

class BlogRepository
{
    public function addBlog($title, $content, $user_id)
    {
        try {
            $con = new DataBase();
            $sql = 'INSERT INTO blogs (title, content, user_id) VALUES (:title, :content, :user_id)';
            $stmt = $con->connexion()->prepare($sql);
            $stmt->execute([
                'title' => $title,
                'content' => $content,
                'user_id' => $user_id
            ]);
            return true;
        } catch (PDOException $e) {

            error_log('Error adding blog: ' . $e->getMessage());
            return false;
        }
    }
    public function getAllBlogs()
    {
        try {
            $con = new DataBase();
            $sql = 'SELECT * FROM blogs ORDER BY id ASC';
            $stmt = $con->connexion()->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            // Log the error or return an error response
            error_log('Error fetching blogs: ' . $e->getMessage());
            return false;
        }
    }

    //get user by id query
    public function getBlog($id)
    {
        $con = new DataBase();
        try { 
            $sql = "SELECT * from blogs where id=:id";
            $stmt = $con->connexion()->prepare($sql);
            $stmt->execute(['id' => $id]);
            $result = $stmt->fetch();
            $con->close();
            return $result;
        } catch (PDOException $e) {

            error_log('Error fetching blog: ' . $e->getMessage());
            return false;
        }
    }

    //delete blog query
    public function delete($id)
    {
        $con = new DataBase();
        try {

            $sql = "DELETE From blogs where id = :id";
            $stmt = $con->connexion()->prepare($sql);
            $stmt->execute(['id' => $id]);
            $con->close();
            return true;
        } catch (PDOException $e) {

            error_log('Error fetching blog: ' . $e->getMessage());
            return false;
        }
    }
    //update blog query
    public function updateBlog($id,$title, $content, $user_id){
        $conn=new DataBase();
        try {
            
        $sql="UPDATE blogs SET title=:title,content=:content,user_id=:user_id WHERE id=:id";
        echo ($sql);
        $stmt=$conn->connexion()->prepare($sql);
        $stmt->execute([
            'id'=>$id,
            'title'=>$title,
            'content'=>$content,
            'user_id'=>$user_id,
        ]);
        $conn->close();
        return true;
    } catch (PDOException $e) {

        error_log('Error fetching blog: ' . $e->getMessage());
        return false;
    }
    }
}
