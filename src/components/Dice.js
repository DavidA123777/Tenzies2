import React from "react";

const Dice = (props) =>{
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div onClick={props.holdDice}className="dice" style={styles}><h2 className="dice-num">{props.value}</h2></div>
    )
}
export default Dice;