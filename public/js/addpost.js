// get the form element
const form = document.querySelector('.form-container');

// add an event listener for the form submission event
form.addEventListener('submit', function(event) {
  // prevent the default form submission behaviour
  event.preventDefault();

  // get the form data
  const formData = new FormData(form);

  // Convert formData to regular JavaScript object
  const formDataObj = Object.fromEntries(formData);

  // send a POST request to the server with the form data
  fetch('/posts', {    // <--- Changed the route here
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formDataObj),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // handle the response data
      console.log('Success:', data);
      closeForm();
      // you might want to update the posts list here
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
