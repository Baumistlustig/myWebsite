import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggleControl = new FormControl(false);

  theme: string | null = localStorage.getItem('theme');

  constructor() { }

  @HostBinding('class') className = '';

  ngOnInit(): void {
    this.toggleControl.setValue(this.theme === 'darkmode')

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';

      if (darkMode) {
        localStorage.setItem('theme', 'darkmode');
        return;
      }
      localStorage.setItem('theme', 'lightmode');
    });
  }

}
