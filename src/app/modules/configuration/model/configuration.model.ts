import { IRange } from '../../shared/model/age-group.model';
import { IDamResource } from 'ngx-dam-framework';
import { EntityType } from '../../shared/model/entity.model';

export interface IConfigurationDescriptor extends IDamResource {
  id: string;
  type: EntityType.CONFIGURATION;
  name: string;
  owner: string;
  lastUpdated: Date;
  viewOnly: boolean;
  locked: boolean;
  owned: boolean;
  published: boolean;
}

export interface IDigestConfiguration extends IConfigurationDescriptor {
  description: string;
  payload: IConfigurationPayload;
}

export interface IConfigurationPayload {
  ageGroups: IRange[];
  detections: string[];
  asOf?: string;
}
