import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@common/s2/theme/theme.service';

@Component({
  selector: 'app-demo-component',
  templateUrl: './demo-component.component.html',
  styles: []
})
export class DemoComponentComponent implements OnInit {

  constructor(protected themeService:ThemeService) { }

  ngOnInit() {
  }

}
