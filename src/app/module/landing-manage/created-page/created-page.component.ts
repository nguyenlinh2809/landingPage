import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingPageModel } from 'src/app/model/landing-page.model';
import { ResponseModel } from 'src/app/model/response.model';
import { PageService } from 'src/app/service/page.service';
import { ToastService } from 'src/app/service/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-created-page',
  templateUrl: './created-page.component.html',
  styleUrls: ['./created-page.component.scss']
})
export class CreatedPageComponent implements OnInit {

  BASE_RESOURCE_URL = environment.BASE_RESOURCE_URL;
  landingPages: LandingPageModel[] = [];

  @ViewChild('template') template: ElementRef;
  constructor(private pageService: PageService,
              private toastService: ToastService,
              private router: Router,
              private activedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.getPages();
  }
  goToEditor(landingPage?: LandingPageModel): void {
    if (landingPage) {
      this.router.navigate([`../${landingPage.id}`], { relativeTo: this.activedRoute });
    } else {
      this.router.navigate([`../new`], { relativeTo: this.activedRoute });
    }
  }
  getPages(): void {
    this.pageService.getList()
      .subscribe(
        (response: ResponseModel<LandingPageModel>) => {
          if (response.status === 'ok' && Array.isArray(response.data)) {
            this.landingPages = response.data;
            console.log(this.landingPages);
          }
        },
        (error: HttpErrorResponse) => {
          this.toastService.showErrorMessage(error.statusText);
        }
      );
  }
  download(landingPage?: LandingPageModel): void {
    this.pageService.download(landingPage.content_html, landingPage.name);
  }

}
