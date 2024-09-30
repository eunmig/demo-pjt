import React from 'react';

const CalendarHeader = ({ currentMonth, goToNextMonth, goToPreviousMonth }) => {
  
  // 현재 연도와 월 포맷팅
  const year = currentMonth.getFullYear();
  // { month: 'long' } => "September"
  const month = currentMonth.toLocaleString('default', { month: 'long' });

  return (
    <div className="calendar-header">
      <button onClick={goToPreviousMonth}>이전</button>
      <h2>{`${year}년 ${month}`}</h2>
      <button onClick={goToNextMonth}>다음</button>
    </div>
  );
};

export default CalendarHeader;
