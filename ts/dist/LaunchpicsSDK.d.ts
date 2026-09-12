import { AiProcessingEntity } from './entity/AiProcessingEntity';
import { HealthEntity } from './entity/HealthEntity';
import { ImageEntity } from './entity/ImageEntity';
export type * from './LaunchpicsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { LaunchpicsEntityBase } from './LaunchpicsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class LaunchpicsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    AiProcessing(entopts?: Record<string, any>): AiProcessingEntity;
    Health(entopts?: Record<string, any>): HealthEntity;
    Image(entopts?: Record<string, any>): ImageEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): LaunchpicsSDK;
    tester(testopts?: any, sdkopts?: any): LaunchpicsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof LaunchpicsSDK;
export { stdutil, config, BaseFeature, LaunchpicsEntityBase, LaunchpicsSDK, SDK, };
