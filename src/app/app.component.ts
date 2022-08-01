import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataThemeAttribute: string = 'joy';
  showButtons: boolean = false;

  constructor(public router: Router) {
    this.router.events.subscribe(res => {
      this.showButtons = this.router.url.includes('/discussion-forum')
    })
   }

  changeMode() {
    this.dataThemeAttribute = document.documentElement.getAttribute('data-theme');
    this.dataThemeAttribute = this.dataThemeAttribute === 'Default' ? 'Darkmode' : 'Default';
    document.documentElement.setAttribute('data-theme', this.dataThemeAttribute);
  }

  changeLayout(ev) {
    this.dataThemeAttribute = document.documentElement.getAttribute('layout');
    this.dataThemeAttribute = this.dataThemeAttribute === 'old' ? 'joy' : 'old';
    document.documentElement.setAttribute('layout', this.dataThemeAttribute);
  }

}
