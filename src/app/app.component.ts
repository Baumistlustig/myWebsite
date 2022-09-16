import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from "@angular/cdk/overlay";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'Johannes Hölllwerth';

  constructor(private overlay: OverlayContainer) { }

  getDarkmode(): boolean {
    return localStorage.getItem('theme') === 'darkmode';
  }

  ngOnInit(): void {
    const darkClassName = 'darkMode';

    if (localStorage.getItem('theme') === 'darkmode') {
      this.overlay.getContainerElement().classList.add(darkClassName);
      return;
    }
    this.overlay.getContainerElement().classList.remove(darkClassName);
  }
}
