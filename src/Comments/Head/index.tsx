import React from "react";
import {declinationComments} from "../helpers";
import Like from "../Like";
import "./index.css";

interface Props {
    amountComment: number;
    amountLike: number;
}

const Head = ({amountComment, amountLike}: Props) => {
    return (
        <div className="head">
            <div className="head__comment">
                {declinationComments(amountComment)}
            </div>
            <div className="head__like">
                <Like classIcon="head-like" quantity={amountLike} />
            </div>
        </div>
    );
};

export default React.memo(Head);
