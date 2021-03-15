import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailEditorComponent } from 'angular-email-editor';
import { LandingPageModel } from 'src/app/model/landing-page.model';
import { ResponseModel } from 'src/app/model/response.model';
import { DialogService } from 'src/app/service/dialog.service';
import { PageService } from 'src/app/service/page.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss']
})
export class PageDetailComponent implements OnInit {

  @ViewChild(EmailEditorComponent, { static: true })
  private emailEditor: EmailEditorComponent;

  selectedPageId: string;
  page: LandingPageModel;
  constructor(private activatedRoute: ActivatedRoute,
              private pageService: PageService,
              private toastService: ToastService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.init();
    // this.emailEditor.appearance = {theme: 'dark'};
    this.emailEditor.options = {
      appearance: {
        theme: 'dark'
      }
    };
  }
  init(): void {
    this.selectedPageId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.selectedPageId !== 'new') {
      this.pageService.getById(+this.selectedPageId)
        .subscribe(
          (response: ResponseModel<LandingPageModel>) => {
            if (response.status === 'ok' && !Array.isArray(response.data)) {
              this.page = response.data;
              this.editorLoaded(null, JSON.parse(this.page.content_json));
            }
          },
          (error: HttpErrorResponse) => {
            this.toastService.showErrorMessage(error.statusText);
          }
        );
    }
  }
  exportHtml(): void {
    // load the design json here
    this.emailEditor.editor.exportHtml((data) => {
      const message = this.selectedPageId !== 'new' ? 'Update template' : 'Create template';
      this.dialogService.openLandingPageDialog([], null, message, null, false)
        .subscribe((result: {categoryId: number, selectedFile: File, templateName: string}) => {
          if (result) {
            const body = this.createFormData(data, result, true);
            const url = this.pageService.createUrl(this.selectedPageId);
            // update
            if (this.selectedPageId !== 'new') {
              this.pageService.updatePage(url, body)
                .subscribe(
                  (response: ResponseModel<LandingPageModel>) => {
                    if (response.status === 'ok' && !Array.isArray(response.data)) {
                      this.toastService.showSuccessMessage('Updated!');
                    }
                  },
                  (error: HttpErrorResponse) => {
                    this.toastService.showErrorMessage(error.statusText);
                  }
                );
            } else {
              // create
              this.pageService.createPage(url, body)
                .subscribe(
                  (response: ResponseModel<LandingPageModel>) => {
                    if (response.status === 'ok' && !Array.isArray(response.data)) {
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
  editorLoaded($event, json?: any): void {
    if (!this.emailEditor.editor) {
      this.toastService.showErrorMessage('Internal server error!');
      return;
    }
    if (json) {
      this.emailEditor.editor.loadDesign(json, {appearance: {theme: 'dark'}});
    } else {
      this.emailEditor.editor.loadDesign();
    }
  }
  createFormData(data, result: {categoryId: number, selectedFile: File, templateName: string}, isSaveHtml = false): FormData {
    const landingPage = new FormData();
    landingPage.append('content_json', data.design ? JSON.stringify(data.design) : JSON.stringify(data));
    landingPage.append('content_html', !isSaveHtml ? null : data.html);
    landingPage.append('status', null);
    landingPage.append('image_url', result.selectedFile);
    landingPage.append('name', result.templateName);

    return landingPage;
  }

}
