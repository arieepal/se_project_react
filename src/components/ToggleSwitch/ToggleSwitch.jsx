import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle-switch__checkbox"
      />
      <div className="toggle-switch__circle"> </div>
      <div className="toggle-switch__text toggle-switch__text_F">F</div>
      <div className="toggle-switch__text toggle-switch__text_C">C</div>
    </label>
  );
}
export default ToggleSwitch;
