import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProcessesComponent } from './data-processes.component';

describe('DataProcessesComponent', () => {
  let component: DataProcessesComponent;
  let fixture: ComponentFixture<DataProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataProcessesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
