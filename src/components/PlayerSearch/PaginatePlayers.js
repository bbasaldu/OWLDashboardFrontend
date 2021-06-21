import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import classes from "./PaginatePlayers.module.css";
const PaginatePlayers = (props) => {
  const players = useSelector((state) => state.player.players);
  //console.log(players)
  //5 is element limit per page
  const pages = Math.round(players.length / props.elemLimit);
  //console.log(pages)
  //const [pages] = useState(Math.round(players.length/10))
  const [currPage, setCurrPage] = useState(1);

  const nextPage = () => {
    if (currPage !== pages) {
      setCurrPage((lastPage) => lastPage + 1);
    }
  };

  const prevPage = () => {
    if (currPage !== 1) {
      setCurrPage((lastPage) => lastPage - 1);
    }
  };

  const gotoPage = (num) => {
      if(currPage !== num){
          setCurrPage(num)
      }
  };

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
                onClick={() => {gotoPage(num)}}
              key={`page${num}`}
              className={
                  (num === currPage)?classes.selected:classes.notSelected
              }
            >
              {num}
            </div>
          );
        })}
      </Fragment>
    );
  };

  const match = useRouteMatch();
  const history = useHistory();
  const routePlayerPage = (name) => {
    history.push(`${match.path}/${name}`);
  };
  return (
    <div className={classes.PlayerListLayout}>
      <div className={classes.Legend}>
        <span>Player Name</span>
        <span>Team Name</span>
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
export default PaginatePlayers;
