import { IReportTemplate, IReportSection, IDataViewQuery, IThreshold } from './report-template.model';
import { Field } from './analysis.values';

export interface IReport extends IReportTemplate {
  templateId: string;
  sections: IReportSectionResult[];
}

export interface IReportSectionResult extends IReportSection {
  data: IDataTable[];
}

export interface IDataTable extends IDataViewQuery {
  headers: Field[];
  values: IDataTableRow[];
}

export interface IDataTableRow {
  values: {
    [key: string]: string;
  };
  result: IFraction;
  threshold: IThreshold;
  pass: boolean;
}

export interface IFraction {
  count: number;
  total: number;
}
