// Initial quotes array
let quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "To be or not to be, that is the question.", category: "Philosophy" }
];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const categorySelect = document.getElementById("categorySelect");
const newQuoteBtn = document.getElementById("newQuote");

// Populate category dropdown
function populateCategories() {
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  categorySelect.innerHTML = "";
  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

// Display a random quote from selected category
function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  const filteredQuotes = quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  quoteDisplay.textContent = `"${filteredQuotes[randomIndex].text}"`;
}

// Add a new quote dynamically
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text === "" || category === "") {
    alert("Please fill in both the quote and the category.");
    return;
  }

  quotes.push({ text, category });

  // Update UI
  populateCategories();
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  alert("Quote added successfully!");
}

// Initial setup
populateCategories();
newQuoteBtn.addEventListener("click", showRandomQuote);
