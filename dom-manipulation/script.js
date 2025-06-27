
// Load quotes from localStorage or use default
function loadQuotes() {
  const saved = localStorage.getItem("quotes");
  return saved ? JSON.parse(saved) : [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do or do not. There is no try.", category: "Wisdom" }
  ];
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}
let quotes = loadQuotes();
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please fill in both the quote and category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes(); // Save to localStorage
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  updateCategoryDropdown();
  alert("Quote added!");
}
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

  // Save to sessionStorage
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Optional: Load and show last quote on start
function loadLastQuote() {
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const quote = JSON.parse(last);
    quoteDisplay.textContent = `"${quote.text}" - ${quote.category}`;
  }
}
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);

      if (!Array.isArray(importedQuotes)) throw new Error("Invalid format");

      // Optional: validate quote structure
      for (const q of importedQuotes) {
        if (!q.text || !q.category) throw new Error("Missing fields");
      }

      quotes.push(...importedQuotes);
      saveQuotes();
      updateCategoryDropdown();
      alert("Quotes imported successfully!");
    } catch (e) {
      alert("Error importing quotes: " + e.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}
function init() {
  
  loadLastQuote(); // optional
}
