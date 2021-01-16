import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiguUpAdminComponent } from './sigu-up-admin.component';

describe('SiguUpAdminComponent', () => {
  let component: SiguUpAdminComponent;
  let fixture: ComponentFixture<SiguUpAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiguUpAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiguUpAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
