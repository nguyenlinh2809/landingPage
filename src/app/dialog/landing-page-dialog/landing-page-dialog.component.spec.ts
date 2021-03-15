import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageDialogComponent } from './landing-page-dialog.component';

describe('LandingPageDialogComponent', () => {
  let component: LandingPageDialogComponent;
  let fixture: ComponentFixture<LandingPageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
