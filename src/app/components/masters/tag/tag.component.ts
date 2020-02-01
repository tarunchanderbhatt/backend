import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Global } from 'src/app/shared/global';
import { DataService } from 'src/app/shared/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { DBOperation } from 'src/app/shared/dbOperation';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit, OnDestroy {
  dbops: DBOperation;
  tagForm: FormGroup;
  buttonText: string = "Save";
  objRows: any[];
  objRow: any;

  @ViewChild('tabset', { static: true }) elngbTabSet: any;
  constructor(private _fb: FormBuilder, private _dataService: DataService, private _toastr: ToastrService) { }

  setFormState(): void {
    this.dbops = DBOperation.create;
    this.tagForm = this._fb.group({
      Id: [0],
      name: ['']
    })
    this.tagForm.reset();
  }

  ngOnInit() {
    this.getData();
    this.setFormState();
  }

  getData() {
    this._dataService.get(Global.BASE_USER_ENDPOINT + "TagMaster/GetAll/").subscribe(
      tagData => {
        this.objRows = tagData.data;
      });
  }

  onSubmit(formData: any) {
    debugger;
    if (this.tagForm.valid) {
      switch (this.dbops) {
        case DBOperation.create:
          this.tagForm.controls["Id"].setValue(0);
          this._dataService.post(Global.BASE_USER_ENDPOINT + "TagMaster/Save/", formData.value).subscribe(
            data => {
              if (data.isSuccess) {
                this._toastr.success("Data Saved Successfully !!", "Tag Master");
                this.getData();
                this.cancelForm();
                this.elngbTabSet.select('Viewtab');
              } else {
                this._toastr.warning(data.errors[0], "Size Master");
              }
            });
          break;

        case DBOperation.update:
          this._dataService.post(Global.BASE_USER_ENDPOINT + "TagMaster/Update/", formData.value).subscribe(
            data => {
              if (data.isSuccess) {
                this._toastr.success("Data Saved Successfully !!", "Tag Master");
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
      this._toastr.error("Error Occured !!", "Tag Master");
    }
  }

  cancelForm() {
    this.dbops = DBOperation.create;
    this.buttonText = "Save";
    if (this.tagForm.value != null) {
      this.setFormState();
    }
  }

  EditRow(Id: number) {
    this.dbops = DBOperation.update;
    this.buttonText = "Update";
    this.elngbTabSet.select('Addtab');
    this.objRow = this.objRows.filter(x => x.id == Id)[0];
    this.tagForm.controls["Id"].setValue(this.objRow.id);
    this.tagForm.controls["name"].setValue(this.objRow.name);
  }

  DeleteRow(Id: number) {
    let obj = { id: Id };
    this._dataService.post(Global.BASE_USER_ENDPOINT + "TagMaster/Delete/", obj).subscribe(
      deleteObj => {
        if (deleteObj.isSuccess) {
          this._toastr.success("Data Deleted Successfully !!", "Tag Master");
          this.getData();
        } else {
          this._toastr.success(deleteObj.errors[0], "Tag Master");
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
