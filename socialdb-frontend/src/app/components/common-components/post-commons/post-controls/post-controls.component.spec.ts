import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostControlsComponent } from './post-controls.component';

describe('PostControlsComponent', () => {
  let component: PostControlsComponent;
  let fixture: ComponentFixture<PostControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
