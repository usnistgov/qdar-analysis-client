import { IDamResource } from 'ngx-dam-framework';
import { EntityType } from '../../shared/model/entity.model';

export interface IUserResource extends IDamResource {
  id: string;
  type: EntityType.USER;
  username: string;
  authorities: string[];
  email: string;
  pending: boolean;
  fullName: string;
  organization: string;
}
