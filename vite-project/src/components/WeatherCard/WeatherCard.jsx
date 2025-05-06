import sunny from "../../assets/sunny.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg; F</p>
      <img
        src={sunny}
        alt="sunny"
        className="weather-card__image"
        // style={{ width: "100%", maxWidth: "870px", height: "auto" }}
      />
    </section>
  );
}

export default WeatherCard;
