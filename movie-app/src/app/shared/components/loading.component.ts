import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: 'app-loading',
    imports: [CommonModule],
    template: `
        <div class="loading">
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        </div>
    `,
    styles: `
        .loading {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `
})
export class LoadingComponent { }