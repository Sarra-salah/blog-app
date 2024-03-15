// Function to fetch user data and populate the dropdown
// Function to fetch user data and populate the dropdown
async function populateUserDropdown() {
    const userDropdown = document.getElementById('user');
    const url = BASE_API_ENDPOINT + '/api/request_handler.php?read=1';

    try {
        // Fetch user data from the server
        const response = await fetch(url);
        const responseData = await response.json();

        // Check if the response was successful
        if (!responseData.success) {
            throw new Error(responseData.message || 'Failed to fetch user data');
        }

        const users = responseData.data;

        // Clear existing options
        userDropdown.innerHTML = '';

        // Populate dropdown with user data
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = `${user.firstName}  ${user.lastName}`;
            userDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle the error or provide a fallback behavior
    }
}

// Populate the user dropdown when the page loads
populateUserDropdown();
const addBlogForm = document.getElementById('add-blog-form');
addBlogForm.addEventListener("submit", function (e) {
  e.preventDefault();
  submitData(e.target);
});
async function submitData(values) {
  var formData = new FormData(values);
  // full endpoint url;
  const url = BASE_API_ENDPOINT + "/api/request_handler.php"+"?add";
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


