import { EntityType } from '../../shared/model/entity.model';
import { AnalysisType, Field } from './analysis.values';
import { IDescriptor } from '../../shared/model/descriptor.model';
import { IConfigurationPayload, IConfigurationDescriptor } from '../../configuration/model/configuration.model';
import { IDamResource } from 'ngx-dam-framework';


export interface IReportTemplateDescriptor extends IDescriptor {
  type: EntityType.TEMPLATE;
  compatibilities: IConfigurationDescriptor[];
}

export interface IReportTemplateCreate {
  name: string;
  configurationId: string;
}

export interface IReportTemplate {
  id: string;
  name: string;
  description: string;
  owner: string;
  lastUpdated: Date;
  published: boolean;
  type: EntityType.TEMPLATE;
  viewOnly: boolean;
  sections: IReportSection[];
  configuration: IConfigurationPayload;
}

export interface IReportSection extends IDamResource {
  id: string;
  type: EntityType.SECTION;
  path: string;
  position: number;
  header: string;
  text: string;
  data?: IDataViewQuery[];
  children: IReportSection[];
}

export interface IDataViewQuery {
  type: AnalysisType;
  caption: string;
  paginate: boolean;
  rows: number;
  selectors: IDataSelector[];
  groupBy: Field[];
  filter: {
    denominator: {
      active: boolean;
      value: number;
      comparator: Comparator;
    };
    percentage: {
      active: boolean;
      value: number;
      comparator: Comparator;
    };
    threshold: {
      active: boolean;
      pass: boolean;
    };
    groups: {
      active: boolean;
      keep: boolean;
      values: {
        [field: string]: IValueContainer,
      }[]
    };
  };
  threshold?: {
    custom: IComplexThreshold[],
    global: IThreshold,
  };
}


export interface IDataSelector {
  field: Field;
  values: IValueContainer[];
}

export interface IValueContainer {
  value: any;
}

export interface IComplexThreshold {
  selectors: IDataSelector[];
  threshold: IThreshold;
}

export interface IThreshold {
  comparator: Comparator;
  value: number;
}

export enum Comparator {
  GT = 'GT',
  LT = 'LT',
}
