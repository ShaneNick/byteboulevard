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

    console.log('Form data:', formData); // Check the formData values

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
        // Fetch and update the post data
        fetch(`/api/posts/${formData.post_id}`)
            .then(response => response.json())
            .then(postData => {
                // Update the comments section
                updateCommentsSection(postData.comments);
            })
            .catch(error => {
                console.error('Error fetching post data:', error);
            });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Function to update the comments section in the HTML
function updateCommentsSection(comments) {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = ''; // Clear the current comments

    if (comments.length > 0) {
        const commentsHTML = comments.map(comment => {
            return `
                <li>
                    <p>${comment.content} - ${comment.user.username} (${format_date(comment.date_created)})</p>
                </li>
            `;
        }).join('');
        commentsList.innerHTML = commentsHTML;
    } else {
        commentsList.innerHTML = '<p>No comments yet.</p>';
    }
}
