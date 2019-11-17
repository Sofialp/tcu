var moment = require('moment');

const getScheduleOfVenue = async (request, response, connection) => {
  const { venueId, dayOfWeekId } = request.body;
  if (venueId && dayOfWeekId) {
    const scheduleAvaible = await findSchedule(
      venueId,
      dayOfWeekId,
      connection
    );
    if (scheduleAvaible) {
      const { id } = scheduleAvaible;
      const hourGroups = await findHourGroups(id, connection);
      response.json({ hourGroups: hourGroups });
    } else {
      response.send('No schedule available');
    }
  } else {
    response.send('No id provided');
  }
};

const findSchedule = async (venueId, dayOfWeekId, connection) => {
  const scheduleAvailable = await new Promise(async function(resolve, reject) {
    connection.query(
      `SELECT * FROM booking.scheduleAvailable WHERE booking.scheduleAvailable.venue=${venueId} AND booking.scheduleAvailable.dayOfWeek=${dayOfWeekId}`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return scheduleAvailable[0];
};

const findHourGroups = async (venueScheduleId, connection) => {
  const hourGroups = await new Promise(async function(resolve, reject) {
    connection.query(
      `SELECT * FROM booking.hoursGroup WHERE booking.hoursGroup.venueSchedule=${venueScheduleId}`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return hourGroups;
};

const getBookingsOfVenue = async (request, response, connection) => {
  const { venueId, date } = request.body;
  if (venueId && date) {
    const booking = await findBookingOfSchedule(venueId, date, connection);
    response.json({ bookings: booking });
  } else {
    response.send('No id provided');
  }
};

const findBookingOfSchedule = async (venueId, date, connection) => {
  const booking = await new Promise(async function(resolve, reject) {
    connection.query(
      `SELECT booking.scheduleBooked.id, booking.scheduleBooked.startHour, booking.scheduleBooked.quantityHours FROM booking.scheduleBooked WHERE booking.scheduleBooked.venue = ${venueId} AND booking.scheduleBooked.date = '${date}'`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return booking;
};

const getVenuesPerCategories = async (request, response, connection) => {
  const categories = await getCategoriesOfAccount(connection);
  const formattedCategories = categories.map(async category => {
    const venues = await getVenuesOfCategory(connection, category);
    return {
      ...category,
      venues
    };
  });
  const results = await Promise.all(formattedCategories);
  response.json({ categories: results });
};

const getVenuesOfCategory = async (connection, category) => {
  const venues = await new Promise(async function(resolve, reject) {
    connection.query(
      `SELECT * FROM booking.venue WHERE booking.venue.category=${category.id} AND booking.venue.deleted=0 AND booking.venue.account=1`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return venues;
};

const getCategoriesOfAccount = async connection => {
  const categories = await new Promise(async function(resolve, reject) {
    connection.query(
      'SELECT * FROM booking.category WHERE booking.category.deleted=0',
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return categories;
};

const getVenueDetails = async (request, response, connection) => {
  const { venueId } = request.params;
  if (venueId) {
    const venue = await new Promise(async function(resolve, reject) {
      connection.query(
        `SELECT * FROM booking.venue WHERE booking.venue.id=${venueId} AND booking.venue.deleted=0`,
        function(error, data) {
          if (error) {
            reject(error);
          }
          resolve(JSON.parse(JSON.stringify(data)));
        }
      );
    });
    response.json({ venue: venue[0] });
  } else {
    reject('No id provided');
  }
};

const getVenues = async (request, response, connection) => {
  const venues = await getAllVenuesWithCateory(connection);
  response.json({ venues: venues });
};

const getAllVenuesWithCateory = async connection => {
  const venues = await new Promise(async function(resolve, reject) {
    connection.query(
      `SELECT booking.venue.id, booking.venue.address, booking.venue.name, booking.venue.description, booking.venue.pricePerHourDay, booking.venue.pricePerHourNight, booking.venue.category FROM booking.venue WHERE booking.venue.deleted = 0`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return venues;
};

const saveModifyVenue = async (request, response, connection) => {
  const { venue } = request.body;
  await updateVenue(venue, connection);
  response.json({ status: 'ok' });
};

const updateVenue = async (venue, connection) => {
  const savedVenue = await new Promise(async function(resolve, reject) {
    connection.query(
      `UPDATE booking.venue SET name = '${venue.name}', description = '${venue.description}', address = '${venue.address}', pricePerHourDay = '${venue.pricePerHourDay}', pricePerHourNight = '${venue.pricePerHourNight}', category = '${venue.category}' WHERE id = '${venue.id}'`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return savedVenue;
};

const deleteVenue = async (request, response, connection) => {
  const { venueId } = request.query;
  await deleteOneVenue(venueId, connection);
  response.json({ status: 'ok' });
};

const deleteOneVenue = async (venueId, connection) => {
  const deletedVenue = await new Promise(async function(resolve, reject) {
    connection.query(
      `UPDATE booking.venue SET deleted = 1 WHERE id = '${venueId}'`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return deletedVenue;
};

const addVenue = async (request, response, connection) => {
  const { venue } = request.body;
  await saveVenue(venue, connection);
  response.json({ status: 'ok' });
};

const saveVenue = async (venue, connection) => {
  const date = moment().format('YYYY-MM-DD h:mm:ss');
  const savedVenue = await new Promise(async function(resolve, reject) {
    connection.query(
      `INSERT INTO booking.venue (createdDate, category, address, name, description, account, pricePerHourDay, pricePerHourNight, deleted) VALUES ('${date}', '${venue.category}', '${venue.address}', '${venue.name}', '${venue.description}', '1', '${venue.pricePerHourDay}', '${venue.pricePerHourNight}', '0')`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return savedVenue;
};

const getAllVenues = async (request, response, connection) => {
  const venues = await requestVenues(connection);
  response.json({ venues: venues });
};

const requestVenues = async connection => {
  const venues = await new Promise(async function(resolve, reject) {
    connection.query(
      `SELECT booking.venue.id, booking.venue.name FROM booking.venue`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return venues;
};

module.exports = {
  getVenuesPerCategories,
  getVenueDetails,
  getScheduleOfVenue,
  getCategoriesOfAccount,
  getVenues,
  saveModifyVenue,
  deleteVenue,
  addVenue,
  getAllVenues,
  getBookingsOfVenue
};
