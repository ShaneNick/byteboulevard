// get the form element
const commentform = document.getElementById('comment-form');

// add an event listener for the form submission event
commentform.addEventListener('submit', function(event) {
    // prevent the default form submission behaviour
    event.preventDefault();

    // get the form data
    const formData = {
        content: document.getElementById('content').value.trim(),
        post_id: document.getElementById('post-id').value,
    };

    // send a POST request to the server with the form data
    fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
        // Clear the form
        document.getElementById('content').value = '';
        location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
