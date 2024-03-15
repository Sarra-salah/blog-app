// Fetch blog details using the ID from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get('id');
const urlBlog = `${BASE_API_ENDPOINT}/api/request_handler.php?readOneBlog=1&id=${blogId}`;

fetch(urlBlog)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch blog details');
        }
        // Check if the response is in JSON format
        return response.json();
    })
    .then(data => {
        const blog = data.data;
        // Populate form fields with existing blog data
        document.getElementById('title').value = blog.title;
        document.getElementById('content').value = blog.content;

        // Populate user dropdown
        populateUserDropdown(blog.user_id);
    })
    .catch(error => {
        console.error('Error fetching blog details:', error);
        // Handle the error (e.g., display an error message to the user)
    });

async function populateUserDropdown(selectedUserId) {
    const userDropdown = document.getElementById('user');
    const urlUsers = `${BASE_API_ENDPOINT}/api/request_handler.php?read=1`;

    try {
        const response = await fetch(urlUsers);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const responseData = await response.json();

        if (!responseData.success) {
            throw new Error(responseData.message || 'Failed to fetch user data');
        }

        const users = responseData.data;

        userDropdown.innerHTML = '';

        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = `${user.firstName} ${user.lastName}`;
            if (selectedUserId && user.id === selectedUserId) {
                option.selected = true;
            }
            userDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}


const updateBlogForm = document.getElementById('update-blog-form');
updateBlogForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(e.target)
    submitData(e.target);
  });
/*updateBlogForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log(e.target)

    try {
        const formData = new FormData(updateBlogForm);
        console.log(formData);
        formData.append("updateBlog", 1);

        const url = BASE_API_ENDPOINT + "/api/request_handler.php"+"?updateBlog";

        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to update blog');
        }

        const responseData = await response.json();
       

        if (responseData.success) {
            // Redirect to the blogs page upon successful update
            window.location.href = `${BASE_API_ENDPOINT}/client/blogs/blogs.html`;
        } else {
            // Handle the case where the update was not successful
            alert("Error updating blog");
        }
    } catch (error) {
        console.error('Error updating blog:', error);
        alert("Error updating blog. Please try again later.");
    }
});*/

async function submitData(values) {
    var formData = new FormData(values);
    console.log(formData)

        const url = BASE_API_ENDPOINT + "/api/request_handler.php"+"?updateBlog";
    await fetch(url, {
      method: "POST", 
      body: formData, 
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code == 200) {
  
          if (confirm("blog Created successfully!") == true) {
              location.replace(BASE_API_ENDPOINT + '/client/blogs/blogs.html')
          } else {
              addBlogForm.reset();
          }
        } else {
          alert("error on user creation");
        }
      });
  }