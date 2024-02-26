import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/','login']);

  }

}
