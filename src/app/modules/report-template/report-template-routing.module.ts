import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplatesListComponent } from './components/templates-list/templates-list.component';
import { LoadReportTemplates, CoreActionTypes } from './store/core.actions';
import { DataLoaderGuard } from 'ngx-dam-framework';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: TemplatesListComponent,
    data: {
      loadAction: LoadReportTemplates,
      successAction: CoreActionTypes.LoadReportTemplatesSuccess,
      failureAction: CoreActionTypes.LoadReportTemplatesSuccess,
      redirectTo: ['/', 'error'],
    },
    canActivate: [DataLoaderGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportTemplateRoutingModule { }
