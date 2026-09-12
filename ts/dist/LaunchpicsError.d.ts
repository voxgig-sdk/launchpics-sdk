import { Context } from './Context';
declare class LaunchpicsError extends Error {
    isLaunchpicsError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { LaunchpicsError };
