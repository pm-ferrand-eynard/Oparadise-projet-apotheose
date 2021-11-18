import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './TabNavBar.module.scss';
import BackButton from '../BackButton';

// Check Navlink et creation des routes sans id.

const TabNavBar = ({ navPages }) => (

  <nav className={style.TabNavBar__menu}>
    <Link to="/explore">
      <BackButton
        value="Direction la carte"
        classCss="button__back"
      />
    </Link>
    {
      navPages.map(({ linkTo, title }) => (
        <NavLink
          key={linkTo}
          className={style.TabNavBar__menu__link}
          activeClassName={style.TabNavBar__menu__link__active}
          to={linkTo}
        >
          {title}
        </NavLink>
      ))
    }
  </nav>
);

TabNavBar.propTypes = {
  navPages: PropTypes.arrayOf(
    PropTypes.shape({
      linkTo: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TabNavBar;
