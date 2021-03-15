import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailEditorComponent } from 'angular-email-editor';
import { CategoryModel } from 'src/app/model/category.model';
import { LandingPageModel } from 'src/app/model/landing-page.model';
import { ResponseModel } from 'src/app/model/response.model';
import { CategoryService } from 'src/app/service/category.service';
import { DialogService } from 'src/app/service/dialog.service';
import { LandingPageService } from 'src/app/service/landing-page.service';
import { PageService } from 'src/app/service/page.service';
import { ToastService } from 'src/app/service/toast.service';
import * as template from '../../../template/template.json';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss'],
})
export class EditorPageComponent implements OnInit {
  selectedCategoryId: string;
  selectedLandingPageId: string;
  categories: CategoryModel[];

  @ViewChild(EmailEditorComponent, { static: true })
  private emailEditor: EmailEditorComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private landingPageService: LandingPageService,
    private toastService: ToastService,
    private categoryService: CategoryService,
    private dialogService: DialogService,
    private pageService: PageService
  ) {}

  ngOnInit(): void {
    this.init();
    this.getCategories();
  }

  init(): void {
    this.selectedCategoryId = this.activatedRoute.snapshot.paramMap.get(
      'categoryId'
    );
    this.selectedLandingPageId = this.activatedRoute.snapshot.paramMap.get(
      'editorId'
    );
    if (this.selectedLandingPageId === 'new') {
      setTimeout(() => {
        this.editorLoaded(null, template[`default`]);
      }, 1000);
    } else {
      const url = this.landingPageService.createUrl(
        this.selectedCategoryId,
        this.selectedLandingPageId
      );
      this.landingPageService.getBy2Id(url).subscribe(
        (response: ResponseModel<LandingPageModel>) => {
          if (response.status === 'ok' && !Array.isArray(response.data)) {
            const body = {
              body: JSON.parse(response.data.content_json).body,
            };
            this.editorLoaded(null, body);
          }
        },
        (error: HttpErrorResponse) => {
          this.toastService.showErrorMessage(error.statusText);
        }
      );
    }
  }

  editorLoaded(event, json?: unknown): void {
    // load the design json here
    if (json) {
      if (this.emailEditor.editor) {
        this.emailEditor.editor.loadDesign(json);
      } else {
        this.toastService.showErrorMessage('Loading error!');
        return;
      }
    } else {
      this.emailEditor.editor.loadDesign(template[`default`]);
    }
  }
  // save json and html to db
  exportHtml(): void {
    this.emailEditor.editor.exportHtml((data) => {
      const message = this.selectedLandingPageId !== 'new' ? 'Update template' : 'Create template';
      this.dialogService.openLandingPageDialog(this.categories, +this.selectedCategoryId, message, true)
        .subscribe((result: {categoryId: number, selectedFile: File, templateName: string}) => {
          if (result) {

            const landingPage = this.createFormData(data, result, true);

            this.pageService.createPage(this.pageService.URL_CREATE, landingPage).subscribe(
              (response: ResponseModel<LandingPageModel>) => {
                if (response.status === 'ok' && !Array.isArray(response.data)) {
                  this.toastService.showSuccessMessage('Updated!');
                }
              },
              (error: HttpErrorResponse) => {
                this.toastService.showErrorMessage(error.statusText);
              }
            );
          }
        });
    });
  }
  // save json to db
  saveDesign(): void {
    this.emailEditor.editor.saveDesign((data) => {
      const message = this.selectedLandingPageId !== 'new' ? 'Update template' : 'Create template';
      this.dialogService.openLandingPageDialog(this.categories, +this.selectedCategoryId, message)
        .subscribe((result: {categoryId: number, selectedFile: File, templateName: string}) => {
          if (result) {

            if (this.selectedLandingPageId === 'new') {

              const landingPage = this.createFormData(data, result);
              const url = this.landingPageService.createUrl(
                result.categoryId.toString(),
                this.selectedLandingPageId
              );

              this.landingPageService.createLandingPage(url, landingPage).subscribe(
                (response: ResponseModel<LandingPageModel>) => {
                  if (
                    response.status === 'created' &&
                    !Array.isArray(response.data)
                  ) {
                    this.toastService.showSuccessMessage('Created!');
                  }
                },
                (error: HttpErrorResponse) => {
                  this.toastService.showErrorMessage(error.statusText);
                }
              );
            }
          }
        });
      });
  }

  getCategories(): void {
    this.categoryService.getList().subscribe(
      (response: ResponseModel<CategoryModel>) => {
        if (response.status === 'ok' && Array.isArray(response.data)) {
          this.categories = response.data;
        }
      },
      (error: HttpErrorResponse) => {
        this.toastService.showErrorMessage(error.statusText);
      }
    );
  }
  createFormData(data, result: {categoryId: number, selectedFile: File, templateName: string}, isSaveHtml = false): FormData {
    const landingPage = new FormData();
    landingPage.append('content_json', data.design ? JSON.stringify(data.design) : JSON.stringify(data));
    landingPage.append('content_html', !isSaveHtml ? null : data.html);
    landingPage.append('status', null);
    landingPage.append('category_id', result.categoryId.toString());
    landingPage.append('image_url', result.selectedFile);
    landingPage.append('name', result.templateName);

    return landingPage;
  }

  saveTemplate() {

  }
}
