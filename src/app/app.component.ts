import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./layouts/navbar/navbar/navbar.component";
import { FooterComponent } from './layouts/footer/footer/footer.component';
import { NgxSpinnerComponent } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,FooterComponent,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'e-commerce';


}
