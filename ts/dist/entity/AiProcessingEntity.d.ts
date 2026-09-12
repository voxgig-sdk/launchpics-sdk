import { LaunchpicsEntityBase } from '../LaunchpicsEntityBase';
import type { LaunchpicsSDK } from '../LaunchpicsSDK';
import type { Control } from '../types';
import type { AiProcessing, AiProcessingCreateData } from '../LaunchpicsTypes';
declare class AiProcessingEntity extends LaunchpicsEntityBase<AiProcessing> {
    constructor(client: LaunchpicsSDK, entopts: any);
    make(this: AiProcessingEntity): AiProcessingEntity;
    create(this: any, reqdata?: AiProcessingCreateData, ctrl?: Control): Promise<AiProcessingEntity>;
}
export { AiProcessingEntity };
