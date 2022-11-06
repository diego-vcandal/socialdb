import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-post-controls',
    templateUrl: './post-controls.component.html',
    styleUrls: ['./post-controls.component.scss']
})
export class PostControlsComponent implements OnInit {

    public saved: boolean;
    public hide: boolean;
    public comentarios: number = 1523;

    constructor() { }

    ngOnInit(): void {
    }

    more() {
        console.log("more")
    }

    save() {
        this.saved = !this.saved;
        console.log("save")
    }

    share() {
        console.log("share")
    }

    comment() {
        console.log("comment")
    }

    dohide() {
        this.hide = !this.hide;
    }

}
