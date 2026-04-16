// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const input = document.getElementById("state-input");
const button = document.getElementById("fetch-button");
const displayDiv = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

async function fetchWeatherAlerts() {
  try {
    displayDiv.innerHTML = "";
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");

    const state = input.value;

    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`
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

    return data;

  } catch (error) {
    errorDiv.textContent = error.message;
    errorDiv.classList.remove("hidden");

    return error;
  }
}

if (button) {
  button.addEventListener("click", fetchWeatherAlerts);
}

module.exports = { fetchWeatherAlerts };