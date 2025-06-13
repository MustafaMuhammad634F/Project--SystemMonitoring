import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiskSpacesComponent } from './disk-spaces.component';

describe('DiskSpacesComponent', () => {
  let component: DiskSpacesComponent;
  let fixture: ComponentFixture<DiskSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiskSpacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiskSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
