import { Component, HostBinding, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { OverlayContainer } from "@angular/cdk/overlay";

@Component({
  selector: "app-appearance",
  templateUrl: "./appearance.component.html",
  styleUrls: ["./appearance.component.scss"]
})
export class AppearanceComponent implements OnInit {
  appearanceGroup!: FormGroup;

  darkMode: boolean = localStorage.getItem("theme") === "darkmode";

  constructor(private overlay: OverlayContainer) {
  }

  toggleControl = new FormControl(false);

  theme: string | null = localStorage.getItem("theme");

  @HostBinding("class") className = "";

  ngOnInit(): void {
    this.toggleControl.setValue(this.theme === "darkmode");

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = "darkmode";
      this.className = darkMode ? darkClassName : "";

      if (darkMode) {
        localStorage.setItem("theme", "darkmode");
        this.overlay.getContainerElement().classList.add(darkClassName);
        return;
      }
      localStorage.setItem("theme", "lightmode");

      this.overlay.getContainerElement().classList.remove(darkClassName);
    });

    this.initForm();
  }

  saveSettings(): void {
  }

  initForm(): void {
    this.appearanceGroup = new FormGroup({
      darkMode: new FormControl(this.darkMode, [Validators.required])
    });
  }
}
