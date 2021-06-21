import React from "react";
import Clickable from "./Clickable";
import { Button } from "@material-ui/core";

function FarmButton(props) {
  return (
    <Button
      size="medium"
      style={{ textTransform: "none", display: "block", marginBottom: "10px" }}
      variant="outlined"
      onClick={() =>
        props.purchaseItem(props.increment, props.cost, props.value, props.time)
      }
    >
      {props.name}
      <p>{props.description}</p>
      <p>
        You have: {props.currentC} {props.name}
      </p>
    </Button>
  );
}

export default FarmButton;
