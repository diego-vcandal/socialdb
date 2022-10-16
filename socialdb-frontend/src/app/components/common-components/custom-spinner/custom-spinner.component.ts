import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-custom-spinner',
    templateUrl: './custom-spinner.component.html',
    styleUrls: ['./custom-spinner.component.scss']
})
export class CustomSpinnerComponent implements OnInit {

    @Input() fullScreen: boolean;
    @Input() color: string;
    @Input() bdColor: string;

    constructor() {
        this.color = !this.color ? '#343a40' : this.color;
        this.bdColor = !this.bdColor ? '#ffffff00' : this.bdColor;
    }

    ngOnInit(): void { }

}
