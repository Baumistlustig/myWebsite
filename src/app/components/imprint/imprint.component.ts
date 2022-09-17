import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit {

  disableSelect = new FormControl(false);

  languages: string[] = [
    'Deutsch', 'English (Provided by Google Translate)'
  ];

  selectedLanguage: any;

  constructor() { }

  ngOnInit(): void {
  }

}
