export interface ErrorResponse {
    status: number;
    message: string;
}

export interface GetArticleResponseI {
    _id: string;
    date: string;
    subject: string;
    text: string;
}

export interface GetArticlesResponseI {
    count: number;
    list: {
        id: string
        date: string;
        subject: string;
    }
}
