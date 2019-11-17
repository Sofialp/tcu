import axios from 'axios';
import contants from '../utils/constants';
const { BACKEND_URL } = contants;

export const getVenuesPerCategory = () => {
  return axios
    .get(`${BACKEND_URL}/venues`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const getVenueDetails = venueId => {
  return axios
    .get(`${BACKEND_URL}/venue/${venueId}`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const getSchedule = (venueId, dayOfWeekId) => {
  return axios
    .post(`${BACKEND_URL}/schedule`, { venueId, dayOfWeekId })
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const getUserByEmail = (email, password) => {
  return axios
    .post(`${BACKEND_URL}/login`, { email, password })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

export const getTermsAndConditions = () => {
  return axios
    .get(`${BACKEND_URL}/terms`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const getCategories = () => {
  return axios
    .get(`${BACKEND_URL}/categories`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const updateCategory = category => {
  return axios
    .patch(`${BACKEND_URL}/category`, { category })
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const saveCategory = category => {
  return axios
    .post(`${BACKEND_URL}/category`, { category })
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const deleteCategory = categoryId => {
  return axios
    .delete(`${BACKEND_URL}/category`, { params: { categoryId } })
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const getVenues = () => {
  return axios
    .get(`${BACKEND_URL}/admin/venues`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const updateVenue = venue => {
  return axios
    .patch(`${BACKEND_URL}/admin/venue`, { venue })
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const deleteVenue = venueId => {
  return axios
    .delete(`${BACKEND_URL}/admin/venue`, { params: { venueId } })
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const saveVenue = venue => {
  return axios
    .post(`${BACKEND_URL}/admin/venue`, { venue })
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const getDaysOfWeek = () => {
  return axios
    .get(`${BACKEND_URL}/admin/daysOfWeek`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const getSchedules = () => {
  return axios
    .get(`${BACKEND_URL}/admin/schedules`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const saveSchedule = schedule => {
  return axios
    .post(`${BACKEND_URL}/admin/schedule`, { schedule })
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const updateSchedule = schedule => {
  return axios
    .patch(`${BACKEND_URL}/admin/schedule`, { schedule })
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const deleteSchedule = (scheduleId, hoursId) => {
  return axios
    .delete(`${BACKEND_URL}/admin/schedule`, {
      params: { scheduleId, hoursId }
    })
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const getBookings = () => {
  return axios
    .get(`${BACKEND_URL}/admin/bookings`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const getAllVenues = () => {
  return axios
    .get(`${BACKEND_URL}/admin/allvenues`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const saveBooking = booking => {
  return axios
    .post(`${BACKEND_URL}/admin/booking`, { booking })
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const updateBooking = booking => {
  return axios
    .patch(`${BACKEND_URL}/admin/booking`, { booking })
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const deleteBooking = id => {
  return axios
    .delete(`${BACKEND_URL}/admin/booking`, { params: { id } })
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const getAccount = () => {
  return axios
    .get(`${BACKEND_URL}/account`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const updateAccountDetails = account => {
  return axios
    .patch(`${BACKEND_URL}/admin/account`, { account })
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const getBookingOfVenue = (venueId, date) => {
  return axios
    .post(`${BACKEND_URL}/bookings`, { venueId, date })
    .then(response => response.data)
    .catch(error => console.log(error));
};
