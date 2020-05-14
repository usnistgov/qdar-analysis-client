import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  jobs = [{
    file: 'ABC',
    jobs: [{
      name: 'J1',
      startedOn: new Date(),
      progress: 30,
      template: 'Template A',
    },
    {
      name: 'J2',
      startedOn: new Date(),
      progress: 50,
      template: 'Template A',
    }]
  },
  {
    file: 'XYZ',
    jobs: [{
      name: 'J11',
      startedOn: new Date(),
      progress: 30,
      template: 'Template B',
    },
    {
      name: 'J22',
      startedOn: new Date(),
      progress: 50,
      template: 'Template C',
    }]
  }];

  filesFlat = [];
  groupsMeta = {};

  constructor() {
    this.jobs.forEach((j) => {
      this.groupsMeta[j.file] = { index: this.filesFlat.length, size: j.jobs.length };
      this.filesFlat = [
        ...this.filesFlat,
        ...j.jobs.map((job) => {
          return {
            file: j.file,
            ...job,
          };
        })
      ];
    });
  }

  ngOnInit(): void {
  }

}
