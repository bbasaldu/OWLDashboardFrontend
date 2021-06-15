import { Fragment, useEffect, useRef, useState } from "react";
import classes from "./Collapsible.module.css";
import * as d3 from "d3";

const Collapsible = (props) => {
  const [isShowing, setIsShowing] = useState(false);
  const contentRef = useRef()
  const showContent = () => {
    setIsShowing((lastState) => !lastState);
  };

  useEffect(() => {
    if(isShowing){
      contentRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [isShowing])
  

  return (
    <div className={classes.main}>
      <div className={classes.header} onClick={showContent}>
        <div className={classes.left}>{props.header}</div>
        <div className={isShowing?classes.checkUp:classes.checkDown}></div>
      </div>
      {isShowing && <div ref={contentRef} className={classes.content}>{props.children}</div>}
    </div>
  );
};
export default Collapsible;
