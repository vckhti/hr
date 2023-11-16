import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgModel} from "@angular/forms";
import {PersistanceService} from "../../services/persistance.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit, OnDestroy{
  id: string | undefined = undefined;
  lastName: string | undefined = undefined;
  firstName: string | undefined = undefined;
  middleName: string | undefined = undefined;
  birthday: string | undefined = undefined;

  subscription = new Subscription();

  authors:any =[];

  showFieldErrorBorders= false;

  constructor(
    private persistanceService: PersistanceService
  ) {
  }

  ngOnInit() {
    this.subscription.add(
      this.persistanceService.getAllDataFromLocalstorage().pipe(

      ).subscribe((res) => {
        console.log('res',res);
        this.authors = res;
        }
      )

    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

    let args={
      id: '1',
      lastName: this.lastName,
      firstName: this.firstName,
      middleName: this.middleName,
      birthday: this.birthday,
    }
    this.persistanceService.addAuthorsToLocalstorage(args);
    this.refreshFields();

  }

  onBlur(field: NgModel) {
  }

}
