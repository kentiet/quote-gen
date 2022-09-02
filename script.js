const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twtBtn = document.getElementById("twitter");
const newQBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const newQuote = (apiQuotes) => {
  if (apiQuotes.quoteText === 0) {
    loading();
  } else {
    // const q = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = apiQuotes.quoteAuthor
      ? apiQuotes.quoteAuthor
      : "Unknown";

    apiQuotes.quoteText.length > 50
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");

    quoteText.textContent = apiQuotes.quoteText;
    complete();
  }
};

async function getQuotes() {
  loading();
  const proxyUrl = "https://protected-caverns-63094.herokuapp.com/";
  const API_URL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=xml&lang=en&format=json";

  try {
    const res = await fetch(proxyUrl + API_URL);

    apiQuotes = await res.json();
    newQuote(apiQuotes);
  } catch (err) {
    // alert(err);
  }
}

// Tweet Quote

function tweetQuote() {
  const twtUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twtUrl, "_blank");
}

// Event listener
newQBtn.addEventListener("click", newQuote);
twtBtn.addEventListener("click", tweetQuote);

// Show loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// onload
getQuotes();
