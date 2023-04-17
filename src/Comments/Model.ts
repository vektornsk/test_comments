export interface Author {
    id: number;
    name: string;
    avatar: string;
}

export interface Comment {
    child?: Child[] | null;
    id: number;
    created: string;
    text: string;
    author: number;
    parent: number | null;
    likes: number;
    name: string;
    avatar: string;
    isLiked?: boolean;
}

export interface HashComment {
    [id: string]: Comment;
}

export interface TreeComment {
    id: number;
    parent: number | null;
    child: Child[] | null;
}

export type Child = {
    id: number;
    parent: number | null;
    child: Array<Child> | null;
};

export interface Pagination {
    page: number;
    size: number;
    total_pages: number;
}
