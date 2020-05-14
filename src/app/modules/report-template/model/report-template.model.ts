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
  selectors: IDataSelector[];
  groupBy: Field[];
  threshold: {
    custom: IComplexThreshold[],
    global: IThreshold,
  };
}


export interface IDataSelector {
  field: Field;
  values: string[];
}

export interface IComplexThreshold {
  selectors: IDataSelector[];
  threshold: IThreshold;
}

export interface IThreshold {
  shouldBe: ThresholdGoal;
  value: number;
}

export enum ThresholdGoal {
  ABOVE = 'ABOVE',
  BELOW = 'BELOW',
}
