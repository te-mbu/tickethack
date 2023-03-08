function deleteCartTrip(trips) {
    const deleteButtons = document.querySelectorAll(".delete")
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", () => {
            const cartTrip = trips[i]
            fetch("http://localhost:3000/carts", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({departure: cartTrip.departure, arrival: cartTrip.arrival, date: cartTrip.date, price: cartTrip.price}),
      })
        .then(res => res.json())
        .then(data => {
            if (data.result) {
                deleteButtons[i].parentNode.remove()
                window.location.reload()
                console.log(data.message)
            } else {
                console.log(data.error)
            }
        })
        })
    }

}

window.addEventListener('load', (event) => {
    fetch("http://localhost:3000/carts")
        .then(res => res.json())
        .then(data => {
            if (data.result) {
                const rowCart = document.querySelector(".row-cart")
                let totalCart = 0
                for (let trip of data.data) {
                    const date = new Date(trip.date)
                    rowCart.innerHTML += `
                <div id="booking-choices">
                    <p class="choice">${trip.departure} > ${trip.arrival}</p>
                    <p class="choice">${(date.getHours() < 10 ? "0" : "") + date.getHours()}:${(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}</p>
                    <p class="choice">${trip.price}€</p>
                    <span class="delete">✖</span>
                </div>
                    `
                // Add price of each trip to total 
                totalCart += Number(trip.price)
                }
                // Update total cart price value
                document.querySelector("#total-price").textContent = `Total : ${totalCart}`

                deleteCartTrip(data.data)
            }
        })
});