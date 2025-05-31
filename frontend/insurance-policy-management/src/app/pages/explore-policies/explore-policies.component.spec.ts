import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorePoliciesComponent } from './explore-policies.component';

describe('ExplorePoliciesComponent', () => {
  let component: ExplorePoliciesComponent;
  let fixture: ComponentFixture<ExplorePoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplorePoliciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorePoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
