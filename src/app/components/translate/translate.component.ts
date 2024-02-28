import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  lang : string = '';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
  }

  changeLang(lang : any) {
    const selectedLanguage = lang.target.value;
    localStorage.setItem('lang',selectedLanguage);
    this.translateService.use(selectedLanguage);
  }
}
