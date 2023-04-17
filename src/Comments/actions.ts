import {addAuthor, generation, sumLikes} from "./helpers";
import {
    setComments,
    setAuthors,
    setPagination,
    setAmountComment,
    setAmountLike,
} from "./commentSlice";
import {store} from "src/store";
import {getAuthor, getComments} from "./services";

export async function loading(page: number) {
    try {
        const state = store.getState();
        const {amountComment, amountLike} = state.comments;
        const authors = await getAuthor();
        const originComments = await getComments(page);
        const cloneComments = structuredClone(originComments);

        const commentsWithAuthor = addAuthor(cloneComments.data, authors);
        const {comments, treeComments} = generation(commentsWithAuthor);

        store.dispatch(setComments({comments, treeComments}));
        store.dispatch(setAuthors(authors));
        store.dispatch(setPagination(cloneComments.pagination));
        store.dispatch(
            setAmountComment(amountComment + cloneComments.data.length),
        );
        store.dispatch(
            setAmountLike(amountLike + sumLikes(cloneComments.data)),
        );
    } catch (e) {
        console.log(e);
    }
}

export async function loadComments(page: number) {
    try {
        const state = store.getState();
        const {comments, treeComments, authors, amountComment, amountLike} =
            state.comments;

        const originComments = await getComments(page);
        const cloneComments = structuredClone(originComments);

        const commentsWithAuthor = addAuthor(cloneComments.data, authors);
        const newComments = generation(commentsWithAuthor);

        store.dispatch(
            setComments({
                comments: {...comments, ...newComments.comments},
                treeComments: [...treeComments, ...newComments.treeComments],
            }),
        );
        store.dispatch(setPagination(cloneComments.pagination));
        store.dispatch(
            setAmountComment(amountComment + cloneComments.data.length),
        );
        store.dispatch(
            setAmountLike(amountLike + sumLikes(cloneComments.data)),
        );
    } catch (e) {
        console.log(e);
    }
}
