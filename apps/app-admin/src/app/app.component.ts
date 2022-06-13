import { I_Store } from '@schema'
import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'zipee-commerce-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  store$: Observable<I_Store> = new Observable()

  constructor(
    private readonly _http: HttpClient,
  ) {}

  ngOnInit() {
    this.store$ = this._http.get<I_Store>('/api/admin/report')
  }

}
