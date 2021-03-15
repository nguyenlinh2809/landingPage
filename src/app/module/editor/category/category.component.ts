import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from 'src/app/model/category.model';
import { LandingPageModel } from 'src/app/model/landing-page.model';
import { ResponseModel } from 'src/app/model/response.model';
import { CategoryService } from 'src/app/service/category.service';
import { LandingPageService } from 'src/app/service/landing-page.service';
import { ToastService } from 'src/app/service/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  BASE_RESOURCE_URL = environment.BASE_RESOURCE_URL;
  categories: CategoryModel[] = [];
  landingPages: LandingPageModel[] = [];
  selectedCategoryId: number;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private landingPageService: LandingPageService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  goToEditor(landingPage?: LandingPageModel): void {
    if (landingPage) {
      this.router.navigate(['../category', landingPage.category_id, 'editor-page', landingPage.id], {
        relativeTo: this.activedRoute,
      });
    } else {
      this.router.navigate(['../category', this.selectedCategoryId, 'editor-page', 'new'], {
        relativeTo: this.activedRoute,
      });
    }
  }
  getCategories(): void {
    this.categoryService.getList().subscribe(
      (response: ResponseModel<CategoryModel>) => {
        if (response.status === 'ok' && Array.isArray(response.data)) {
          this.categories = response.data;
          this.selectedCategoryId = this.categories[0].id;
          this.getLandingPagesFromCategory(this.selectedCategoryId.toString());
        }
      },
      (error: HttpErrorResponse) => {
        this.toastService.showErrorMessage(error.statusText);
      }
    );
  }
  getLandingPagesFromCategory(categoryId: string): void {
    const url = this.landingPageService.createUrl(categoryId);
    this.landingPageService.getListLandingPage(url).subscribe(
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
  onSelectCategory(): void {
    console.log(this.selectedCategoryId);
    this.getLandingPagesFromCategory(this.selectedCategoryId.toString());
  }
}
