document.getElementById('noBtn').addEventListener('click', () => {
    window.location.href = './failure.html';
});

document.getElementById('yesBtn').addEventListener('click', accept);

function accept() {
    window.location.href = 'valentine-message.html'; // Redirect to message first
}
