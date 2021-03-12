import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "ms-language-drop-down",
  templateUrl: "./language-drop-down.component.html",
  styleUrls: ["./language-drop-down.component.scss"],
})
export class LanguageDropDownComponent implements OnInit {
  currentLang = "en";
  selectImage = "assets/img/en.svg";

  langArray: any[] = [
    {
      img: "assets/img/en.svg",
      name: "English",
      value: "en",
    },
    {
      img: "assets/img/fr.svg",
      name: "French",
      value: "fr",
    },
    {
      img: "assets/img/he.svg",
      name: "Hebrew",
      value: "he",
    },
    {
      img: "assets/img/ru.svg",
      name: "Russian",
      value: "ru",
    },
    {
      img: "assets/img/ar.svg",
      name: "Arabic",
      value: "ar",
    },
    {
      img: "assets/img/ch.svg",
      name: "Chinese",
      value: "zh",
    },
    {
      img: "assets/img/ge.svg",
      name: "German",
      value: "de",
    },
    {
      img: "assets/img/sp.svg",
      name: "Spanish",
      value: "es",
    },
    {
      img: "assets/img/japan.jpeg",
      name: "Japanese",
      value: "ja",
    },
    {
      img: "assets/img/korean.jpg",
      name: "Korean",
      value: "ko",
    },
    {
      img: "assets/img/italian.png",
      name: "Italian",
      value: "it",
    },
    {
      img: "assets/img/hungary.png",
      name: "Hungarian",
      value: "hu",
    },
  ];

  constructor(public translate: TranslateService) {}

  ngOnInit() {}

  //setLang method is used to set the language into template.
  setLang(lang) {
    for (let data of this.langArray) {
      if (data.value == lang) {
        this.selectImage = data.img;
        break;
      }
    }
    this.translate.use(lang);
  }
}
