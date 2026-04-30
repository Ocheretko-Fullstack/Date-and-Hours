import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import css from "./App.module.css";

export default function App() {
  // Початкова дата у форматі UTC (ISO)
  const [initialDate, setInitialDate] = useState(
    new Date().toISOString().slice(0, 16),
  );
  const [hoursToAdd, setHoursToAdd] = useState("");
  const [newDate, setNewDate] = useState("");

  const addHoursToDate = (date, hours) => {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
  };

  const handleAddHours = () => {
    if (!hoursToAdd) {
      alert("Будь ласка, введіть кількість годин.");
      return;
    }

    const result = addHoursToDate(initialDate, hoursToAdd);

    // Форматуємо дату у UTC з назвою місяця
    const formattedDate = new Intl.DateTimeFormat("uk-UA", {
      year: "numeric",
      month: "long", // назва місяця
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC", // важливо: показує саме UTC
    }).format(result);

    setNewDate(formattedDate);
    setHoursToAdd(""); // очищаємо поле кількості годин
  };

  const year = new Date().getFullYear();

  return (
    <>
      <Analytics />
      <div className={css.containerApp}>
        <div className={css.app}>
          <h1 className={css.heppyNewYear}>{year}</h1>
          <br />
          <br />
          <h1 className={css.appH1}>Додавання годин до Дати</h1>

          {/* Початкова дата */}
          <label className={css.labelPosition}>
            <span className={css.appH2}>Початкова дата і час (UTC)</span>
            <input
              className={css.dataApp}
              type="datetime-local"
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
            />
          </label>

          {/* Кількість годин */}
          <label className={css.sumAppHours}>
            <span className={css.appH3}>Кількість годин</span>
            <input
              className={css.dataApp2}
              type="number"
              value={hoursToAdd}
              onChange={(e) => setHoursToAdd(parseInt(e.target.value))}
            />
          </label>

          <button
            type="button"
            className={css.addClock}
            onClick={handleAddHours}>
            Пошук дати
          </button>

          {newDate && (
            <div>
              <h2>Нова дата і час (UTC)</h2>
              <p className={css.appNewDate}>{newDate}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
