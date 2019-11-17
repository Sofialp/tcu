const getDaysOfWeek = async (request, response, connection) => {
  const days = await getAllDaysOfWeek(connection);
  response.json({ days: days });
};

const getAllDaysOfWeek = async connection => {
  const days = await new Promise(async function(resolve, reject) {
    connection.query(`SELECT * FROM booking.dayOfWeek`, function(error, data) {
      if (error) {
        reject(error);
      }
      resolve(JSON.parse(JSON.stringify(data)));
    });
  });
  return days;
};

const getSchedulesOfVenues = async (request, response, connection) => {
  const schedules = await getAllSchedules(connection);
  response.json({ schedules: schedules });
};

const getAllSchedules = async connection => {
  const schedules = await new Promise(async function(resolve, reject) {
    connection.query(
      `SELECT booking.hoursGroup.id, booking.hoursGroup.startHour, booking.hoursGroup.endHour, booking.hoursGroup.venueSchedule, booking.scheduleAvailable.dayOfWeek, booking.scheduleAvailable.venue FROM booking.hoursGroup INNER JOIN booking.scheduleAvailable ON booking.hoursGroup.venueSchedule = booking.scheduleAvailable.id WHERE booking.scheduleAvailable.venue IN (SELECT booking.venue.id FROM booking.venue WHERE booking.venue.deleted = 0)`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return schedules;
};

const addSchedule = async (request, response, connection) => {
  const { schedule } = request.body;
  const scheduleAvailable = {
    venue: schedule.venue,
    dayOfWeek: schedule.dayOfWeek
  };
  const savedResponse = await saveScheduleAvailable(
    scheduleAvailable,
    connection
  );
  const hoursGroup = {
    startHour: schedule.startHour,
    endHour: schedule.endHour,
    venueSchedule: savedResponse.insertId
  };
  await saveHoursGroup(hoursGroup, connection);
  response.json({ status: 'ok' });
};

const saveScheduleAvailable = async (scheduleAvailable, connection) => {
  const savedSchedule = await new Promise(async function(resolve, reject) {
    connection.query(
      `INSERT INTO booking.scheduleAvailable (dayOfWeek, venue) VALUES ('${scheduleAvailable.dayOfWeek}', '${scheduleAvailable.venue}')`,
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

const saveHoursGroup = async (hoursGroup, connection) => {
  const savedHoursGroup = await new Promise(async function(resolve, reject) {
    connection.query(
      `INSERT INTO booking.hoursGroup (startHour, endHour, venueSchedule) VALUES ('${hoursGroup.startHour}', '${hoursGroup.endHour}', '${hoursGroup.venueSchedule}')`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return savedHoursGroup;
};

const saveModifySchedule = async (request, response, connection) => {
  const { schedule } = request.body;
  const scheduleAvailable = {
    venue: schedule.venue,
    dayOfWeek: schedule.dayOfWeek,
    id: schedule.venueSchedule
  };
  await updateSchedule(scheduleAvailable, connection);
  const hoursGroup = {
    startHour: schedule.startHour,
    endHour: schedule.endHour,
    id: schedule.id
  };
  await updateHoursGroup(hoursGroup, connection);
  response.json({ status: 'ok' });
};

const updateSchedule = async (schedule, connection) => {
  const savedSchedule = await new Promise(async function(resolve, reject) {
    connection.query(
      `UPDATE booking.scheduleAvailable SET dayOfWeek = '${schedule.dayOfWeek}', venue = '${schedule.venue}' WHERE id = '${schedule.id}'`,
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

const updateHoursGroup = async (hoursGroup, connection) => {
  const savedHours = await new Promise(async function(resolve, reject) {
    connection.query(
      `UPDATE booking.hoursGroup SET startHour = '${hoursGroup.startHour}', endHour = '${hoursGroup.endHour}' WHERE id = '${hoursGroup.id}'`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return savedHours;
};

const deleteSchedule = async (request, response, connection) => {
  const { scheduleId, hoursId } = request.query;
  await deleteHoursGroup(hoursId, connection);
  await deleteAvailableSchedule(scheduleId, connection);
  response.json({ status: 'ok' });
};

const deleteHoursGroup = async (hoursGroupId, connection) => {
  const deletedHours = await new Promise(async function(resolve, reject) {
    connection.query(
      `DELETE FROM booking.hoursGroup WHERE id = '${hoursGroupId}'`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return deletedHours;
};

const deleteAvailableSchedule = async (scheduleId, connection) => {
  const deletedSchedule = await new Promise(async function(resolve, reject) {
    connection.query(
      `DELETE FROM booking.scheduleAvailable WHERE id = '${scheduleId}'`,
      function(error, data) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(JSON.stringify(data)));
      }
    );
  });
  return deletedSchedule;
};

module.exports = {
  getDaysOfWeek,
  getSchedulesOfVenues,
  addSchedule,
  saveModifySchedule,
  deleteSchedule
};
