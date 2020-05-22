import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import {
  Component,
  OnInit,
} from '@angular/core';
import { selectRouterURL, selectIsAdmin } from 'ngx-dam-framework';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAdf: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.isAdf = store.select(selectRouterURL).pipe(
      map(
        (url: string) => {
          return url.startsWith('/adf/');
        },
      ),
    );
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  ngOnInit(): void {
  }

}
