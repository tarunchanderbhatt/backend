import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Globalstatic } from 'src/app/shared/globalstatic';
import { DataService } from 'src/app/shared/service/data.service';
import { Global } from 'src/app/shared/global';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { MustMatchValidators } from 'src/app/validators/validations.validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  submitted: boolean = false;
  message: string = "";
  @ViewChild('ngbTabSet', { static: true }) elngbTabSet: any;
  constructor(private _fb: FormBuilder, private _dataService: DataService, private authService: AuthService, private _toastr: ToastrService) { }

  ngOnInit() {
    this.createLoginForm();
    this.createRegistrationForm();
  }

  createLoginForm() {
    this.loginForm = this._fb.group({
      userName: [''],
      password: ['']
    });
  }

  createRegistrationForm() {
    this.registerForm = this._fb.group({
      Id: [0],
      UserTypeId: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.required]
    }, {
      validators: MustMatchValidators("password", "confirmPassword")
    }
    )
  }
  get f() { return this.registerForm.controls };

  beforeChange(event: NgbTabChangeEvent) {
    if (event.nextId == "logintab1") {
      alert("do you want to show logintab .");
      event.preventDefault();
    }
  }

  onLoginSubmit(formData: any) {
    if (this.loginForm.valid) {
      this._dataService.post(Global.BASE_USER_ENDPOINT + "UserMaster/Login/", this.loginForm.value).subscribe(
        loginData => {
          if (loginData.isSuccess) {
            this.authService.login(loginData.data);
            this.message = this.authService.getMessage();
            this._toastr.success("Login Success !!", "Login");
            this.reset();
          } else {
            this._toastr.error(this.message, "Login");
          }
        }
      );
    } else {
      this._toastr.error("Please enter valid UserName and Password !!", "Login");
    }
  }

  reset() {
    this.loginForm.controls["userName"].setValue("");
    this.loginForm.controls["password"].setValue("");
  }

  onSubmit(formData: any) {
    debugger;
    this.submitted = true;

    if (this.registerForm.valid) {
      this.registerForm.controls["Id"].setValue(0);
      this.registerForm.controls["UserTypeId"].setValue(Globalstatic.Saller);

      this._dataService.post(Global.BASE_USER_ENDPOINT + "UserMaster/Save/", formData.value).subscribe(
        data => {
          if (data.isSuccess) {
            this._toastr.success("Data Saved Successfully !!", "Registration");
            this.registerForm.reset();
            this.elngbTabSet.select('logintab');
          }
        });
    } else {
      this._toastr.error("Error Occured !!", "Registration");
    }
  }
}
