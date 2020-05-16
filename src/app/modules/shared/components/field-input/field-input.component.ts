import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { IDetectionResource, ICvxResource } from '../../model/public.model';
import { IRange } from '../../model/age-group.model';
import { Field } from 'src/app/modules/report-template/model/analysis.values';
import { AnalysisType } from '../../../report-template/model/analysis.values';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface IFieldInputInfo {
  inputType: 'TEXT' | 'DROPDOWN';
  options: {
    [analysisType: string]: SelectItem[];
    default: SelectItem[];
  };
  id: string;
}

export interface IFieldInputData {
  detections: IDetectionResource[];
  cvxs: ICvxResource[];
  ageGroups: IRange[];
  tables: {
    patientTables: string[];
    vaccinationTables: string[];
  };
}

export interface IFieldInputOptions {
  detectionOptions: SelectItem[];
  cvxOptions: SelectItem[];
  ageGroupOptions: SelectItem[];
  vaccinationTableOptions: SelectItem[];
  patientTableOptions: SelectItem[];
  eventOptions: SelectItem[];
}

@Component({
  selector: 'app-field-input',
  templateUrl: './field-input.component.html',
  styleUrls: ['./field-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FieldInputComponent),
    multi: true
  }]
})
export class FieldInputComponent implements ControlValueAccessor, OnInit {

  @Input()
  set options(data: IFieldInputOptions) {
    this.fieldInputInfo = {
      [Field.DETECTION]: {
        id: 'detections',
        inputType: 'DROPDOWN',
        options: {
          default: data.detectionOptions,
        }
      },
      [Field.AGE_GROUP]: {
        id: 'ag',
        inputType: 'DROPDOWN',
        options: {
          default: data.ageGroupOptions,
        }
      },
      [Field.EVENT]: {
        id: 'ev',
        inputType: 'DROPDOWN',
        options: {
          default: data.eventOptions,
        }
      },
      [Field.VACCINE_CODE]: {
        id: 'cvx',
        inputType: 'DROPDOWN',
        options: {
          default: data.cvxOptions,
        }
      },
      [Field.TABLE]: {
        id: 'cvx',
        inputType: 'DROPDOWN',
        options: {
          [AnalysisType.PATIENTS_VOCABULARY]: data.patientTableOptions,
          [AnalysisType.VACCINCATIONS_VOCABULARY]: data.patientTableOptions,
          default: [...data.patientTableOptions, ...data.patientTableOptions],
        }
      },
    };
  }

  @Input()
  field: Field;
  @Input()
  id: string;
  @Input()
  analysis: AnalysisType;
  fieldInputInfo: { [field: string]: IFieldInputInfo };
  onChange: any;
  onTouched: any;
  disabled: boolean;
  value: any;
  constructor() { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
  }

  valueChange(value) {
    this.onChange(value);
  }

  ngOnInit(): void {
  }

}
