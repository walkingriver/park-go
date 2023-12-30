import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BingoCardService } from 'src/app/bingo-card.service';
import { addIcons } from 'ionicons';
import { home, refresh } from 'ionicons/icons';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.page.html',
  styleUrls: ['./bingo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class BingoPage implements OnInit {
  private route = inject(ActivatedRoute);
  private bingoCardService = inject(BingoCardService);
  parkName = '';
  bingoSquares: any[][] = [];
  bingoAchieved = false;
  alertButtons = ['OK'];

  constructor() {
    addIcons({
      home,
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
    square.selected = !square.selected;
    if (this.checkForBingo(this.bingoSquares)) {
      // Handle Bingo condition
      this.bingoAchieved = true;
      console.log('Bingo Achieved!');
    }
  }


  async resetGame() {
    this.bingoAchieved = false;
    this.bingoSquares = await this.bingoCardService.generateRandomCard();
  }

  checkForBingo(grid: any[][]): boolean {
    const gridSize = grid.length;

    // Check rows and columns
    for (let i = 0; i < gridSize; i++) {
      let rowComplete = true;
      let colComplete = true;

      for (let j = 0; j < gridSize; j++) {
        if (!grid[i][j].selected) {
          rowComplete = false;
        }
        if (!grid[j][i].selected) {
          colComplete = false;
        }
      }

      if (rowComplete || colComplete) {
        return true; // Bingo in a row or column
      }
    }

    // Check diagonals
    let diag1Complete = true;
    let diag2Complete = true;
    for (let i = 0; i < gridSize; i++) {
      if (!grid[i][i].selected) {
        diag1Complete = false;
      }
      if (!grid[i][gridSize - 1 - i].selected) {
        diag2Complete = false;
      }
    }

    return diag1Complete || diag2Complete; // Bingo in a diagonal
  }

}
