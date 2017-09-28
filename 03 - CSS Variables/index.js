const inputs = document.querySelectorAll('.controls input');
// "input" fires whenever the input is changed, e.g. a slider is being dragged
// "change" does not: it fires when you let go of the slider (confusing? kinda)
inputs.forEach(input => input.addEventListener("input", handleInput));

function handleInput(e) {
  const name = `--${this.name}`;
  const value = `${this.value}${this.dataset.sizing || ""}`;
  // corresponding getter: getPropertyValue(name);
  document.documentElement.style.setProperty(name, value);
}
