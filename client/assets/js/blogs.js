//get all blogs 
 async function getAllBlogs(){
    let content='';
    const blogSelector = document.getElementById("blog-block");
    const url = BASE_API_ENDPOINT + "/api/request_handler.php" + "?getblogs=1";

    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.success) {
          const blogs = data.data; // Change variable name to 'blogs' for clarity
          blogs.forEach((blog) => {
            content += getBlogHtml(blog);
          });
          // Fix selector to target 'blog-container' by ID
          document.getElementById("blog-container").innerHTML = content;
        } else {
          console.error("Error:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
}

const getBlogHtml = function (blog) {
    return `
    
    <header class="w3-container w3-blue">
      <h1>${blog.title}</h1>
    </header>

    <div class="w3-container">
      <p>${blog.content}</p>
    </div>

    <footer class="w3-container w3-blue">
      <h5>${blog.user_id}</h5>
      <button id="btn-delete" data-id="${blog.id}" onclick="deleteBlog(${blog.id})"> delete Blog</button>
      <button class="btn-edit" data-id="${blog.id}" onclick="editBlog(${blog.id})"> Edit</button>

      <br>
    </footer>
    
  
    `;
};
  
const editBlog = async (id) => {
    // Redirect to the edit page with the blog ID
    window.location.href = BASE_API_ENDPOINT + `/client/blogs/updateBlog.html?id=${id}`;
};

const blogSelector = document.getElementById("blog-container");
//delete user
blogSelector.addEventListener('click', async (e) => {
    if (e.target && e.target.classList.contains('btn-delete')) {
        e.preventDefault();
        const id = e.target.getAttribute("data-id");
        console.log(id);
        deleteBlog(id);
    }
});

const deleteBlog = async (id) => {
    const url = BASE_API_ENDPOINT + `/api/request_handler.php?deleteBlog=1&id=${id}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            getAllBlogs();
            alert("Blog deleted successfully");
        } else if (response.status === 404) {
            // Blog not found
            alert("Blog not found");
        } else {
            // Failed to delete blog
            alert("Failed to delete blog");
        }
    } catch (error) {
        // Error occurred while deleting blog
        alert("Error deleting blog:", error);
    }
};
window.onload = function () {
    getAllBlogs();

   
};