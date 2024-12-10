// Initialize donation counters from localStorage or set default values
let donorCount = parseInt(localStorage.getItem('donorCount')) || 0;
let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

// DOM Elements
const donationForm = document.getElementById('donation-form');
const donationAmountInput = document.getElementById('donation-amount');
const donorCounter = document.getElementById('donor-counter');
const moneyCounter = document.getElementById('money-counter');
const predefinedButtons = document.querySelectorAll('.predefined-amount'); // Predefined donation buttons
const thankYouMessage = document.getElementById('thank-you-message'); // Thank you message container
const gcashModal = document.getElementById('gcashMOP'); // Modal for payment
const proceedButton = document.getElementById('proceed');
const closeButton = document.getElementById('close');

// Initialize counters on page load
function initializeCounters() {
    donorCounter.textContent = donorCount;
    moneyCounter.textContent = totalAmount.toFixed(2);
}

// Add spinning effect to counters
function triggerSpin() {
    donorCounter.classList.add('spinning');
    moneyCounter.classList.add('spinning');
    setTimeout(() => {
        donorCounter.classList.remove('spinning');
        moneyCounter.classList.remove('spinning');
    }, 1000); // Matches animation duration
}

// Update counters after a donation
function updateCounters(amount) {
    triggerSpin();
    donorCount++;
    totalAmount += amount;

    // Store updated values in localStorage
    localStorage.setItem('donorCount', donorCount);
    localStorage.setItem('totalAmount', totalAmount);

    // Update DOM after spin animation
    setTimeout(() => {
        donorCounter.textContent = donorCount;
        moneyCounter.textContent = totalAmount.toFixed(2);
    }, 1000);
}

// Display a thank-you message
function showThankYouMessage() {
    thankYouMessage.style.display = 'block';
    setTimeout(() => {
        thankYouMessage.style.display = 'none';
    }, 3000); // Visible for 3 seconds
}

// Handle donation form submission
donationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const donationAmount = parseFloat(donationAmountInput.value);

    if (donationAmount > 0) {
        gcashModal.showModal(); // Open the modal for GCash donation
    } else {
        alert("Invalid Donation Amount. Please enter a positive value.");
    }
});

// Handle predefined donation button clicks
predefinedButtons.forEach(button => {
    button.addEventListener('click', () => {
        const amount = parseFloat(button.dataset.amount);
        if (amount > 0) {
            donationAmountInput.value = amount; // Set the predefined amount in the input field
            gcashModal.showModal(); // Open the modal for GCash donation
        }
    });
});

// Modal proceed button logic (donation processing)
proceedButton.addEventListener('click', () => {
    const donationAmount = parseFloat(donationAmountInput.value);
    if (donationAmount > 0) {
        updateCounters(donationAmount); // Update counters on donation
        showThankYouMessage(); // Display the "Thank you" message
        donationAmountInput.value = ''; // Clear input field
        gcashModal.close(); // Close the modal after donation
    } else {
        alert("Please enter a valid donation amount.");
    }
});

// Close modal on close button click
closeButton.addEventListener('click', () => {
    gcashModal.close(); // Close the modal without donation
});

// Navigate back to home when logo is clicked
document.getElementById('logo').addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Initialize counters on page load
initializeCounters();
