let result = document.getElementById("result");

function calculate(val) {
  if (val == "=") {
    result.value = eval(result.value);
  } else if (val == "C") {
    result.value = "";
  } else {
    result.value += val;
  }
}
