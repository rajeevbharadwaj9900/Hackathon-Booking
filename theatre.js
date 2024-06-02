const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied):not(.number)');
const count = document.getElementById('count');
const total = document.getElementById('total');

populateUI();
let ticketPrice = 10; // Default price

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    const selectedSeatsDetails = [...selectedSeats].map((seat) => seat.getAttribute('data-seat'));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    localStorage.setItem('selectedSeatsDetails', JSON.stringify(selectedSeatsDetails));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    localStorage.setItem('totalAmount', selectedSeatsCount * ticketPrice); // Save total amount to local storage
}

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        ticketPrice = +localStorage.getItem('selectedMoviePrice');
    }
}

// Seat click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied') && !e.target.classList.contains('number')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

// Initial count and total set
updateSelectedCount();

// Redirect to payment portal
document.getElementById('confirm-btn').addEventListener('click', () => {
    window.location.href = 'payment.html'; // Assuming 'payment.html' is the payment portal page
});
