import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../service/nav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: Menu[];
  FullName: string = "Ajeet Kumar Singh";
  UserType: string = "Admin";

  constructor(private navService: NavService) {
    this.menuItems = this.navService.MenuItems;
  }

  ngOnInit() {
  }

  toggleNavActive(item) {
    debugger;
    item.active = !item.active;
  }

}
