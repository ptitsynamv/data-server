export interface Article {
    id: string;
    subject: string;
    date: string;
    text: string;
}

export interface ArticlesResponse {
    count: number;
    list: Article[];
}
