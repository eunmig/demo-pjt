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

  // 지난 달의 연도와 월 계산
  const { year: prevYear, month: prevMonth } = getPreviousMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  // 다음달의 연도와 월 계산
  const { year: nextYear, month: nextMonth } = getNextMonth(year, month);

  // 첫 번째 주의 시작 요일 맞춤 빈칸 추가
  const daysArray = [
    ...Array.from({ length: startDay }, (_, i) => daysInPrevMonth - startDay + i + 1), // 지난달의 날짜 추가
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1), // 현재 달의 날짜 추가
    ...Array.from({ length: (7 - (daysInMonth + startDay) % 7) % 7 }, (_, i) => i + 1) // 다음달의 날짜 추가
  ];

  // 이벤트가 있는 날 표시
  const getEventsForDay = (day) => {
    const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return events.filter(event => event.date === dateString);
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

          // 날짜 셀 클릭 시 모달 열기
          const handleDateClick = () => {
            const selectedDate = `${displayMonth.year}-${(displayMonth.month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            onDateClick(selectedDate);  // 선택한 날짜를 전달
          };

          return (
            <div key={index} className={className} onClick={handleDateClick}>
              <span className="calendar-day">{day}</span>
              {/* 일정이 있는 경우 색깔 있는 점으로 표시 */}
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