import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import {OverlayContainer} from "@angular/cdk/overlay";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private overlay: OverlayContainer) { }

  toggleControl = new FormControl(false);

  theme: string | null = localStorage.getItem('theme');

  @HostBinding('class') className = '';

  ngOnInit(): void {
    this.toggleControl.setValue(this.theme === 'darkmode')

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkmode';
      this.className = darkMode ? darkClassName : '';

      if (darkMode) {
        localStorage.setItem('theme', 'darkmode');
        this.overlay.getContainerElement().classList.add(darkClassName);
        return;
      }
      localStorage.setItem('theme', 'lightmode');

      this.overlay.getContainerElement().classList.remove(darkClassName);
    });
  }

}
