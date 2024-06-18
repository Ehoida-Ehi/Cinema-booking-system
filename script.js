document.addEventListener('DOMContentLoaded', function() {
    const movies = [
        { title: 'Bad Boys: Ride or Die', seats: 30 },
        { title: 'Kung Fu Panda 4', seats: 20 },
        { title: 'Funmilayo Ransome Kuti', seats: 25 }
    ];
    const seatPrice = { regular: 10, premium: 15 };

    const movieSelect = document.getElementById('movie');
    const seatsContainer = document.getElementById('seatsContainer');
    const bookingForm = document.getElementById('bookingForm');
    const summary = document.getElementById('summary');
    const summaryDetails = document.getElementById('summaryDetails');
    const minorIndicator = document.getElementById('minorIndicator');
    const ageInput = document.getElementById('age');

    movies.forEach(movie => {
        const option = document.createElement('option');
        option.value = movie.title;
        option.textContent = movie.title;
        movieSelect.appendChild(option);
    });

    movieSelect.addEventListener('change', function() {
        const selectedMovie = movies.find(movie => movie.title === movieSelect.value);
        seatsContainer.innerHTML = '';
        for (let i = 1; i <= selectedMovie.seats; i++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.textContent = i;
            seat.addEventListener('click', function() {
                seat.classList.toggle('selected');
            });
            seatsContainer.appendChild(seat);
        }
    });

    ageInput.addEventListener('input', function() {
        if (ageInput.value < 18) {
            minorIndicator.style.display = 'inline';
        } else {
            minorIndicator.style.display = 'none';
        }
    });

    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const movie = document.getElementById('movie').value;
        const date = document.getElementById('date').value.trim();
        const time = document.getElementById('time').value.trim();
        const ticketType = document.getElementById('ticketType').value;
        const numTickets = parseInt(document.getElementById('numTickets').value.trim());
        const selectedSeats = [...document.getElementsByClassName('seat selected')].map(seat => seat.textContent);

        const errorMessage = document.getElementById('errorMessage');
        errorMessage.innerHTML = '';

        if (!name) {
            errorMessage.innerHTML += 'Name is required.<br>';
        }
        if (!age) {
            errorMessage.innerHTML += 'Age is required.<br>';
        }
        if (!phone || !/^\d{1,11}$/.test(phone)) {
            errorMessage.innerHTML += 'Phone number is required and must be up to 11 digits.<br>';
        }
        if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errorMessage.innerHTML += 'A valid email address is required.<br>';
        }
        if (!movie) {
            errorMessage.innerHTML += 'Please select a movie.<br>';
        }
        if (!date) {
            errorMessage.innerHTML += 'Date is required.<br>';
        }
        if (!time) {
            errorMessage.innerHTML += 'Time is required.<br>';
        }
        if (!numTickets || numTickets <= 0) {
            errorMessage.innerHTML += 'Please enter a valid number of tickets.<br>';
        }
        if (selectedSeats.length !== numTickets) {
            errorMessage.innerHTML += 'Please select the correct number of seats.<br>';
        }

        if (errorMessage.innerHTML) {
            return;
        }

        const totalCost = numTickets * seatPrice[ticketType];

        summaryDetails.innerHTML = `
            <strong>Name:</strong> ${name}<br>
            <strong>Age:</strong> ${age}<br>
            <strong>Phone:</strong> ${phone}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Movie:</strong> ${movie}<br>
            <strong>Date:</strong> ${date}<br>
            <strong>Time:</strong> ${time}<br>
            <strong>Ticket Type:</strong> ${ticketType}<br>
            <strong>Number of Tickets:</strong> ${numTickets}<br>
            <strong>Seats:</strong> ${selectedSeats.join(', ')}<br>
            <strong>Total Cost:</strong> N${totalCost.toFixed(2)}
        `;
        summary.style.display = 'block';
    });
});
