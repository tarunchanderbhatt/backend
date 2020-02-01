import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { CategoryComponent } from './category/category.component';
import { BrandlogoComponent } from './brandlogo/brandlogo.component';
import { ColorComponent } from './color/color.component';
import { SizeComponent } from './size/size.component';
import { TagComponent } from './tag/tag.component';
import { UsertypeComponent } from './usertype/usertype.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoryComponent, BrandlogoComponent, ColorComponent, SizeComponent, TagComponent, UsertypeComponent],
  imports: [
    CommonModule,
    MastersRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDatatableModule
  ]
})
export class MastersModule { }
