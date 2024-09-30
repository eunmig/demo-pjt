// useCalendar.js
import { useState, useEffect } from 'react'

const useCalendar = () => {
    const [events, setEvents] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        // JSON 파일로부터 데이터를 불러오는 로직
        fetch('/data/events.json')
          .then((response) => response.json())
          .then((data) => setEvents(data));
      }, []);
    
      // 다음달 이동
      const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
      };
    
      // 이전달 이동
      const goToPreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
      };

      // 일정 저장
      const addEvent = (newEvent) => {
        setEvents(prevents => [...prevents, newEvent]);
      };

      // 일정 수정
      const updateEvent = (updatedEvent) => {
        setEvents((prevEvents) =>
          prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event)
        );
      };  

      // 일정 삭제
      const deleteEvent = (eventId) => {
        setEvents(prevEvents =>
          prevEvents.filter(event => event.id !== eventId)
        );
      };
    
      return { events, currentMonth, goToNextMonth, goToPreviousMonth, addEvent, updateEvent, deleteEvent };
    };
    
    export default useCalendar;