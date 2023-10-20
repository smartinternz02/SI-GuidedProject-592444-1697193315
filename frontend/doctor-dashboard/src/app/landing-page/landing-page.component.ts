import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {


  private _isLoggedIn: boolean = true; // private backing field for isLoggedIn
  get isLoggedIn() {
    return this._isLoggedIn; // return the private backing field
  }
}
