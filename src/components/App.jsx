import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import css from "./App.module.css";

// Парсер для datetime-local як UTC
const parseDateAsUTC = (value) => {
  const [datePart, timePart] = value.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  return new Date(Date.UTC(year, month - 1, day, hour, minute));
};

export default function App() {
  // Початкова дата у форматі UTC
  const [initialDate, setInitialDate] = useState(
    new Date().toISOString().slice(0, 16),
  );
  const [hoursToAdd, setHoursToAdd] = useState("");
  const [newDate, setNewDate] = useState("");

  const addHoursToDateUTC = (dateString, hours) => {
    const baseDate = parseDateAsUTC(dateString);
    baseDate.setUTCHours(baseDate.getUTCHours() + hours);
    return baseDate;
  };

  const handleAddHours = () => {
    if (!hoursToAdd) {
      alert("Будь ласка, введіть кількість годин.");
      return;
    }

    const result = addHoursToDateUTC(initialDate, hoursToAdd);

    // Форматуємо дату у 24-годинному форматі з секундами
    const formattedDate = new Intl.DateTimeFormat("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      // hourCycle: "h23", // примусово 24-годинний формат
      timeZone: "UTC",
    }).format(result);

    setNewDate(formattedDate);
    setHoursToAdd("");
  };

  const year = new Date().getUTCFullYear();

  return (
    <>
      <Analytics />
      <div className={css.containerApp}>
        <div className={css.app}>
          <h1 className={css.heppyNewYear}>{year}</h1>
          <br />
          <br />
          <h1 className={css.appH1}>Додавання годин до Дати (UTC)</h1>

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
            <span className={css.appH3}>Кількість годин (+/-)</span>
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
              <p className={css.appNewDate}>{newDate} (UTC)</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
