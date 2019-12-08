var express = require('express');
const applyCors = require('./cors');
const {
  getVenuesPerCategories,
  getVenueDetails,
  getScheduleOfVenue,
  getVenues,
  saveModifyVenue,
  deleteVenue,
  addVenue,
  getAllVenues,
  getBookingsOfVenue
} = require('./api/venues');

const { getAccountDetails, saveModifyAccount } = require('./api/account');
const { getUserByCredentials, updateNewPassword } = require('./api/user');
const {
  getCategories,
  saveModifyCategory,
  addCategory,
  deleteCategory
} = require('./api/categories');

const {
  getDaysOfWeek,
  getSchedulesOfVenues,
  addSchedule,
  saveModifySchedule,
  deleteSchedule
} = require('./api/schedules');

const {
  getBookings,
  addBooking,
  saveModifyBooking,
  deleteBooking
} = require('./api/booking');

module.exports = function(app, connection) {
  // Apply middlewares
  app.use(applyCors);

  /* GET venues. */
  app.get('/venues', function(req, res) {
    getVenuesPerCategories(req, res, connection);
  });
  /* GET users */
  app.post('/login', function(req, res) {
    getUserByCredentials(req, res, connection);
  });
  /* GET venue details */
  app.get('/venue/:venueId', function(req, res) {
    getVenueDetails(req, res, connection);
  });
  /* GET schedule details */
  app.post('/schedule', function(req, res) {
    getScheduleOfVenue(req, res, connection);
  });
  /* GET terms. */
  app.get('/terms', function(req, res) {
    getAccountDetails(req, res, connection);
  });
  /* GET categories. */
  app.get('/categories', function(req, res) {
    getCategories(req, res, connection);
  });

  /* Update categories. */
  app.patch('/category', function(req, res) {
    saveModifyCategory(req, res, connection);
  });

  /* Save new category. */
  app.post('/category', function(req, res) {
    addCategory(req, res, connection);
  });

  /* Delete category. */
  app.delete('/category', function(req, res) {
    deleteCategory(req, res, connection);
  });

  /* GET all venues. */
  app.get('/admin/venues', function(req, res) {
    getVenues(req, res, connection);
  });

  /* Update venue. */
  app.patch('/admin/venue', function(req, res) {
    saveModifyVenue(req, res, connection);
  });

  /* Delete venue. */
  app.delete('/admin/venue', function(req, res) {
    deleteVenue(req, res, connection);
  });

  /* Save new venue. */
  app.post('/admin/venue', function(req, res) {
    addVenue(req, res, connection);
  });

  /* Get all days of week. */
  app.get('/admin/daysOfWeek', function(req, res) {
    getDaysOfWeek(req, res, connection);
  });

  /* Get all schedules. */
  app.get('/admin/schedules', function(req, res) {
    getSchedulesOfVenues(req, res, connection);
  });

  /* Save new schedule. */
  app.post('/admin/schedule', function(req, res) {
    addSchedule(req, res, connection);
  });

  /* Update schedule. */
  app.patch('/admin/schedule', function(req, res) {
    saveModifySchedule(req, res, connection);
  });

  /* Delete venue. */
  app.delete('/admin/schedule', function(req, res) {
    deleteSchedule(req, res, connection);
  });

  /* Get all bookings. */
  app.get('/admin/bookings', function(req, res) {
    getBookings(req, res, connection);
  });

  /* Get all venues. */
  app.get('/admin/allvenues', function(req, res) {
    getAllVenues(req, res, connection);
  });

  /* Save new booking. */
  app.post('/admin/booking', function(req, res) {
    addBooking(req, res, connection);
  });

  /* Update booking. */
  app.patch('/admin/booking', function(req, res) {
    saveModifyBooking(req, res, connection);
  });

  /* Delete booking. */
  app.delete('/admin/booking', function(req, res) {
    deleteBooking(req, res, connection);
  });

  /* GET account. */
  app.get('/account', function(req, res) {
    getAccountDetails(req, res, connection);
  });

  /* Update booking. */
  app.patch('/admin/account', function(req, res) {
    saveModifyAccount(req, res, connection);
  });

  /* GET bookings of venue. */
  app.post('/bookings', function(req, res) {
    getBookingsOfVenue(req, res, connection);
  });

  /* Update password. */
  app.patch('/admin/password', function(req, res) {
    updateNewPassword(req, res, connection);
  });
};
