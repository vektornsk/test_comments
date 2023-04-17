import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {Author, Comment, HashComment, Pagination, TreeComment} from "./Model";

export interface CommentState {
    treeComments: TreeComment[];
    authors: Author[];
    pagination: Pagination | null;
    amountLike: number;
    amountComment: number;
    comments: {[key: string]: Comment};
}

const initialState: CommentState = {
    treeComments: [],
    authors: [],
    pagination: null,
    amountLike: 0,
    amountComment: 0,
    comments: {},
};

export const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setComments: (
            state,
            action: PayloadAction<{
                comments: HashComment;
                treeComments: TreeComment[];
            }>,
        ) => {
            state.treeComments = action.payload.treeComments;
            state.comments = action.payload.comments;
        },
        setAuthors: (state, action: PayloadAction<Author[]>) => {
            state.authors = action.payload;
        },
        setPagination: (state, action: PayloadAction<Pagination>) => {
            state.pagination = action.payload;
        },
        setAmountLike: (state, action: PayloadAction<number>) => {
            state.amountLike = action.payload;
        },
        setAmountComment: (state, action: PayloadAction<number>) => {
            state.amountComment = action.payload;
        },
        likedToggle: (state, action: PayloadAction<any>) => {
            const likes = state.comments[action.payload].likes;
            const isLiked = state.comments[action.payload].isLiked;
            const amountLike = state.amountLike;
            state.comments[action.payload].isLiked = !isLiked;
            state.comments[action.payload].likes = isLiked
                ? likes - 1
                : likes + 1;
            state.amountLike = isLiked ? amountLike - 1 : amountLike + 1;
        },
    },
});

export const {
    setComments,
    setAuthors,
    setPagination,
    setAmountLike,
    setAmountComment,
    likedToggle,
} = commentSlice.actions;

export default commentSlice.reducer;
