export interface Card {
    arcana: string;
    desc?: string;
    id?: string;
    meaningRev?: string;
    meaningUp?: string;
    name: string;
    nameShort: string;
    suit?: string;
    value?: string;
}
export interface CardLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface CardListMatch {
    arcana?: string;
    suit?: string;
}
