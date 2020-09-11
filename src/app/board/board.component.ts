import { Component, OnInit } from '@angular/core';
import { CardStore } from '../models/CardStore';
import { ListSchema } from '../models/ListSchema';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  cardStore: CardStore;
  lists: ListSchema[];

  constructor() { }

  setMockData(): void {
    this.cardStore = new CardStore();
    const lists: ListSchema[] = [
      {
        name: 'To Do',
        cards: []
      },
      {
        name: 'Doing',
        cards: []
      },
      {
        name: 'Done',
        cards: []
      }
    ]

    this.lists = lists;
  }

  ngOnInit(): void {
    this.setMockData();
  }

}