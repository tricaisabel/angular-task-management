import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTeamDialogComponent } from './manage-team-dialog.component';

describe('ManageTeamDialogComponent', () => {
  let component: ManageTeamDialogComponent;
  let fixture: ComponentFixture<ManageTeamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTeamDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
