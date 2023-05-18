const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Innovation distinguishes between a leader and a follower. - Steve Jobs",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "The best way to predict the future is to create it. - Peter Drucker",
  "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt"
];

function generateQuote() {
  const quoteContainer = document.getElementById("quote");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteContainer.textContent = quotes[randomIndex];
}
