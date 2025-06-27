const SERVER_API_URL = "https://jsonplaceholder.typicode.com/posts"; // For simulation

async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_API_URL);
    const data = await response.json();

    // Convert to quote structure (simulate server format)
    const serverQuotes = data.slice(0, 10).map(post => ({
      text: post.title,
      category: "Server"
    }));

    return serverQuotes;
  } catch (error) {
    console.error("Failed to fetch from server:", error);
    return [];
  }
}

function startSyncInterval() {
  setInterval(async () => {
    const serverQuotes = await fetchQuotesFromServer();
    syncWithServer(serverQuotes);
  }, 10000); // Sync every 10 seconds
}

function syncWithServer(serverQuotes) {
  let updated = false;

  serverQuotes.forEach(serverQuote => {
    const exists = quotes.some(localQuote => localQuote.text === serverQuote.text);

    if (!exists) {
      quotes.push(serverQuote);
      updated = true;
    }
  });

  if (updated) {
    saveQuotes();
    populateCategories();
    notifyUser("New quotes synced from server.");
  }
}

function syncWithServer(serverQuotes) {
  let updated = false;

  serverQuotes.forEach(serverQuote => {
    const localMatchIndex = quotes.findIndex(q => q.text === serverQuote.text);

    if (localMatchIndex === -1) {
      quotes.push(serverQuote); // New quote
      updated = true;
    } else {
      // Conflict: update local category to match server
      if (quotes[localMatchIndex].category !== serverQuote.category) {
        quotes[localMatchIndex].category = serverQuote.category;
        updated = true;
        notifyUser(`Conflict resolved: "${serverQuote.text}" category updated from server.`);
      }
    }
  });

  if (updated) {
    saveQuotes();
    populateCategories();
  }
}

function notifyUser(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.className = "notification";
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 4000);
}



