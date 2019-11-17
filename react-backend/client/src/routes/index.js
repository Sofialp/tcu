import Login from '../components/Login';
import Venue from '../components/Venue';
import withAdminPermission from '../HOC/withAdminPermission';
import Admin from '../components/Admin';
import Categories from '../components/Categories';
import AdminCategories from '../components/Admin/AdminCategories';
import AdminVenues from '../components/Admin/AdminVenues';
import AdminBooking from '../components/Admin/AdminBooking';
import AdminSchedules from '../components/Admin/AdminSchedules';
import Confirmation from '../components/Confirmation';

export default [
  {
    path: '/',
    exact: true,
    component: Categories
  },
  {
    path: '/venue/:venueId',
    exact: true,
    component: Venue
  },
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/confirmation',
    exact: true,
    component: Confirmation
  },
  // Admin routes
  {
    path: '/admin',
    exact: true,
    component: withAdminPermission(Admin)
  },
  {
    path: '/admin/categories',
    exact: true,
    component: withAdminPermission(AdminCategories)
  },
  {
    path: '/admin/venues',
    exact: true,
    component: withAdminPermission(AdminVenues)
  },
  {
    path: '/admin/schedules',
    exact: true,
    component: withAdminPermission(AdminSchedules)
  },
  {
    path: '/admin/booking',
    exact: true,
    component: withAdminPermission(AdminBooking)
  }
];
