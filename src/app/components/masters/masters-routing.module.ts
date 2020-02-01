import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandlogoComponent } from './brandlogo/brandlogo.component';
import { CategoryComponent } from './category/category.component';
import { ColorComponent } from './color/color.component';
import { SizeComponent } from './size/size.component';
import { UsertypeComponent } from './usertype/usertype.component';
import { TagComponent } from './tag/tag.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'brandlogo',
        component: BrandlogoComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'color',
        component: ColorComponent
      },
      {
        path: 'size',
        component: SizeComponent
      },
      {
        path: 'usertype',
        component: UsertypeComponent
      },
      {
        path: 'tag',
        component: TagComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
