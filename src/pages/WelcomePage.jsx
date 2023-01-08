import { useLocation, useNavigate } from 'react-router-dom';
import Welcome from '../components/welcome/Welcome';

export default function WelcomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { enrolledName } = location.state;

  const navigateLink = (path) => {
    navigate(path, {
      state: {
        previousPath: '/',
      },
    });
  };

  return (
    <Welcome
      name={enrolledName}
      navigate={navigateLink}
    />
  );
}
