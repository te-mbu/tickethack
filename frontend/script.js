function removeOldSearchedTrips() {
  const searchedTrips = document.querySelectorAll(".searched-trips");
  if (searchedTrips) {
    for (let trip of searchedTrips) {
      trip.remove();
    }
  }
}

// Search
document.querySelector("#btn-block").addEventListener("click", () => {

  removeOldSearchedTrips();

  const departure = document.querySelector("#departure").value;
  const arrival = document.querySelector("#arrival").value;
  const date = document.querySelector("#date").value;

  if (departure && arrival && date) {
    const body = {
      departure: departure,
      arrival: arrival,
      date: date,
    };

    fetch("http://localhost:3000/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((trips) => {
        const bookBox = document.querySelector("#book-box");
        for (let trip of trips.data) {
          const date = new Date(trip.date);
          bookBox.innerHTML += `
          <div class="searched-trips">
                        <div class="s-trip-infos">${trip.departure} > ${
            trip.arrival
          }<span class="s-trip-time">${date.getHours()}:${
            (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
          }</span> <span class="s-trip-price">${trip.price}</span></div>
                        <input type="button" class="book-btn" value="Book">
                    </div>
                `;
        }
      });
  }


  
  
});


// Add to cart
const bookBtn = document.querySelectorAll(".book-btn");
if (bookBtn) {
  for (let button of bookBtn) {
    button.addEventListener("click", () => {

      // fetch("/cart", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: {arrival: },
      // });
    });
  }
}