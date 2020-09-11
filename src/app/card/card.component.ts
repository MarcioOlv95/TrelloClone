import { Component, Input, OnInit } from '@angular/core';
import { CardSchema } from "../models/cardschema";
import { CardStore } from '../models/CardStore';
import { ListSchema } from '../models/ListSchema';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  
  @Input() card: CardSchema;
  @Input() cardStore: CardStore;
  @Input() list:ListSchema;

  displayEditCard = false;
  constructor() { }

  ngOnInit(): void {
  }

  dragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  deleteCard(id: string){
    var index = this.list.cards.indexOf(id);
    this.list.cards.splice(index, 1);

    this.cardStore.deleteCard(id);
  }

  editDescription(){
    this.displayEditCard = !this.displayEditCard;
  }

}
