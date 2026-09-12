import { Context } from './Context';
declare class PogonyError extends Error {
    isPogonyError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { PogonyError };
