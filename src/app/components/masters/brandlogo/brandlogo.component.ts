import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DBOperation } from 'src/app/shared/dbOperation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { Global } from 'src/app/shared/global';
import { TextFieldValidator } from 'src/app/validators/validations.validators';

@Component({
  selector: 'app-brandlogo',
  templateUrl: './brandlogo.component.html',
  styleUrls: ['./brandlogo.component.scss']
})
export class BrandlogoComponent implements OnInit, OnDestroy {
  dbops: DBOperation;
  addForm: FormGroup;
  buttonText: string = "Save";
  objRows: any[];
  objRow: any;
  fileToUpload: any;

  formErrors = {
    'name' : ''
  };

  validationMessages = {
    'name' : {
      'required'  : 'Name is required',
      'minlength' : 'Name can not be less than 3 characters long',
      'maxlength' : 'Name can not be more  than 10 characters long',
      'validTextField' : 'Name must be contains only number and letters'
    }
  }

  @ViewChild('tabset', { static: true }) elngbTabSet: any;
  constructor(private _fb: FormBuilder, private _dataService: DataService, private _toastr: ToastrService) { }

  setFormState(): void {
    this.dbops = DBOperation.create;
    this.addForm = this._fb.group({
      Id: [0],
      name: ['', Validators.compose([Validators.required,
      Validators.maxLength(10),
      Validators.minLength(3),
      TextFieldValidator.validTextField
      ])]
    })

    this.addForm.valueChanges.subscribe(fData => this.onValueChanged(fData));
    this.addForm.reset();
   
  }

  onValueChanged(data?: any) {
    debugger;
    if (!this.addForm) { return; }
    const form = this.addForm;
    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  ngOnInit() {
    this.getData();
    this.setFormState();
  }

  getData() {
    this._dataService.get(Global.BASE_USER_ENDPOINT + "BrandLogo/GetAll/").subscribe(
      tagData => {
        this.objRows = tagData.data;
      });
  }


  Upload(files: any) {
    debugger;
    if (files.length === 0) {
      return;
    } else {
      this.fileToUpload = files.item(0);
    }
  }
  onSubmit(formData: any) {
    debugger;
    if (this.dbops == 1 && !this.fileToUpload) {
      this._toastr.warning("Please upload Image !!", "Brand Logo Master");
      return;
    }

    const formData1: FormData = new FormData();
    formData1.append("Id", formData.value.id);
    formData1.append("Name", formData.value.name);
    if (this.fileToUpload) {
      formData1.append("Image", this.fileToUpload, this.fileToUpload.name);
    }


    if (this.addForm.valid) {
      switch (this.dbops) {
        case DBOperation.create:
          this._dataService.postImages(Global.BASE_USER_ENDPOINT + "BrandLogo/Save/", formData1).subscribe(
            data => {
              if (data.isSuccess) {
                this._toastr.success("Data Saved Successfully !!", "Brand Logo Master");
                this.getData();
                this.cancelForm();
                this.elngbTabSet.select('Viewtab');
              } else {
                this._toastr.warning(data.errors[0], "Brand Logo Master");
              }
            });
          break;

        case DBOperation.update:
          this._dataService.post(Global.BASE_USER_ENDPOINT + "BrandLogo/Update/", formData1).subscribe(
            data => {
              if (data.isSuccess) {
                this._toastr.success("Data Saved Successfully !!", "Brand Logo Master");
                this.getData();
                this.cancelForm();
                this.elngbTabSet.select('Viewtab');
              } else {
                this._toastr.warning(data.errors[0], "Brand Logo Master");
              }
            });
          break;

      }
    } else {
      this._toastr.error("Error Occured !!", "Brand Logo Master");
    }
  }

  cancelForm() {
    this.dbops = DBOperation.create;
    this.buttonText = "Save";
    if (this.addForm.value != null) {
      this.setFormState();
    }
  }

  EditRow(Id: number) {
    this.dbops = DBOperation.update;
    this.buttonText = "Update";
    this.elngbTabSet.select('Addtab');
    this.objRow = this.objRows.filter(x => x.id == Id)[0];
    this.addForm.controls["Id"].setValue(this.objRow.id);
    this.addForm.controls["name"].setValue(this.objRow.name);
  }

  DeleteRow(Id: number) {
    let obj = { id: Id };
    this._dataService.post(Global.BASE_USER_ENDPOINT + "BrandLogo/Delete/", obj).subscribe(
      deleteObj => {
        if (deleteObj.isSuccess) {
          this._toastr.success("Data Deleted Successfully !!", "Brand Logo Master");
          this.getData();
        } else {
          this._toastr.success(deleteObj.errors[0], "Brand Logo Master");
        }
      }
    );
  }

  beforeChange(event: any) {

  }
  ngOnDestroy() {
    this.objRows = null;
    this.objRow = null;
  }
}
