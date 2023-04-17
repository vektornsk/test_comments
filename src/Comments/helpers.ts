import moment from "moment";
import {Author, Comment, HashComment, TreeComment} from "./Model";
import "moment/locale/ru";

export function declinationComments(number: number): string {
    const text = ["комментарий", "комментария", "комментариев"];
    var cases = [2, 0, 1, 1, 1, 2];
    return (
        number +
        " " +
        text[
            number % 100 > 4 && number % 100 < 20
                ? 2
                : cases[number % 10 < 5 ? number % 10 : 5]
        ]
    );
}

export function getTime(time: string): string {
    let currentTime = moment(Date.now());
    let createdTime = moment(time);

    return createdTime.diff(currentTime, "day") === 0
        ? createdTime.startOf("hour").fromNow()
        : createdTime.format("YYYY-MM-DD HH:mm:ss");
}

export function addAuthor(comments: Comment[], authors: Author[]): Comment[] {
    return comments.map((comment) => {
        const author = authors.find((author) => author.id === comment.author);
        if (author) {
            comment.name = author.name;
            comment.avatar = author.avatar;
        }

        return comment;
    });
}

export function generation(arr: Comment[]): {
    comments: HashComment;
    treeComments: TreeComment[];
} {
    const comments: HashComment = {};

    arr.sort((a, b) => Date.parse(b.created) - Date.parse(a.created)).forEach(
        (el) => {
            comments[el.id] = el;
        },
    );

    const treeComments = arr.reduce(
        (r: TreeComment[], e, i: number, arr: Comment[]) => {
            if (e.parent) {
                arr.filter((el) => el.id === e.parent).forEach((el) =>
                    el.child
                        ? el.child.push({
                              child: e.child || null,
                              id: e.id,
                              parent: e.parent,
                          })
                        : (el.child = [
                              {
                                  child: e.child || null,
                                  id: e.id,
                                  parent: e.parent,
                              },
                          ]),
                );
            } else {
                r.push({child: e.child || null, id: e.id, parent: e.parent});
            }

            return r;
        },
        [],
    );

    return {comments, treeComments};
}

export function sumLikes(arr: Comment[]): number {
    let likes = 0;

    arr.forEach((el) => {
        likes += el.likes;
    });

    return likes;
}
