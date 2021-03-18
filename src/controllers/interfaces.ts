export interface AntropogenezArticle extends NewAntropogenezArticle {
    id: string;
    date: string;
}

export interface AntropogenezArticlesResponse {
    count: number;
    list: AntropogenezArticle[];
}

export interface NewAntropogenezArticle {
    subject: string;
    text: string;
}

export interface NewFArticle {
    title: string;
    url: string;
}

export interface FArticle extends NewFArticle {
    id: string;
}

export interface FArticlesResponse {
    count: number;
    list: FArticle[];
}

export interface PublicServiceWaterI extends NewPublicServiceWaterI {
    id: string;
}

export interface NewPublicServiceWaterI {
    date: string;
    data: WaterFormI
}

export interface WaterFormI {
    hot1: string;
    hot1CounterName: string;
    hot2: string;
    hot2CounterName: string;
    cold1: string;
    cold1CounterName: string;
    cold2: string;
    cold2CounterName: string;
}

