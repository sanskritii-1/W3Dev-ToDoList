import React, { useState } from "react";

export default function item(props) {
  return (
    <li id="ongoing">
      <div>
        <input type="checkbox" id={props.id} onClick={() => {
          props.onClicked(props.id);
        }} />

        <label htmlFor={props.id} className={props.isDeleted && "strike"}>{props.item}</label>
      </div>
    </li>
  );
}
