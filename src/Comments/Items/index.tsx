import React from "react";
import {getTime} from "../helpers";
import Message from "../Message";
import {Comment} from "../Model";
import "./index.css";

interface Props {
    items: any[];
    data: {[key: string]: Comment};
    onClick?: (id: number) => void;
}

const Items = ({items, data, onClick}: Props) => {
    return Array.isArray(items) && items.length ? (
        <div>
            {items.map((item) => {
                return (
                    <div className="items" key={item.id}>
                        <Message
                            name={data[item.id].name}
                            time={getTime(data[item.id].created)}
                            like={data[item.id].likes}
                            text={data[item.id].text}
                            avatar={data[item.id].avatar}
                            id={data[item.id].id}
                            onClick={onClick}
                            isLiked={data[item.id].isLiked}
                        />
                        <div className="items__child">
                            <Items items={item.child} data={data} />
                        </div>
                    </div>
                );
            })}
        </div>
    ) : null;
};

export default React.memo(Items);
