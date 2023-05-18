function calculateBMI() {
  var weight = parseFloat(document.getElementById("weight").value);
  var height = parseFloat(document.getElementById("height").value) / 100; // convert height from cm to meters

  if (weight && height) {
    var bmi = weight / (height * height);
    document.getElementById("result").textContent = "Your BMI: " + bmi.toFixed(2);
  } else {
    document.getElementById("result").textContent = "Please enter valid weight and height";
  }
}
