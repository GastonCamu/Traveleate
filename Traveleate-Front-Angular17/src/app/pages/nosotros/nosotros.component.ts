import { Component } from '@angular/core';
import { NavComponent } from "../../layouts/nav/nav.component";
import { FooterComponent } from "../../layouts/footer/footer.component";

@Component({
    selector: 'app-nosotros',
    standalone: true,
    templateUrl: './nosotros.component.html',
    styleUrl: './nosotros.component.scss',
    imports: [NavComponent, FooterComponent]
})
export class NosotrosComponent {

}
