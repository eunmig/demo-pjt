// CalendarBody.js
import React from "react";
import './CalendarBody.css';
import { getDaysInMonth, getStartDayOfMonth, getNextMonth, getPreviousMonth } from "../../utils/dateHelpers";

const CalendarBody = ({ currentMonth, events, onDateClick }) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // 현재 월의 일 수와 시작 요일
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDayOfMonth(year, month);

  // 지난 달과 다음 달의 연도와 월 계산
  const { year: prevYear, month: prevMonth } = getPreviousMonth(year, month);
  const { year: nextYear, month: nextMonth } = getNextMonth(year, month);

  // 날짜 배열 생성
  const daysArray = [
    ...Array.from({ length: startDay }, (_, i) => daysInMonth + i - startDay), // 지난달
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1), // 현재 달
    ...Array.from({ length: (7 - (daysInMonth + startDay) % 7) % 7 }, (_, i) => i + 1) // 다음달
  ];

  // 날짜 포맷팅 헬퍼 함수
  const formatDateString = (year, month, day) => `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  // 특정 날짜의 일정 가져오기
  const getEventsForDay = (day) => {
    const dateString = formatDateString(year, month, day);
    return events.filter(event => event.date.startsWith(dateString));
  };

  // 날짜 셀 클릭 핸들러
  const handleDateClick = (displayMonth, day) => {
    const selectedDate = formatDateString(displayMonth.year, displayMonth.month, day);
    onDateClick(selectedDate);
  };

  return (
    <div className="calendar-body">
      <div className="calendar-grid">
        {daysArray.map((day, index) => {
          let displayMonth = { year, month };   // 현재 월
          let className = "calendar-cell";

          if (index < startDay) {
            displayMonth = { year: prevYear, month: prevMonth }; // 지난 달
            className += " prev-month";
          } else if (index >= startDay + daysInMonth) {
            displayMonth = { year: nextYear, month: nextMonth }; // 다음 달
            className += " next-month";
          }

          return (
            <div key={index} className={className} onClick={() => handleDateClick(displayMonth, day)}>
              <span className="calendar-day">{day}</span>
              {/* 일정이 있는 경우 표시 */}
              {getEventsForDay(day).length > 0 && (
                <div className="event-indicator"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarBody;