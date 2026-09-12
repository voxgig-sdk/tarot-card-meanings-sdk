import { TarotCardMeaningsEntityBase } from '../TarotCardMeaningsEntityBase';
import type { TarotCardMeaningsSDK } from '../TarotCardMeaningsSDK';
import type { Control } from '../types';
import type { Card, CardLoadMatch, CardListMatch } from '../TarotCardMeaningsTypes';
declare class CardEntity extends TarotCardMeaningsEntityBase<Card> {
    constructor(client: TarotCardMeaningsSDK, entopts: any);
    make(this: CardEntity): CardEntity;
    load(this: any, reqmatch?: CardLoadMatch, ctrl?: Control): Promise<CardEntity>;
    list(this: any, reqmatch?: CardListMatch, ctrl?: Control): Promise<CardEntity[]>;
}
export { CardEntity };
