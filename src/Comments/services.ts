import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import getCommentsRequest from "src/api/comments/getCommentsRequest";
import {Author, Pagination} from "./Model";

interface CommentRequest {
    data: {
        id: number;
        created: string;
        text: string;
        author: number;
        parent: null | number;
        likes: number;
    }[];
    pagination: Pagination;
}

export async function getAuthor(): Promise<Author[]> {
    return await getAuthorsRequest().catch((e) => getAuthorsRequest());
}

export async function getComments(page: number): Promise<CommentRequest> {
    return await getCommentsRequest(page).catch((e) =>
        getCommentsRequest(page),
    );
}
