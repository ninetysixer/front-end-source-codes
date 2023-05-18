function calculateTip() {
  var billAmount = parseFloat(document.getElementById("bill-amount").value);
  var tipPercentage = parseFloat(document.getElementById("tip-percentage").value);

  if (billAmount && tipPercentage) {
    var tipAmount = (billAmount * tipPercentage) / 100;
    var totalAmount = billAmount + tipAmount;
    document.getElementById("tip-amount").textContent = "Tip Amount: $" + tipAmount.toFixed(2);
    document.getElementById("total-amount").textContent = "Total Amount: $" + totalAmount.toFixed(2);
  } else {
    document.getElementById("tip-amount").textContent = "Please enter valid bill amount and tip percentage";
    document.getElementById("total-amount").textContent = "";
  }
}
