function filteredByDate(trips, bodyDate) {
  const filteredTrips = [];
  let dayTrip = new Date(bodyDate);
  for (let trip of trips) {
    let dbDayTrip = new Date(trip.date);
    if (
      dbDayTrip.toLocaleDateString("en-US") ===
      dayTrip.toLocaleDateString("en-US")
    ) {
      filteredTrips.push(trip);
    }
  }
  return filteredTrips
}

module.exports = { filteredByDate }