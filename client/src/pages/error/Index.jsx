import { Link } from 'react-router-dom';
import errorpage from '../../assets/404.jpg';
import './error.css';  // Create this CSS file

const NotFoundPage = () => {
  return (
    <div className='container'>
      <div className='appPage text-center'>
        <img className='errImage' src={errorpage} alt="Page not found" />
        <p style={{ textAlign: "center" }}>
          <Link to="/">Go to Home </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
