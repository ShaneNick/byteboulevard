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
            console.log(await response.json());  
            document.location.replace('/');
        }
         else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
