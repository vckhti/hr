import {Component} from '@angular/core';
import {NgModel} from "@angular/forms";
import {PersistanceService} from "../../services/persistance.service";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent {
  id: string | undefined = undefined;
  lastName: string | undefined = undefined;
  firstName: string | undefined = undefined;
  middleName: string | undefined = undefined;
  birthday: string | undefined = undefined;
  authors = [];

  showFieldErrorBorders= false;

  constructor(
    private persistanceService: PersistanceService
  ) {
  }

  inputFieldsInvalid(): boolean {
    if ((!this.lastName || this.lastName.length === 0)
      || (!this.firstName || this.firstName.length === 0)
      || (!this.middleName || this.middleName.length === 0)) {
      return true;
    }
    return false;
  }
  refreshFields(): void {
    this.lastName = undefined;
    this.firstName = undefined;
    this.middleName = undefined;
    this.birthday = undefined;
    this.showFieldErrorBorders= false;
  }

  addAuthor(): void {
    this.showFieldErrorBorders = true;
    if (this.inputFieldsInvalid()) {
      console.error('Заполните обязательные поля!');
      return;
    }
    this.refreshFields();

  }

  onBlur(field: NgModel) {
  }

}
