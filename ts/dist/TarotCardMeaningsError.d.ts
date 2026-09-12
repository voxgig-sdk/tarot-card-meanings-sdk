import { Context } from './Context';
declare class TarotCardMeaningsError extends Error {
    isTarotCardMeaningsError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { TarotCardMeaningsError };
