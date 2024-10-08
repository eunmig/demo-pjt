import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

// 모든 일정 가져오기
export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/events/`);
    return response.data;
  } catch (error) {
    console.log("일정 가져오기 실패", error);
  }
};

// 일정 생성
export const createEvent = async (newSchedule) => {
  try {
    const response = await axios.post(`${BASE_URL}/events/`, newSchedule);
    return response.data;
  } catch (error) {
    console.log("일정 생성 실패", error);
  }
};

// 일정 업데이트
export const updateEvent = async (eventId, updateData) => {
  try {
    const response = await axios.put(`${BASE_URL}/events/${eventId}/`, updateData);
    return response.data;
  } catch (error) {
    console.log("일정 업데이트 실패", error);
  }
};

// 일정 삭제
export const deleteEvent = async (eventId) => {
  try {
      await axios.delete(`${BASE_URL}/events/${eventId}/`);
  } catch (error) {
      console.error("일정 삭제 실패", error);
  }
};