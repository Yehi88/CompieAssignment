import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoreService } from '../core.service';
import { GameOverDialogComponent } from './game-over-dialog/game-over-dialog.component';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  name: string;
  highlight: string;
  choiceArray: string[] = [];
  memoryArray: string[] = [];
  bestScoresArray: Array<{ name: String, score: number }> = [];
  indexOfMemoryArray: number = 0;
  score: number = 0;
  arrayOfColor: string[] = ["blue", "red", "yellow", "green", "cyan", "purple"];
  bubbleHighlightened: number = 0;
  highScore: number;
  constructor(private coreService: CoreService, public dialog: MatDialog, public router: Router) {
    this.name = coreService.name;
    this.bestScoresArray = coreService.bestScoresArray;
    if (!this.name) {
      router.navigate(["welcome"]);
    }
  }

  ngOnInit(): void {
  }

  bubbleClick(color: string) {
    this.highlight = color;
    this.choiceArray.push(color);
    if (this.choiceArray[this.choiceArray.length - 1] != this.memoryArray[this.choiceArray.length - 1]) {
      console.log("GAME OVER");
      if (this.memoryArray.length) {
        this.bestScoresArray.push({ name: this.name, score: this.score });
        this.bestScoresArray.sort(function (a, b) {
          if (a.score > b.score) {
            return -1
          }
          return 1;
        });
        this.coreService.bestScoresArray = this.bestScoresArray;
        const dialogRef = this.dialog.open(GameOverDialogComponent, {
          width: '260px'
        });

        dialogRef.afterClosed().subscribe((result: string) => {
          console.log('The dialog was closed', result);
          if (result == 'newPlayer') {
            this.coreService.name = "";
            this.router.navigate(["welcome"]);
          }

        });
      }
      this.memoryArray = [];

    } else {
      this.score += 10;
    }
    if (this.choiceArray.length == this.memoryArray.length) {
      setTimeout(() => {
        this.createRandomBubbleColorArray();
      }, 500);
    }
    setTimeout(() => {
      this.highlight = ""
    }, 200);
  }
  start() {
    this.score = 0;
    this.createRandomBubbleColorArray();
  }

  createRandomBubbleColorArray() {
    this.bubbleHighlightened++;
    this.choiceArray = [];
    let index = Math.floor(Math.random() * this.arrayOfColor.length);
    this.memoryArray.push(this.arrayOfColor[index]);
    console.log(this.memoryArray)
    this.indexOfMemoryArray = 0;
    this.myLoop();
  }
  myLoop() {
    this.highlight = this.memoryArray[this.indexOfMemoryArray];
    setTimeout(() => {
      if (this.indexOfMemoryArray < this.memoryArray.length - 1) {
        this.indexOfMemoryArray++;
        this.highlight = ""
        setTimeout(() => {
          this.myLoop();
        }, 200)
      } else if (this.indexOfMemoryArray == this.memoryArray.length - 1) {
        this.highlight = ""
      }
    }, 1000);
  }
}
