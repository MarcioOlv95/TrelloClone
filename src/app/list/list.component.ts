import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CardSchema } from "../models/CardSchema";
import { ListSchema } from "../models/ListSchema";
import { CardStore } from "../models/CardStore";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() list: ListSchema;
  @Input() cardStore: CardStore;
  @Input() lists: ListSchema;

  displayAddCard = false;
  constructor() { }

  toggleDisplayAddCard() {
    this.displayAddCard = !this.displayAddCard;
  }

  ngOnInit(): void {
  }

  allowDrop($event) {
    $event.preventDefault();
  }

  drop($event, value){

    $event.preventDefault();
    const data = $event.dataTransfer.getData("text");
    var id = document.getElementById(data).id;

    //remocao do id no antigo list
    value.lists.filter(item => {
      var index = item.cards.indexOf(id);
      if (index >= 0){
        item.cards.splice(index, 1);
      }
    });
    console.log("LISTS", value.lists);
    
    //adicao do id no novo list
    this.list.cards.push(id.toString());
    
  }

  onEnter(value: string) {
    const cardId = this.cardStore.newCard(value);
    this.list.cards.push(cardId);
  }
}
