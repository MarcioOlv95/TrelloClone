import { CardSchema } from "./cardschema";

export class CardStore {
    cards: CardSchema[] = []
    lastid = -1;

    _addCard(card: CardSchema) {
        card.id = String(++this.lastid);
        this.cards[card.id] = card;
        return card.id;
    }

    getCard(cardId: string) {
        var item = this.cards.filter(function(card){
            return card.id == cardId;
        })
        return item[0];
    }

    newCard(description: string): string {
        const card = new CardSchema();
        card.description = description;
        return this._addCard(card);
    }

    deleteCard(id: string){
        var item = this.cards.filter(function(card){
            return card.id == id;
        })
        var index = this.cards.indexOf(item[0]);
        this.cards.splice(index, 1);    
    }
}