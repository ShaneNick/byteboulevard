const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            document.location.replace('/');
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.message;
            // Display errorMessage on the page
            const errorElement = document.querySelector('#error-message');
            errorElement.textContent = errorMessage;
        }
    }
};

document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
