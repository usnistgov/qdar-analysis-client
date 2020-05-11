import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFiles } from '../../store/core.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-adf-dashboard',
  templateUrl: './adf-dashboard.component.html',
  styleUrls: ['./adf-dashboard.component.scss']
})
export class AdfDashboardComponent implements OnInit {

  constructor(private store: Store<any>) {

  }

  ngOnInit(): void {
  }

}
