import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframePostComponent } from './iframe-post.component';

describe('IframePostComponent', () => {
    let component: IframePostComponent;
    let fixture: ComponentFixture<IframePostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IframePostComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(IframePostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
