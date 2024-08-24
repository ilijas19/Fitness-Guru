class CalculatorView {
  constructor() {
    this.calculatorForm = document.getElementById("calorie-form");
    this.resultContainer = document.getElementById("result");
  }

  addCalculatorPageHandler(handler) {
    const url = window.location.href;

    if (url.includes("calculator.html") || url.includes("calculator")) {
      handler();
    }
  }

  bindCalculate(callBackFunction) {
    if (this.calculatorForm) {
      this.calculatorForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const age = parseFloat(document.getElementById("age").value);
        const gender = document.getElementById("gender").value;
        const height = parseFloat(document.getElementById("height").value);
        const weight = parseFloat(document.getElementById("weight").value);
        const activityLevel = document.getElementById("activity-level").value;

        const calorieNeeds = callBackFunction(
          age,
          gender,
          height,
          weight,
          activityLevel
        );
        this.resultContainer.textContent = `Your daily caloric needs are approximately ${Math.round(
          calorieNeeds
        )} calories.`;
      });
    }
  }
}
export default new CalculatorView();
