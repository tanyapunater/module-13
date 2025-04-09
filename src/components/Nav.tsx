import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li className="nav-item"><Link to="/">Search</Link></li>
        <li className="nav-item"><Link to="/saved">Saved</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;