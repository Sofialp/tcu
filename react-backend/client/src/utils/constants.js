export default {
  BACKEND_URL: 'http://localhost:3001',
  BACKGROUND_COLOR: '#FAFAFA',
  PRIMARY_COLOR: '#003B4C',
  SECONDARY_COLOR: '#575756',
  HIGHLIGHT_COLOR: '#FFDA21',
  ERROR_COLOR: '#E7417A',
  MAX_QUANTITY_HOURS: 2,
  MAX_QUANTITY_DAYS: 30,
  SMTP_TOKEN: 'a275ca1d-bb55-46de-bc8f-a711ef87da18',
  ADMIN_TABLES_HEADERS: {
    CATEGORIES: [
      { title: 'ID', field: 'id', editable: 'never' },
      { title: 'Categoría', field: 'name' },
      { title: 'Descripción', field: 'description' }
    ],
    VENUES: [
      { title: 'ID', field: 'id', editable: 'never' },
      { title: 'Nombre', field: 'name' },
      { title: 'Descripción', field: 'description' },
      { title: 'Dirección', field: 'address' },
      { title: 'Precio de día', field: 'pricePerHourDay' },
      { title: 'Precio de noche', field: 'pricePerHourNight' },
      { title: 'Categoría', field: 'category' }
    ],
    SCHEDULES: [
      { title: 'ID', field: 'id', editable: 'never' },
      { title: 'Hora de inicio', field: 'startHour' },
      { title: 'Hora de fin', field: 'endHour' },
      { title: 'Día de la semana', field: 'dayOfWeek' },
      { title: 'Cancha', field: 'venue' }
    ],
    BOOKINGS: [
      { title: 'Cancha', field: 'venue' },
      { title: 'Nombre', field: 'clientName' },
      { title: 'Apellido', field: 'clientLastName' },
      { title: 'Email', field: 'clientEmail' },
      { title: 'Identificación', field: 'clientIdentification' },
      { title: 'Dirección', field: 'address' },
      { title: 'Fecha', field: 'date' },
      { title: 'Hora de inicio', field: 'startHour' },
      { title: 'Cantidad de horas', field: 'quantityHours' }
    ]
  }
};
