// Quotes array
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do or do not. There is no try.", category: "Wisdom" }
];

// Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const categorySelect = document.createElement("select");

// === Dynamically create quote form ===
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

// === Update category dropdown ===
function updateCategoryDropdown() {
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];

  categorySelect.innerHTML = `<option value="all">All</option>`;
  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// === Show a random quote ===
function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" - ${quote.category}`;
}

// === Add a new quote ===
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please fill in both the quote and category.");
    return;
  }

  quotes.push({ text, category });
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  updateCategoryDropdown();
  alert("Quote added!");
}

// === Initial Setup ===
function init() {
  // Add title
  const title = document.createElement("h1");
  title.textContent = "Dynamic Quote Generator";
  document.body.insertBefore(title, document.body.firstChild);

  // Append quote display and button
  document.body.appendChild(quoteDisplay);
  document.body.appendChild(newQuoteButton);
  newQuoteButton.addEventListener("click", showRandomQuote);

  // Append category select
  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Select Category:";
  document.body.appendChild(categoryLabel);
  document.body.appendChild(categorySelect);
  categorySelect.addEventListener("change", showRandomQuote);

  // Create quote form dynamically
  createAddQuoteForm();

  // Initialize dropdown and quote
  updateCategoryDropdown();
  showRandomQuote();
}

init();
