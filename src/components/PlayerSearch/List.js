import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { uiActions } from "../../store/uiSlice";
import classes from "./List.module.css";
const List = (props) => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.player.players);
  const order = useSelector((state) => state.ui.order);
  const filter = useSelector((state) => state.ui.searchFilter);

  let orderedData;
  const compare = (a, b, type) => {
    if (a[type] < b[type]) {
      return -1;
    }
    if (a[type] < b[type]) {
      return 1;
    }
    return 0;
  };
  if (order === "byPlayer") {
    orderedData = Array.from(data);
    orderedData.sort((a, b) => compare(a, b, "name"));
  } else if (order === "byTeam") {
    orderedData = Array.from(data);
    orderedData.sort((a, b) => compare(a, b, "teamName"));
  }
  //filtered players
  const players = orderedData.filter((d) =>
    d.name.toUpperCase().startsWith(filter.toUpperCase())
  );
  const history = useHistory();

  const pages = Math.round(players.length / props.elemLimit);
  const currPage = filter===""?+props.pageNum:1;

  const nextPage = () => {
    if (currPage !== pages) {
      history.push(`/players/${currPage + 1}`);
    }
  };

  const prevPage = () => {
    if (currPage !== 1) {
      history.push(`/players/${currPage - 1}`);
    }
  };
  function gotoPage(num) {
    if (currPage !== num) {
      history.push(`/players/${num}`);
    }
  }

  const getPage = (pageNum) => {
    const startIndex = currPage * props.elemLimit - props.elemLimit;
    const endIndex = currPage * props.elemLimit;
    const pageData = players.slice(startIndex, endIndex);
    return (
      <Fragment>
        {pageData.map((p, i) => (
          <li
            key={p._id}
            onClick={() => {
              routePlayerPage(p.name);
            }}
          >
            <span style={{ cursor: "pointer" }}>{p.name}</span>
            <span>{p.teamName}</span>
          </li>
        ))}
      </Fragment>
    );
  };

  const showPageNumbers = (pages) => {
    const pageNumbers = new Array(pages).fill().map((_, i) => i + 1);
    return (
      <Fragment>
        {pageNumbers.map((num) => {
          return (
            <div
              onClick={() => {
                gotoPage(num);
              }}
              key={`page${num}`}
              className={
                num === currPage ? classes.selected : classes.notSelected
              }
            >
              {num}
            </div>
          );
        })}
      </Fragment>
    );
  };

  const routePlayerPage = (name) => {
    history.push(`/player/${name}`);
  };

  const changeOrder = (newOrder) => {
    if (order !== newOrder) {
      dispatch(uiActions.setOrder(newOrder));
    }
  };
  return (
    <div className={classes.PlayerListLayout}>
      <div className={classes.Legend}>
        <span className={classes.LegendSpanItem}>
          <span>Player Name</span>
          <div className={classes.checkContainer} onClick={() => {
                changeOrder("byPlayer");
              }}>
            <div
              className={
                order === "byPlayer" ? classes.checkDown : classes.checkUp
              }
            
            ></div>
          </div>
        </span>

        <span className={classes.LegendSpanItem}>
          <span>Team Name</span>
          <div className={classes.checkContainer} onClick={() => {
                changeOrder("byTeam");
              }}>
            <div
              className={
                order === "byTeam" ? classes.checkDown : classes.checkUp
              }
            
            ></div>
          </div>
        </span>
      </div>
      <ul className={classes.PlayerList}>{getPage(currPage)}</ul>
      <div className={classes.pages}>
        <button onClick={prevPage}>prev</button>
        {showPageNumbers(pages)}
        <button onClick={nextPage}>next</button>
      </div>
    </div>
  );
};
export default List;
