//get user by id 
async function getUserById(userId) {
    const url = BASE_API_ENDPOINT + `/api/request_handler.php?readOne=1&id=${userId}`;
    console.log("hhhhh",userId)
    try {
      
  
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Propagate the error
    }
  }
  
  
  
  export default getUserById;