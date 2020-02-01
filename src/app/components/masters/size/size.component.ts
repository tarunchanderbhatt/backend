import { Component, OnInit, ViewChild } from '@angular/core';
import { DBOperation } from 'src/app/shared/dbOperation';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/shared/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { Global } from 'src/app/shared/global';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {
  dbops: DBOperation;
  sizeForm: FormGroup;
  buttonText: string = "Save";
  objRows: any[];
  objRow: any;

  @ViewChild('tabset', { static: true }) elngbTabSet: any;
  constructor(private _fb: FormBuilder, private _dataService: DataService, private _toastr: ToastrService) { }

  setFormState(): void {
    this.dbops = DBOperation.create;
    this.sizeForm = this._fb.group({
      Id: [0],
      name: ['']
    })
    this.sizeForm.reset();
  }

  ngOnInit() {
    this.getData();
    this.setFormState();
  }

  getData() {
    this._dataService.get(Global.BASE_USER_ENDPOINT + "SizeMaster/GetAll/").subscribe(
      sizeData => {
        this.objRows = sizeData.data;
      });
  }

  onSubmit(formData: any) {
    debugger;
    if (this.sizeForm.valid) {
      switch (this.dbops) {
        case DBOperation.create:
          this.sizeForm.controls["Id"].setValue(0);
          this._dataService.post(Global.BASE_USER_ENDPOINT + "SizeMaster/Save/", formData.value).subscribe(
            data => {
              if (data.isSuccess) {
                this._toastr.success("Data Saved Successfully !!", "Size Master");
                this.getData();
                this.cancelForm();
                this.elngbTabSet.select('Viewtab');
              } else {
                this._toastr.warning(data.errors[0], "Size Master");
              }
            });
          break;

        case DBOperation.update:
          this._dataService.post(Global.BASE_USER_ENDPOINT + "SizeMaster/Update/", formData.value).subscribe(
            data => {
              if (data.isSuccess) {
                this._toastr.success("Data Saved Successfully !!", "Size Master");
                this.getData();
                this.cancelForm();
                this.elngbTabSet.select('Viewtab');
              } else {
                this._toastr.warning(data.errors[0], "Size Master");
              }
            });
          break;

      }
    } else {
      this._toastr.error("Error Occured !!", "Size Master");
    }
  }

  cancelForm() {
    this.dbops = DBOperation.create;
    this.buttonText = "Save";
    if (this.sizeForm.value != null) {
      this.setFormState();
    }
  }

  EditRow(Id: number) {
    this.dbops = DBOperation.update;
    this.buttonText = "Update";
    this.elngbTabSet.select('Addtab');
    debugger;
    this.objRow = this.objRows.filter(x => x.id == Id)[0];
    this.sizeForm.controls["Id"].setValue(this.objRow.id);
    this.sizeForm.controls["name"].setValue(this.objRow.name);
  }

  DeleteRow(Id: number) {
    let obj = { id: Id };
    this._dataService.post(Global.BASE_USER_ENDPOINT + "SizeMaster/Delete/", obj).subscribe(
      deleteObj => {
        if (deleteObj.isSuccess) {
          this._toastr.success("Data Deleted Successfully !!", "Tag Master");
          this.getData();
        } else {
          this._toastr.success(deleteObj.errors[0], "Size Master");
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
