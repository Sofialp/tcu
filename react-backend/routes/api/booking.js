const getBookings = async (request, response, connection) => {
  const bookings = await getAllBookings(connection);
  response.json({ bookings: bookings });
};

const getAllBookings = async connection => {
  const bookings = await new Promise(async function(resolve, reject) {
    connection.query(
      `SELECT booking.booking.id, booking.booking.venue, booking.booking.clientName, booking.booking.clientLastName, booking.booking.clientEmail, booking.booking.clientIdentification, booking.booking.address, booking.booking.scheduleBooked, booking.scheduleBooked.startHour, booking.scheduleBooked.quantityHours, booking.scheduleBooked.date FROM booking.booking INNER JOIN booking.scheduleBooked ON booking.booking.scheduleBooked = booking.scheduleBooked.id WHERE booking.booking.deleted = 0`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return bookings;
};

const addBooking = async (request, response, connection) => {
  const { booking } = request.body;
  const scheduleBooked = {
    startHour: booking.startHour,
    quantityHours: booking.quantityHours,
    venue: booking.venue,
    date: booking.date
  };
  const savedResponse = await saveScheduleBooked(scheduleBooked, connection);
  const newBooking = {
    venue: booking.venue,
    scheduleBooked: savedResponse.insertId,
    clientName: booking.clientName,
    clientLastName: booking.clientLastName,
    clientEmail: booking.clientEmail,
    clientIdentification: booking.clientIdentification,
    address: booking.address,
    orderId: booking.orderId || ''
  };
  const savedBooking = await saveBooking(newBooking, connection);
  response.json({ status: 'ok', bookingId: savedBooking.insertId });
};

const saveScheduleBooked = async (scheduleBooked, connection) => {
  const savedSchedule = await new Promise(async function(resolve, reject) {
    connection.query(
      `INSERT INTO booking.scheduleBooked (startHour, quantityHours, venue, date) VALUES ('${scheduleBooked.startHour}', '${scheduleBooked.quantityHours}', '${scheduleBooked.venue}', '${scheduleBooked.date}')`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return savedSchedule;
};

const saveBooking = async (booking, connection) => {
  const savedBooking = await new Promise(async function(resolve, reject) {
    connection.query(
      `INSERT INTO booking.booking (venue, scheduleBooked, clientName, clientLastName, clientEmail, clientIdentification, address, orderId, deleted) VALUES ('${booking.venue}', '${booking.scheduleBooked}', '${booking.clientName}', '${booking.clientLastName}', '${booking.clientEmail}', '${booking.clientIdentification}', '${booking.address}', '${booking.orderId}', '0')`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return savedBooking;
};

const saveModifyBooking = async (request, response, connection) => {
  const { booking } = request.body;
  const scheduleBooked = {
    startHour: booking.startHour,
    quantityHours: booking.quantityHours,
    venue: booking.venue,
    date: booking.date,
    id: booking.scheduleBooked
  };
  await updateScheduleBooked(scheduleBooked, connection);
  const updatedBooking = {
    venue: booking.venue,
    clientName: booking.clientName,
    clientLastName: booking.clientLastName,
    clientEmail: booking.clientEmail,
    clientIdentification: booking.clientIdentification,
    address: booking.address,
    id: booking.id
  };
  await updateBooking(updatedBooking, connection);
  response.json({ status: 'ok' });
};

const updateScheduleBooked = async (scheduleBooked, connection) => {
  const savedBooking = await new Promise(async function(resolve, reject) {
    connection.query(
      `UPDATE booking.scheduleBooked SET startHour = '${scheduleBooked.startHour}', quantityHours = '${scheduleBooked.quantityHours}', venue = '${scheduleBooked.venue}', date = '${scheduleBooked.date}' WHERE id = '${scheduleBooked.id}'`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return savedBooking;
};

const updateBooking = async (booking, connection) => {
  const savedBooking = await new Promise(async function(resolve, reject) {
    connection.query(
      `UPDATE booking.booking SET venue = '${booking.venue}', clientName = '${booking.clientName}', clientLastName = '${booking.clientLastName}', clientEmail = '${booking.clientEmail}', clientIdentification = '${booking.clientIdentification}', address = '${booking.address}' WHERE id = '${booking.id}'`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return savedBooking;
};

const deleteBooking = async (request, response, connection) => {
  const { id } = request.query;
  await deleteOneBooking(id, connection);
  response.json({ status: 'ok' });
};

const deleteOneBooking = async (bookingId, connection) => {
  const deletedBooking = await new Promise(async function(resolve, reject) {
    connection.query(
      `UPDATE booking.booking SET deleted = 1 WHERE id = '${bookingId}'`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return deletedBooking;
};

module.exports = {
  getBookings,
  addBooking,
  saveModifyBooking,
  deleteBooking
};
