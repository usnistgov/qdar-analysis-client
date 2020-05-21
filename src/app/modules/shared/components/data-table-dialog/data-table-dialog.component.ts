import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataTableComponent } from '../data-table/data-table.component';
import { IDataTable } from '../../../report/model/report.model';
import { Labelizer } from '../../services/values.service';

@Component({
  selector: 'app-data-table-dialog',
  templateUrl: './data-table-dialog.component.html',
  styleUrls: ['./data-table-dialog.component.scss']
})
export class DataTableDialogComponent implements OnInit {

  table: IDataTable;
  labelizer: Labelizer;

  constructor(
    public dialogRef: MatDialogRef<DataTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.table = data.table;
    this.labelizer = data.labelizer;
  }

  ngOnInit(): void {
  }

}
