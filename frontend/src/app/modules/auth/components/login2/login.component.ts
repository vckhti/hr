import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core'
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {Store, select} from '@ngrx/store'
import {Observable} from 'rxjs'
import {isSubmittingSelector, validationErrorsSelector} from "../../store/selectors";
import {LoginRequestInterface} from "../../types/loginRequest.interface";
import {loginAction} from "../../store/actions/login.action";

@Component({
  selector: 'mc-login',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login2Component implements OnInit, OnDestroy {
  form: FormGroup
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<any>

  constructor(
    private fb: FormBuilder,
    private store: Store,
    ) {}

  ngOnInit(): void {
    this.initFormControls();
    this.initObservables();
  }

  ngOnDestroy(): void {
  }

  private initObservables(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  private initFormControls(): void {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      organization: [''],
      address: [''],
      password: [''],
      postal: [''],
      city: [''],
      cc_number: [''],
      cc_month: [''],
      cc_year: ['']
    });
  }

  onSubmit(): void {
    const request: any = {
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      organization: this.form.value.organization,
      address: this.form.value.address,

      password: this.form.value.password,

      postal: this.form.value.postal,
      city: this.form.value.city,
      cc_number: this.form.value.cc_number,
      cc_month: this.form.value.cc_month,
      cc_year: this.form.value.cc_year,
    }
    console.log('request22',request);
    //this.store.dispatch(loginAction({request}));
  }

  goBack() {
    window.history.back();
  }
}
