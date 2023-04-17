import cn from "classnames";
import React from "react";
import "./index.css";

interface Props {
    isLiked?: boolean;
    quantity: number;
    classIcon?: string;
    onClick?: () => void;
}

const Like = ({isLiked = false, quantity, classIcon, onClick}: Props) => {
    return (
        <div className="like">
            <span
                onClick={onClick}
                className={cn("like__icon", classIcon, isLiked && "liked")}
            >
                {isLiked ? "♥" : "♡"}
            </span>
            <span className="like__count">{quantity}</span>
        </div>
    );
};

export default React.memo(Like);
