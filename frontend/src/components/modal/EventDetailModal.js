import React, { useEffect, useState } from 'react';

const EventDetailModal = ({ isOpen, event, onClose, onUpdate, onDelete }) => {
  const [editedEvent, setEditedEvent] = useState(event);

  // 일정이 수정될 때마다 최신 값으로 업데이트
  useEffect(() => {
    setEditedEvent(event);
  }, [event]);

  if (!isOpen) return null;

  // 저장 버튼 클릭 시 업데이트
  const handleSave = () => {
    onUpdate(editedEvent);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>일정 수정/삭제</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-content">
          <input
            type="text"
            name="title"
            value={editedEvent.title}
            onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
          />
          <textarea
            name="description"
            value={editedEvent.description}
            onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
          />
        </div>
        <div className="modal-footer">
          <button onClick={handleSave}>수정</button>
          <button onClick={() => onDelete(event.id)}>삭제</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;
