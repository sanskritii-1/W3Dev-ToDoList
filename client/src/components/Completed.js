import React, { useEffect, useState } from "react";

export default function Completed(props){
    console.log("in comp: ", props.done);

    return (
        <div className="container">
            <div className="heading">
                <h1>Completed Tasks</h1>
            </div>
            
            <ul>
                {props.done.map((item)=>{
                    return <li id="done" key={item._id}>{item.item}</li>
                })}
            </ul>
        </div>
    )
}