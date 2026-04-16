// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const input = document.getElementById("state-input");
const button = document.getElementById("fetch-button");
const displayDiv = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

// ✅ IMPORTANT FIX
if (button) {
  button.addEventListener("click", async () => {
    try {
      displayDiv.innerHTML = "";
      errorDiv.textContent = "";
      errorDiv.classList.add("hidden");

      const response = await fetch(
        `https://api.weather.gov/alerts/active?area=${input.value}`
      );

      const data = await response.json();

      const alerts = data.features || [];

      const summary = document.createElement("h2");
      summary.textContent = `Weather Alerts: ${alerts.length}`;
      displayDiv.appendChild(summary);

      alerts.forEach(alert => {
        const p = document.createElement("p");
        p.textContent = alert.properties.headline;
        displayDiv.appendChild(p);
      });

      input.value = "";

    } catch (error) {
      errorDiv.textContent = error.message;
      errorDiv.classList.remove("hidden");
    }
  });
}