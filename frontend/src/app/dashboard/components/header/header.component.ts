import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {logOutAction} from "../../../modules/auth/store/actions/login.action";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private store: Store
  ) {}

  onClick() {
    this.store.dispatch(logOutAction());
  }

}
