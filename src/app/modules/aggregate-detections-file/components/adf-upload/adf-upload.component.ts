import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FileService } from '../../services/file.service';
import { RxjsStoreHelperService, MessageType } from 'ngx-dam-framework';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adf-upload',
  templateUrl: './adf-upload.component.html',
  styleUrls: ['./adf-upload.component.scss']
})
export class AdfUploadComponent implements OnInit {

  file: File;
  form: FormGroup;

  constructor(
    private store: Store<any>,
    private fileService: FileService,
    private router: Router,
    private helper: RxjsStoreHelperService,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      facility: new FormControl(''),
      accept: new FormControl(false, [Validators.required]),
    });
  }

  submit() {
    const form = new FormData();
    const data = this.form.getRawValue();
    form.append('name', data.name);
    form.append('file', this.file);

    this.helper.getMessageAndHandle<any>(
      this.store,
      () => {
        return this.fileService.upload(form);
      },
      (message) => {
        if (message.status === MessageType.SUCCESS) {
          this.router.navigate(['/', 'adf', 'dashboard']);
        }
        return [];
      }
    ).subscribe();
  }

  setFile(file: File) {
    this.file = file;
  }

  ngOnInit(): void {
  }

}
