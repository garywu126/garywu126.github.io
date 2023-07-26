var count = 0;
var countElement = document.getElementById("count");

function incrementCount() {
  count++;
  countElement.textContent = count;
}

function decrementCount() {
  count--;
  countElement.textContent = count;
}

function resetCount() {
  count = 0;
  countElement.textContent = count;
}
