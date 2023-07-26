function startRandom() {
  var display = document.getElementById('display');
  display.innerHTML = '';

  var intervalId = setInterval(function() {
    var numbers = generateRandomNumbers(1, 44);
    display.textContent = numbers.join(', ');

    if (numbers.length === 5) {
      clearInterval(intervalId);
    }
  }, 500);
}

function generateRandomNumbers(min, max) {
  var numbers = [];
  while (numbers.length < 5) {
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }
  numbers.sort(function(a, b) {
    return a - b;
  });
  return numbers;
}
