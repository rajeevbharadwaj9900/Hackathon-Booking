// Function to scroll the movie list to the left
function scrollLeft() {
    const movieList = document.querySelector('.movie-list');
    movieList.scrollBy({
        top: 0,
        left: -300,
        behavior: 'smooth'
    });
}

// Function to scroll the movie list to the right
function scrollRight() {
    const movieList = document.querySelector('.movie-list');
    movieList.scrollBy({
        top: 0,
        left: 300,
        behavior: 'smooth'
    });
}

// Get the logged-in user's name
const username = sessionStorage.getItem('username'); // Assuming you store username in sessionStorage on login
if (username) {
    document.getElementById('profile-text').textContent = username;
}

function logout() {
    // Remove user session or token
    sessionStorage.removeItem('username'); // Assuming you store username in sessionStorage
    window.location.href = 'login.html'; // Redirect to login page
}

// Toggle dropdown menu
document.querySelector('.profile-text-container').addEventListener('click', () => {
    document.getElementById('dropdown-menu').classList.toggle('show');
});

// Close dropdown menu when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.profile-text, .profile-text *')) {
        const dropdowns = document.getElementsByClassName('dropdown-menu');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
