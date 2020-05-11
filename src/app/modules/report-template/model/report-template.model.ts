import { EntityType } from '../../shared/model/entity.model';
import { AnalysisType, Field } from './analysis.values';
import { IDescriptor } from '../../shared/model/descriptor.model';

export interface IReportTemplateDescriptor extends IDescriptor {
  type: EntityType.TEMPLATE;
}

export interface IReportTemplate extends IReportTemplateDescriptor {
  sections: IReportSection[];
}

export interface IReportSection {
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
