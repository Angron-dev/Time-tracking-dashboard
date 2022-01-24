const dailyBtn = document.querySelector("#daily-btn");
const hours = document.querySelectorAll(".hours");
const prevHours = document.querySelectorAll(".previous-hours");
const buttons = document.querySelectorAll(".button");

fetch("data.json")
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    for (let x = 0; x < data.length; x++) {
      let hoursDaily = data[x].timeframes.daily;
      let hoursWeekly = data[x].timeframes.weekly;
      let hoursMonthly = data[x].timeframes.monthly;

      function check(a, b) {
        if (a.current == 1) {
          hours[x].innerHTML = a.current + "hr";
        } else {
          hours[x].innerHTML = a.current + "hrs";
        }
        if (a.previous == 1) {
          prevHours[x].innerHTML = "Last" + b + " - " + a.previous + "hr";
        } else {
          prevHours[x].innerHTML = "Last" + b + " - " + a.previous + "hrs";
        }
      }
      // Default
      check(hoursDaily, " Day");

      buttons[0].classList.add("active");

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("active");
            if (button.id == "daily-btn") {
              // DAILY
              button.classList.add("active");
              check(hoursDaily, " Day");
            } else if (button.id == "weekly-btn") {
              // WEEKLY
              button.classList.add("active");
              check(hoursWeekly, " Week");
            } else {
              // MONTHLY
              button.classList.add("active");
              check(hoursMonthly, " Month");
            }
          }
        });
      });
    }
  });
