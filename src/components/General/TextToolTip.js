import { Fragment} from "react";
import classes from "./TextToolTip.module.css";
import ReactTooltip from "react-tooltip";
const TextToolTip = (props) => {
  return (
    <Fragment>
      <span data-tip data-for={props.id} className={classes.content}>
        {props.text}
      </span>
      <ReactTooltip
        className={classes.tooltip}
        backgroundColor="white"
        textColor="black"
        border={true}
        borderColor="black"
        id={props.id}
        place="top"
        effect="float"
      >
        {props.tipText}
      </ReactTooltip>
    </Fragment>
  );
};
export default TextToolTip;
