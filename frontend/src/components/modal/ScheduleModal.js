// ScheduleModal.js
import React, { useState } from 'react';
import './ScheduleModal.css';

const ScheduleModal = ({ isOpen, onClose, onSave, selectedDate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    // title이 비어있음 저장X
    if (!title.trim()) {
      alert('일정을 등록해주세요.')
      return;
    };

    onSave({ title, description, date: selectedDate });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>일정 등록하기</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div className="modal-content">
          <input 
            type="text" 
            placeholder="일정을 입력해주세요." 
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
          />
          <textarea 
            placeholder="내용을 입력해주세요." 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="modal-footer">
          <button onClick={handleSave}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
