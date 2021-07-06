import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import classes from "./SearchBar.module.css";
const SearchBar = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.ui.searchFilter)
  const onChangeHandler = (ev) => {
      dispatch(uiActions.setSearchFilter(ev.target.value))
  };
  return (
    <div className={classes.container}>
      <div className={classes.fit}>
        <input
        
          type="text"
          placeholder="Search Player"
          className={classes.search}
          onChange={onChangeHandler}
          value={filter}
        />
      </div>
    </div>
  );
};
export default SearchBar;
