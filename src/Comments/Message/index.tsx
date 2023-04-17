import React from "react";
import Like from "../Like";
import "./index.css";

interface Props {
    name: string;
    time: string;
    text: string;
    like: number;
    avatar: string;
    isLiked?: boolean;
    id: number;
    onClick?: (id: number) => void;
}

const Message = ({
    name,
    time,
    text,
    like,
    avatar,
    isLiked = false,
    id,
    onClick,
}: Props) => {
    const click = () => {
        onClick && onClick(id);
    };
    return (
        <div className="message">
            <div className="message__avatar">
                <div
                    className="avatar"
                    style={{backgroundImage: `url(${avatar})`}}
                />
            </div>
            <div className="message__content">
                <div className="message__head">
                    <div className="message__info">
                        <div className="message__name">{name}</div>
                        <div className="message__time">{time}</div>
                    </div>
                    <div className="message__like">
                        <Like
                            quantity={like}
                            classIcon="message-like"
                            isLiked={isLiked}
                            onClick={click}
                        />
                    </div>
                </div>
                <div className="message__text">{text}</div>
            </div>
        </div>
    );
};

export default React.memo(Message);
