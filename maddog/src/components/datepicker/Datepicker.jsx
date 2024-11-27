import { useEffect, useState } from "react";
import  './datepicker.scss';
function Datepicker({selectedDate, setSelectedDate, multiple=false}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  
  useEffect(() => {
    setSelectedMonth(selectedDate.getMonth());
    setSelectedYear(selectedDate.getFullYear());
  }, [selectedDate]);

  useEffect(() => {
    setSelectedDate(new Date(selectedYear, selectedMonth, selectedDate.getDate()));
  }, [selectedMonth, selectedYear]);

  return (
    <div className="datepicker">
      <div className="datepicker__header">
        <span className="datepicker__header-date">
          {selectedDate.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <div className="datepicker__body">
        <div className="datepicker__calendar">
          <div className="datepicker__calendar-header">
            <div className="datepicker__months-selector">
              <button className="datepicker__months-selector-button" onClick={() => setSelectedMonth(selectedMonth - 1)}>
                Previous
              </button>
              <span className="datepicker__selected-month">
                {selectedDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
              </span>
              <button className="datepicker__months-selector-button" onClick={() => setSelectedMonth(selectedMonth + 1)}>
                Next
              </button>
            </div>
            <div className="datepicker__day-names">
              <span className="datepicker__calendar-header-day">Пн</span>
              <span className="datepicker__calendar-header-day">Вт</span>
              <span className="datepicker__calendar-header-day">Ср</span>
              <span className="datepicker__calendar-header-day">Чт</span>
              <span className="datepicker__calendar-header-day">Пт</span>
              <span className="datepicker__calendar-header-day">Сб</span>
              <span className="datepicker__calendar-header-day">Вс</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
export default Datepicker