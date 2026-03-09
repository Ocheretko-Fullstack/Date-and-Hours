import { useState } from "react";
import css from "./App.module.css";

export default function App() {
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
      // Показуємо помилку, якщо не введено кількість годин
      alert("Будь ласка, введіть кількість годин.");
      return;
    }

    const result = addHoursToDate(initialDate, hoursToAdd);

    // Форматуємо дату на українську мову
    const formattedDate = result.toLocaleString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    setNewDate(formattedDate);
    setHoursToAdd(""); // Очищаємо поле вводу кількості годин
  };

  return (
    <>
      <div className={css.containerApp}>
        <div className={css.app}>
          <h1 className={css.heppyNewYear}>2026</h1>
          <br />
          <br />
          <h1 className={css.appH1}>Додавання годин до Дати</h1>
          <label className={css.labelPosition}>
            <span className={css.appH2}>Початкова дата і час</span>
            <input
              className={css.dataApp}
              type="datetime-local"
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
            />
          </label>
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
              <h2>Нова дата і час</h2>
              <p className={css.appNewDate}>{newDate}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
