// dateHelpers.js

// 해당 월의 일 수 계산
export const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
// 해당 월의 시작 요일 계산
export const getStartDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

// 지난 달의 연도와 월을 반환
export const getPreviousMonth = (year, month) => {
  if (month === 0) {
   return { year: year - 1, month: 11 } 
  }
  return { year, month: month - 1 }
}

// 다음 달의 연도와 월을 반환
export const getNextMonth = (year, month) => {
  if (month === 11) {
    return { year: year + 1, month: 0}
  }
  return { year, month: month + 1}
}
  
// 날짜 포맷팅
export const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};