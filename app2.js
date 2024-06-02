const arrowsLeft = document.querySelectorAll(".arrow-left");
const arrowsRight = document.querySelectorAll(".arrow-right");
const parkLists = document.querySelectorAll(".park-list");

arrowsLeft.forEach((arrow, i) => {
  const parkList = parkLists[i];
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const itemWidth = parkList.querySelector(".park-list-item").getBoundingClientRect().width;
    const ratio = Math.floor(window.innerWidth / (itemWidth + 20));
    clickCounter--;
    if (clickCounter < 0) {
      clickCounter = 0;
    }
    parkList.style.transform = `translateX(${-clickCounter * itemWidth}px)`;
  });
});

arrowsRight.forEach((arrow, i) => {
  const parkList = parkLists[i];
  const itemNumber = parkList.querySelectorAll(".park-list-item").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const itemWidth = parkList.querySelector(".park-list-item").getBoundingClientRect().width;
    const ratio = Math.floor(window.innerWidth / (itemWidth + 20));
    clickCounter++;
    if (clickCounter < 0) {
      clickCounter = 0;
    }
    if (clickCounter > itemNumber - ratio) {
      clickCounter = itemNumber - ratio;
    }
    parkList.style.transform = `translateX(${-clickCounter * itemWidth}px)`;
  });
});

// Toggle dark mode
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.park-list-title,.navbar-container,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

// Add click event to park items
const parkItems = document.querySelectorAll(".park-list-item");

parkItems.forEach(item => {
  item.addEventListener("click", () => {
    const parkId = item.getAttribute("data-id");
    const parkTitle = item.getAttribute("data-title");
    const parkDesc = item.getAttribute("data-desc");
    const parkImg = item.getAttribute("data-img");
    window.location.href = `amusement.html?id=${parkId}&title=${encodeURIComponent(parkTitle)}&desc=${encodeURIComponent(parkDesc)}&img=${parkImg}`;
  });
});

// Profile dropdown
const profileContainer = document.querySelector('.profile-container');
const dropdownMenu = document.querySelector('.dropdown-menu');

profileContainer.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});

// Search parks
function searchAttractions() {
  const query = document.querySelector('.search-input').value;
  if (query) {
    window.location.href = `search.html?query=${encodeURIComponent(query)}`;
  }
}

// Dynamic featured attraction section
let currentFeaturedIndex = 0;
const featuredContent = document.querySelector("#featured-content");
const featuredTitle = document.querySelector(".featured-title");
const featuredDesc = document.querySelector(".featured-desc");
const featuredButton = document.querySelector(".featured-button");

function updateFeaturedAttraction() {
  const park = parkItems[currentFeaturedIndex];
  const parkImg = park.getAttribute("data-img");
  const parkTitle = park.getAttribute("data-title");
  const parkDesc = park.getAttribute("data-desc");

  featuredContent.classList.add('fade-out');

  setTimeout(() => {
    featuredContent.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0), #151515), url('img2/${parkImg}')`;
    featuredContent.style.backgroundSize = 'cover';
    featuredTitle.textContent = parkTitle;
    featuredDesc.textContent = parkDesc;

    featuredContent.classList.remove('fade-out');
    featuredContent.classList.add('fade-in');

    setTimeout(() => {
      featuredContent.classList.remove('fade-in');
    }, 1000);
  }, 1000);

  currentFeaturedIndex = (currentFeaturedIndex + 1) % parkItems.length;
}

let intervalId = setInterval(updateFeaturedAttraction, 3000);

featuredContent.addEventListener("click", () => {
  clearInterval(intervalId);
  const park = parkItems[(currentFeaturedIndex - 1 + parkItems.length) % parkItems.length];
  const parkId = park.getAttribute("data-id");
  window.location.href = `amusement.html?id=${parkId}&title=${encodeURIComponent(park.getAttribute("data-title"))}&desc=${encodeURIComponent(park.getAttribute("data-desc"))}&img=${park.getAttribute("data-img")}`;
});

featuredContent.addEventListener("mouseover", () => clearInterval(intervalId));
featuredContent.addEventListener("mouseout", () => intervalId = setInterval(updateFeaturedAttraction, 3000));

updateFeaturedAttraction();

// Function to logout
function logout() {
  // Clear session or local storage
  localStorage.removeItem('loggedIn');
  location.href = 'amusements.html';
}

// Check login status
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem('loggedIn')) {
    document.getElementById('profile-text').textContent = 'Profile';
    document.getElementById('dropdown-menu').style.display = 'block';
  } else {
    document.getElementById('profile-text').textContent = 'Sign In';
    document.getElementById('dropdown-menu').style.display = 'none';
  }
});

// Sign in (for demonstration purposes, this would be replaced with actual sign-in logic)
function signIn() {
  localStorage.setItem('loggedIn', true);
  location.reload();
}
