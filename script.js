const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twtBtn = document.getElementById("twitter");
const newQBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

const newQuote = () => {
  loading();
  const q = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  authorText.textContent = q.author ? q.author : "Unknown";

  q.text.length > 50
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  quoteText.textContent = q.text;
  complete();
};

async function getQuotes() {
  loading();
  const API_URL = "https://type.fit/api/quotes";

  try {
    const res = await fetch(API_URL);

    apiQuotes = await res.json();
    newQuote();
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
