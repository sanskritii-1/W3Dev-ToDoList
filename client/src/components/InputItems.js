import React from "react";

export default function InputItems(props){
    return (
        <div className="form">
            <input onChange={props.handleChange} type="text" value={props.inputText} />
            <button onClick={props.addItem}>
            <span>Add</span>
            </button>
        </div>
    )
}