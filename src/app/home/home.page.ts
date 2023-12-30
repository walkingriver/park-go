import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, RouterLink],
})
export class HomePage {
  parks = [
    {
      name: 'Magic Kingdom', image: 'assets/attractions/mk.png', href:
        'bingo/mk'
    },
  ]
  constructor() { }
}
