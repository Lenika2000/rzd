import { Component } from '@angular/core';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  title = 'footer';
  author = 'Маньшина Елена';
  year = 2020;
  link = 'https://github.com/Lenika2000/rzd';
  content = 'Все права защищены.';
}
