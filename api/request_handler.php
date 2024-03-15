<?php
require_once "users.php";
require_once "blogs.php";


if (isset($_GET['read'])) {

    $getAllUsers = new Users();
    $users = $getAllUsers->getAll();

    if ($users) {
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'code' => 200, 'data' => $users]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'code' => 404, 'message' => 'No users found']);
    }
}
//handle getALL blogs ajax request 
if (isset($_GET['getblogs'])) {

    $getAllBlogs = new BlogRepository();
    $blogs = $getAllBlogs->getAllBlogs();

    if ($blogs) {
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'code' => 200, 'data' => $blogs]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'code' => 404, 'message' => 'No blog found']);
    }
}

//handle delete user ajax request
if (isset($_GET['delete'])) {
    if (!isset($_GET['id'])) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'User ID is missing']);
        exit();
    }

    $id = $_GET['id'];
    $User = new Users();
    if ($User->delete($id)) {
        http_response_code(200);
        echo json_encode(['success' => true]);
    } else {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
}

//handle get single user ajax request

if (isset($_GET['readOne'])) {
    $user = new Users();
    $id = $_GET['id'];
    $user = $user->getOne($id);
    if ($user) {
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'code' => 200, 'data' => $user]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'code' => 404, 'message' => 'No user found']);
    }
}


//add blog
if (isset($_POST['add'])) {
    // Check if required data is present
    if (isset($_POST['title']) && isset($_POST['content']) && isset($_POST['user_id'])) {
        $title = $_POST['title'];
        $content = $_POST['content'];
        $user_id = $_POST['user_id'];

        $blogRepository = new BlogRepository();

        $result = $blogRepository->addBlog($title, $content, $user_id);

        if ($result) {
            http_response_code(200); // Created
            echo json_encode(['success' => true, 'code' => 200,'message' => 'Blog added successfully']);
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(['success' => false, 'code' => 500,'message' => 'Failed to add blog']);
        }
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'code' => 400,'message' => 'Missing required data']);
    }
}

//delete blog 
if(isset($_GET['deleteBlog'])){
    $deleteUser = new BlogRepository();
    $id = $_GET['id'];
    if($deleteUser->delete($id)){
        echo json_encode(['success' => true, 'code' => 200]);
    }else{
        echo json_encode(['success' => false, 'code' => 404, 'message' => 'No users found']);
    }
    
}
//handle get single blog ajax request

if (isset($_GET['readOneBlog'])) {
    $blog = new BlogRepository();
    $id = $_GET['id'];
    $blog = $blog->getBlog($id);
    if ($blog) {
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'code' => 200, 'data' => $blog]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'code' => 404, 'message' => 'No user found']);
    }
}
// Check if the 'updateBlog' parameter is set in the POST request
if (isset($_POST['updateBlog'])) {
    // Extract data from the POST request
    $id = $_POST['id'];
    $title = $_POST['title'];
    $content = $_POST['content'];
    $user_id = $_POST['user_id'];

    // Perform the update operation using the provided data
    $blogRepository = new BlogRepository();
    $result = $blogRepository->updateBlog($id, $title, $content, $user_id);

    // Set Content-Type header to indicate JSON response
    header('Content-Type: application/json');

    // Check if the update was successful
    if ($result) {
        echo json_encode(['success' => true, 'code' => 200]);
    } else {
        echo json_encode(['success' => false, 'code' => 500, 'message' => 'Failed to update blog']);
    }
}

