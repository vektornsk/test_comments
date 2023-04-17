import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import * as actions from "./actions";
import Items from "./Items";
import Head from "./Head";
import {likedToggle} from "./commentSlice";
import "./index.css";

const Comments = () => {
    const data = useSelector((state: RootState) => state.comments);
    const {treeComments, comments, pagination, amountLike, amountComment} =
        data;
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        actions.loading(1);
    }, [dispatch]);

    const loadMore = () => {
        setCurrentPage(currentPage + 1);
        actions.loadComments(currentPage + 1);
    };

    const onLike = (id: number) => {
        dispatch(likedToggle(id));
    };

    return (
        <div className="comments">
            <Head amountComment={amountComment} amountLike={amountLike} />
            <Items items={treeComments} data={comments} onClick={onLike} />

            {pagination?.total_pages && pagination.total_pages > currentPage && (
                <div className="comments__buttons">
                    <button className="btn" onClick={loadMore}>
                        Загрузить еще
                    </button>
                </div>
            )}
        </div>
    );
};

export default React.memo(Comments);
