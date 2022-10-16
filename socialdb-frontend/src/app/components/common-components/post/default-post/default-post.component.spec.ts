import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPostComponent } from './default-post.component';

describe('DefaultPostComponent', () => {
    let component: DefaultPostComponent;
    let fixture: ComponentFixture<DefaultPostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DefaultPostComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DefaultPostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
