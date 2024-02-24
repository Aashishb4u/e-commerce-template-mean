import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyCarousalComponent } from './fancy-carousal.component';

describe('FancyCarousalComponent', () => {
  let component: FancyCarousalComponent;
  let fixture: ComponentFixture<FancyCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FancyCarousalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FancyCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
