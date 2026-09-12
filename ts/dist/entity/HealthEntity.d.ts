import { LaunchpicsEntityBase } from '../LaunchpicsEntityBase';
import type { LaunchpicsSDK } from '../LaunchpicsSDK';
import type { Control } from '../types';
import type { Health, HealthLoadMatch } from '../LaunchpicsTypes';
declare class HealthEntity extends LaunchpicsEntityBase<Health> {
    constructor(client: LaunchpicsSDK, entopts: any);
    make(this: HealthEntity): HealthEntity;
    load(this: any, reqmatch?: HealthLoadMatch, ctrl?: Control): Promise<HealthEntity>;
}
export { HealthEntity };
