import React, { useState } from "react";
import useCalendar from "../../hooks/useCalendar";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import ScheduleModal from "../modal/ScheduleModal";
import DateDetailModal from "../modal/DateDetailModal";
import EventDetailModal from "../modal/EventDetailModal"; // 추가된 모달

const Calendar = () => {
  const { events, currentMonth, goToNextMonth, goToPreviousMonth, addEvent, updateEvent, deleteEvent } = useCalendar();
  
  // 모달, 선택 날짜 상태 관리
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);        // 일정 추가 모델 상태
  const [isDateDetailModalOpen, setIsDateDetailModalOpen] = useState(false);    // 날짜 상세 모달 상태
  const [isEventDetailModalOpen, setIsEventDetailModalOpen] = useState(false);  // 일정 상세 모달 상태
  const [selectedDate, setSelectedDate] = useState(null);     // 선택 된 날짜
  const [selectedEvents, setSelectedEvents] = useState([]);   // 선택 된 날짜의 일정 목록
  const [selectedEvent, setSelectedEvent] = useState(null);   // 선택된 단일 이벤트 상태

  // 날짜 클릭 시 이벤트 상세 모달 열기
  const handleDateClick = (date) => {
    const dateEvents = events.filter(event => event.date === date);
    setSelectedDate(date);
    setSelectedEvents(dateEvents);
    setIsDateDetailModalOpen(true);
  };

  // 일정 추가 모달 열기
  const handleOpenScheduleModal = () => {
    setIsDateDetailModalOpen(false); // 이벤트 상세 모달 닫기
    setIsScheduleModalOpen(true);     // 일정 추가 모달 열기
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsScheduleModalOpen(false);
    setIsDateDetailModalOpen(false);
    setIsEventDetailModalOpen(false); // 이벤트 디테일 모달 닫기
    setSelectedDate(null);
    setSelectedEvents([]);
    setSelectedEvent(null); // 선택된 이벤트 초기화
  };

  // 일정 저장
  const handleSaveSchedule = (newSchedule) => {
    addEvent(newSchedule);
    handleCloseModal();
  };

  // 일정 업데이트
  const handleUpdateEvent = (updatedEvent) => {
    updateEvent(updatedEvent);
    handleCloseModal();
  };

  // 일정 삭제
  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId);
    handleCloseModal();
  };

  return (
    <div className="Calendar">
      {/* 현재 월, 이전/다음 월 이동 */}
      <CalendarHeader 
        currentMonth={currentMonth}
        goToNextMonth={goToNextMonth}
        goToPreviousMonth={goToPreviousMonth}
      />
      
      {/* 현재 월, 이벤트 */}
      <CalendarBody 
        currentMonth={currentMonth}
        events={events}
        onDateClick={handleDateClick}
      />

      {/* 일정 디테일 모달 */}
      <DateDetailModal
        isOpen={isDateDetailModalOpen}
        onClose={handleCloseModal}
        events={selectedEvents}
        selectedDate={selectedDate}
        onAddSchedule={handleOpenScheduleModal}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
      />

      {/* 일정 추가 모달 */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveSchedule}
        selectedDate={selectedDate}
      />

      {/* 일정 수정/삭제 모달 */}
      {selectedEvent && (
        <EventDetailModal
          isOpen={isEventDetailModalOpen}
          event={selectedEvent}
          onClose={handleCloseModal}
          onUpdate={handleUpdateEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
};

export default Calendar;
