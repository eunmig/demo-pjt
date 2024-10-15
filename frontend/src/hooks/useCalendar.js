// useCalendar.js
import { useState } from 'react'

const useCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

      // 다음달 이동
      const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
      };
    
      // 이전달 이동
      const goToPreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
      };
    
      return { currentMonth, goToNextMonth, goToPreviousMonth };
    };
    
    export default useCalendar;