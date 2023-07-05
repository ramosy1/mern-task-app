import React from "react";
import { FaEdit, FaWindowClose } from "react-icons/fa";

const Item = ({text, remove, update}) => {
    return (
        <div className="item">
            <div className="text">{text}</div>
                <div className="icons">
                    <FaEdit onClick={update}></FaEdit>
                    <FaWindowClose onClick={remove}></FaWindowClose>
                </div>
        </div>
        )
    }

export default Item;

