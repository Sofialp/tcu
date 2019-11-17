export default function withAdminPermission(Component) {
  class AdminPermission extends Component {
    componentDidMount() {
      const user = localStorage.getItem('user');
      if (!user) {
        this.props.history.push(`/login`);
      }
    }
  }
  return AdminPermission;
}
