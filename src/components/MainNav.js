import { NavLink } from "react-router-dom";
import classes from "./MainNav.module.css";
const MainNav = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/about" activeClassName={classes.active} >
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/players" activeClassName={classes.active}>
              Players
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainNav;
