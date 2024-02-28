import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMatMenuComponent } from './dynamic-mat-menu.component';

describe('DynamicMatMenuComponent', () => {
  let component: DynamicMatMenuComponent;
  let fixture: ComponentFixture<DynamicMatMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicMatMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicMatMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
