import { PogonyEntityBase } from '../PogonyEntityBase';
import type { PogonySDK } from '../PogonySDK';
import type { Control } from '../types';
import type { Criminal, CriminalListMatch } from '../PogonyTypes';
declare class CriminalEntity extends PogonyEntityBase<Criminal> {
    constructor(client: PogonySDK, entopts: any);
    make(this: CriminalEntity): CriminalEntity;
    list(this: any, reqmatch?: CriminalListMatch, ctrl?: Control): Promise<CriminalEntity[]>;
}
export { CriminalEntity };
