import { Component, OnInit } from '@angular/core';
import { NavService } from '../../service/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  open: boolean = false;
  openNav: boolean = false;
  isOpenMobile: boolean;

  constructor(private navServices: NavService) { }

  ngOnInit() {
  
  }

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }
  openMobileNav() {
    this.openNav = !this.openNav;
  }
}
