document.addEventListener("DOMContentLoaded", function() {
  const countDisplay = document.getElementById("count");
  const incrementBtn = document.getElementById("increment");
  const decrementBtn = document.getElementById("decrement");
  const inputNumber = document.getElementById("input-number");

  let count = 0;

  function updateCount() {
    countDisplay.textContent = count;
  }

  function increment() {
    count++;
    updateCount();
  }

  function decrement() {
    count--;
    updateCount();
  }

  function inputChange() {
    count = parseInt(inputNumber.value) || 0;
    updateCount();
  }

  incrementBtn.addEventListener("click", increment);
  decrementBtn.addEventListener("click", decrement);
  inputNumber.addEventListener("change", inputChange);
});
