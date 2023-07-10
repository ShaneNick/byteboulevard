console.log('main.js is working');

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

document.querySelector('#logout-button').addEventListener('click', async () => {
  const response = await fetch('/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
      document.location.replace('/');
  } else {
      alert('Logout failed');
  }
});



