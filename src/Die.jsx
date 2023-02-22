import React from "react";
import "./App.css"
export default function Die(props) {
    const style=props.isHeld?{backgroundColor: "#59E391"}:{
        backgroundColor: "#fff"
    }
    return (
        <div className="die-styling" style={style} onClick={props.holdDice}>
            <h1>{props.value}</h1>
        </div>
    )
}