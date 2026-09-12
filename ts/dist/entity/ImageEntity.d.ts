import { LaunchpicsEntityBase } from '../LaunchpicsEntityBase';
import type { LaunchpicsSDK } from '../LaunchpicsSDK';
import type { Control } from '../types';
import type { Image, ImageLoadMatch, ImageCreateData, ImageRemoveMatch } from '../LaunchpicsTypes';
declare class ImageEntity extends LaunchpicsEntityBase<Image> {
    constructor(client: LaunchpicsSDK, entopts: any);
    make(this: ImageEntity): ImageEntity;
    load(this: any, reqmatch?: ImageLoadMatch, ctrl?: Control): Promise<ImageEntity>;
    create(this: any, reqdata?: ImageCreateData, ctrl?: Control): Promise<ImageEntity>;
    remove(this: any, reqmatch?: ImageRemoveMatch, ctrl?: Control): Promise<ImageEntity>;
}
export { ImageEntity };
