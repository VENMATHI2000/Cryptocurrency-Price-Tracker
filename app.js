// Select elements from the DOM
const fetchBtn = document.getElementById('fetch-btn');
const cryptoInput = document.getElementById('crypto-input');
const priceDisplay = document.getElementById('price-display');

// CoinGecko API base URL
const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=';

// Function to fetch cryptocurrency price
const fetchCryptoPrice = async () => {
    const crypto = cryptoInput.value.trim().toLowerCase(); // Get input value and trim it
    if (crypto) {
        try {
            const response = await fetch(`${apiUrl}${crypto}&vs_currencies=usd`);
            if (!response.ok) {
                throw new Error('Cryptocurrency not found');
            }
            const data = await response.json();
            const price = data[crypto]?.usd;
            
            if (price) {
                priceDisplay.innerHTML = `1 ${crypto.toUpperCase()} = $${price.toFixed(2)} USD`;
                priceDisplay.classList.remove('error');
            } else {
                priceDisplay.innerHTML = `Price data for ${crypto} not available.`;
                priceDisplay.classList.add('error');
            }
        } catch (error) {
            priceDisplay.innerHTML = `Error: ${error.message}`;
            priceDisplay.classList.add('error');
        }
    } else {
        priceDisplay.innerHTML = 'Please enter a cryptocurrency.';
        priceDisplay.classList.add('error');
    }
};

// Add event listener to button
fetchBtn.addEventListener('click', fetchCryptoPrice);
