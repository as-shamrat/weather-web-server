const weatherContent = document.querySelector(".weather-content");
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const searchValue = document.querySelector("input").value;
  fetch(`http://localhost:3000/weather?address=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      const { current, location } = data;
      const { is_day, temperature, precip, feelslike } = current;
      const { country, name } = location;
      let p = document.createElement("p");
      const weatherString = `In ${name}, ${country} it is ${
        is_day === "yes" ? "day" : "night"
      } and the temperature is ${temperature} degrees but it feels like ${feelslike} degrees.It has ${
        precip * 100
      }% chance to rain.`;
      p.textContent = weatherString;
      weatherContent.appendChild(p);
      console.log(weatherString);
    })
    .catch((error) => {
      const p = document.createElement("p");
      p.innerText = "Invalid location to fetch";
      weatherContent.appendChild(p);
      console.error(error);
    });
  console.log("form submitted");
});

// fetch("https://puzzle.mead.io/puzzle")
//   .then((res) => res.json())
//   .then((data) => console.log(data));
