import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  name: string;
  bestScoresArray: Array<{ name: String, score: number }> = [];
  constructor() { }
}
