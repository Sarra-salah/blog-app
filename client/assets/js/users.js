// get all users
async function fetchUsers() {
  let content = "";
  const userSelector = document.getElementById("users-block");

  const url = BASE_API_ENDPOINT + "/api/request_handler.php" + "?read=1";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.success) {
      const users = data.data;
      users.forEach((user) => {
        content += getUserHtml(user);
      });
      userSelector.querySelector("tbody").innerHTML = content;
    } else {
      console.error("Error:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const getUserHtml = function (user) {
  return `
    <tr class="user-${user.id}">
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>
        <button type="button" id="edit-btn"> Edit</button>
        <button type="button" id="delete-btn" onClick="deleteUser(${user.id})"> Delete</button>
      </td>
    </tr>
  `;
};

window.onload = function () {
  fetchUsers();
};

// Delete User
const deleteUser = async (id) => {
  const url = BASE_API_ENDPOINT + `/api/request_handler.php?delete=1&id=${id}`;
  const response = await fetch(url);
  try {
   
    if (response.ok) {
      fetchUsers(); // Refresh user list after deletion
      alert("User deleted successfully");
    } else {
      alert("Failed to delete User");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to delete User. Please try again later.");
  }
};
//const tbody=document.querySelector('tbody')

// Event delegation for delete button clicks
/*tbody.addEventListener('click', (e) => {
  console.log(e)
  if (e.target && e.target.contains('delete-btn')) {
    const id = e.target.getAttribute('data-user-id'); // Retrieve user ID from data attribute
    deleteUser(id); // Call deleteUser function with the retrieved ID
  }
});*/


