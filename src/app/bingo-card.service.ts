import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as Chance from 'chance';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BingoCardService {
  private http = inject(HttpClient);
  attractionsUrl = 'assets/attractions/mk.json';

  async generateRandomCard(seed?: string): Promise<string[][]> {
    const chance = new Chance(); // Initialize Chance with a seed
    let selectedAttractions = await this.selectRandomAttractions(chance);
    return this.formatToBingoGrid(selectedAttractions);
  }

  private getAttractions(): Promise<string[]> {
    return firstValueFrom(this.http.get<any>(this.attractionsUrl));
  }

  private async selectRandomAttractions(chance: Chance.Chance): Promise<string[]> {
    const attractions = await this.getAttractions();
    let attractionsCopy = [...attractions];
    let selected = [];

    while (selected.length < 25) {
      let randomIndex = chance.integer({ min: 0, max: attractionsCopy.length - 1 });
      selected.push(attractionsCopy[randomIndex]);
      attractionsCopy.splice(randomIndex, 1); // Remove the selected item
    }

    return selected;
  }

  private formatToBingoGrid(selectedAttractions: string[]): any[][] {
    const grid: any[][] = [];

    for (let i = 0; i < 5; i++) {
      const row: any[] = [];
      for (let j = 0; j < 5; j++) {
        row.push(selectedAttractions[i * 5 + j]);
      }
      grid.push(row);
    }

    return grid;
  }
}
