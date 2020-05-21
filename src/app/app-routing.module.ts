import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'ngx-dam-framework';
import { HomeComponent } from './modules/core/components/home/home.component';
import { ErrorPageComponent } from './modules/core/components/error-page/error-page.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'configurations',
    loadChildren: () => import('./modules/configuration/configuration.module').then(
      m => m.ConfigurationModule
    ),
  },
  {
    path: 'adf',
    loadChildren: () => import('./modules/aggregate-detections-file/aggregate-detections-file.module').then(
      m => m.AggregateDetectionsFileModule
    ),
  },
  {
    path: 'report-templates',
    loadChildren: () => import('./modules/report-template/report-template.module').then(
      m => m.ReportTemplateModule
    ),
  },
  {
    path: 'report',
    loadChildren: () => import('./modules/report/report.module').then(
      m => m.ReportModule
    ),
  },
  {
    path: 'error',
    component: ErrorPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
