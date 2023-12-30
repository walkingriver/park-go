import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BingoCardService } from 'src/app/bingo-card.service';
import { addIcons } from 'ionicons';
import { refresh } from 'ionicons/icons';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.page.html',
  styleUrls: ['./bingo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BingoPage implements OnInit {
  private route = inject(ActivatedRoute);
  private bingoCardService = inject(BingoCardService);
  parkName = '';
  bingoSquares: any[][] = [];

  constructor() {
    addIcons({
      refresh
    });
  }

  async ngOnInit() {
    // Assume the data structure is suitable for direct assignment
    // You might need to transform the data based on your specific structure
    this.parkName = this.route.snapshot.params['parkName'] ?? 'MAGIC';
    this.bingoSquares = await this.bingoCardService.generateRandomCard();
  }

  toggleSquare(square: any) {
    square.selected = !square.selected; // Assuming each square object has a 'selected' property
  }

  async resetGame() {
    this.bingoSquares = await this.bingoCardService.generateRandomCard();
  }


}
