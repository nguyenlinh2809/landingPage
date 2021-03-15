import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @ViewChild('sidebar') toggleSideBar: ElementRef;
  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  onToggleSideBar(): void {
    this.toggleSideBar.nativeElement.classList.toggle('active');
    console.log(this.toggleSideBar);
  }

  onLogout(): void {
    this.storageService.clearData();
    this.router.navigate(['/login']);
  }

}
