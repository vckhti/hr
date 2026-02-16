import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core'
import {FormGroup, FormBuilder} from '@angular/forms'
import {Store, select} from '@ngrx/store'
import {Observable} from 'rxjs'
import {isSubmittingSelector, validationErrorsSelector} from "../../store/selectors";
import {loginAction} from "../../store/actions/login.action";
import {ActivatedRoute} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'mc-login',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login2Component implements OnInit, OnDestroy {
  form: FormGroup
  request: any
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<any>

  fromValue = this.route.snapshot.queryParamMap.get('from');
  timezoneValue = this.route.snapshot.queryParamMap.get('timezone');


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    private cookieService: CookieService
  ) {
  }

  ngOnInit(): void {
    //this.cookieService.set('test', 'Hello World');
    //let allCookies: {} = this.cookieService.getAll();
    //let pairs = document.cookie.split(";");
    //this.cookieService.deleteAll();
    //console.log('allCookies pairs',allCookies);
    if (this.timezoneValue && this.timezoneValue.length > 0) {
      this.ifExistGetParameterThenDispatch();
    }
    this.initFormControls();
    this.initObservables();
    //console.log('Initial Filter:', this.fromValue);
    //console.log('Initial timezone:', this.timezoneValue);
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
      // password: [''],
      birthday: [''],
      postal: [''],
      city: [''],
      country: ['']
      // cc_number: [''],
      // cc_month: [''],
      // cc_year: [''],
      // cc_cvv: ['']
    });
  }

  ifExistGetParameterThenDispatch(): void {
    this.request = {
      name: this.timezoneValue,
      email: '-',
      phone: '',
      organization: '-',
      address: '-',
      birthday: '-',
      postal: '-',
      city: '-',
      country: '-'

    }
    //console.log('ifExistGetParameterThenDispatch', this.request);
    this.store.dispatch(loginAction({request: this.request}));
  }

  onSubmit(): void {
    this.request = {
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      organization: this.form.value.organization,
      address: this.form.value.address,
      birthday: this.form.value.birthday,

      // password: this.form.value.password,

      postal: this.form.value.postal,
      city: this.form.value.city,
      country: this.form.value.country,

      // cc_number: this.form.value.cc_number,
      // cc_month: this.form.value.cc_month,
      // cc_year: this.form.value.cc_year,
      // cc_cvv: this.form.value.cc_cvv,
    }
    //console.log('request22', this.request);
    this.store.dispatch(loginAction({request: this.request}));
  }

  goBack() {
    window.history.back();
  }
}
