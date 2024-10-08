// DateDetailModal.js
import React, { useState } from 'react';
import EventDetailModal from './EventDetailModal';


const DateDetailModal = ({ isOpen, onClose, events, selectedDate, onAddSchedule, onUpdateEvent, onDeleteEvent }) => {
  const [isEventDetailModalOpen, setIsEventDetailModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (!isOpen) return null;

  // 일정 클릭 시 세부 정보 모달 열기
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEventDetailModalOpen(true);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{selectedDate} 일정</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-content">
          {events.length === 0 ? (
            <p>일정이 없습니다.</p>
          ) : (
            events.map(event => (
              <div 
                key={event.id}
                className="event-detail"
                onClick={() => handleEventClick(event)}
              >
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            ))
          )}
        </div>
        <div className="modal-footer">
          <button onClick={onAddSchedule}>+ 일정 추가</button>
        </div>
      </div>

      {/* 일정 디테일 모달 */}
      {selectedEvent && (
        <EventDetailModal
          isOpen={isEventDetailModalOpen}
          onClose={() => setIsEventDetailModalOpen(false)}
          event={selectedEvent}
          onUpdate={onUpdateEvent}
          onDelete={onDeleteEvent}
        />
      )}
    </div>
  );
};

export default DateDetailModal;