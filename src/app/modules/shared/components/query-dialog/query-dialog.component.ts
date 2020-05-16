import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDetectionResource, ICvxResource, IDetectionMap, ICvxMap } from '../../model/public.model';
import { SelectItem } from 'primeng/api/selectitem';
import { AnalysisType, names, Field } from '../../../report-template/model/analysis.values';
import { IDataViewQuery, IDataSelector } from '../../../report-template/model/report-template.model';
import { IConfigurationPayload } from '../../../configuration/model/configuration.model';
import { IFieldInputOptions } from '../field-input/field-input.component';
import { SupportDataService } from '../../services/support-data.service';
import { UserMessage } from 'ngx-dam-framework';

@Component({
  selector: 'app-query-dialog',
  templateUrl: './query-dialog.component.html',
  styleUrls: ['./query-dialog.component.scss']
})
export class QueryDialogComponent implements OnInit {

  detections: IDetectionResource[];
  cvxCodes: ICvxResource[];
  detectionsMap: IDetectionMap = {};
  cvxMap: ICvxMap = {};
  paths: SelectItem[];
  configuration: IConfigurationPayload;
  tables: {
    patientTables: string[];
    vaccinationTables: string[];
  };
  options: IFieldInputOptions;
  value: IDataViewQuery;
  tabsValid = {
    general: {
      valid: true,
      messages: [],
    },
    selectors: {
      valid: true,
      messages: [],
    },
    groupBy: {
      valid: true,
      messages: [],
    },
    postProcess: {
      valid: true,
      messages: [],
    }
  };


  typeNames = names;

  constructor(
    public dialogRef: MatDialogRef<QueryDialogComponent>,
    public supportData: SupportDataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data);

    this.options = this.supportData.getFieldOptions({
      detections: data.detections,
      ageGroups: data.configuration.ageGroups,
      cvxs: data.cvxCodes,
      tables: {
        vaccinationTables: data.vaccinationTables,
        patientTables: data.patientTables,
      }
    });
    this.value = data.query;
    this.detections = data.detections;
    this.cvxCodes = data.cvxCodes;
    this.configuration = data.configuration;
    this.tables = {
      vaccinationTables: data.vaccinationTables,
      patientTables: data.patientTables,
    };
    this.paths = Object.keys(AnalysisType).map((key) => {
      return {
        label: names[key],
        value: AnalysisType[key],
      };
    });
  }

  get messages() {
    return [
      ...this.tabsValid.general.messages,
      ...this.tabsValid.groupBy.messages,
      ...this.tabsValid.selectors.messages,
      ...this.tabsValid.postProcess.messages,
    ];
  }

  valueOfAnalysis(str: string): AnalysisType {
    return Object.keys(AnalysisType).find((key) => {
      return AnalysisType[key] === str;
    }) as AnalysisType;
  }

  nameOf(type: AnalysisType) {
    return names[this.valueOfAnalysis(type)];
  }

  setValidStatus(key: string, status: boolean) {
    this.tabsValid[key].valid = status;
  }

  setMessages(key: string, messages: UserMessage[]) {
    this.tabsValid[key].messages = messages;
  }

  selectorsHasField(selectors: IDataSelector[], field: Field) {
    return selectors.findIndex((selector) => selector.field === field) !== -1;
  }

  groupsHasField(groups: Field[], field: Field) {
    return groups.indexOf(field) !== -1;
  }

  ngOnInit(): void {
  }

}
