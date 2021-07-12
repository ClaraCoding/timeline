import {Component, OnInit} from '@angular/core';
import {Card} from "../card";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../data.service";
import {Timeline} from "../timeline";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  timeline: Timeline | undefined;
  cardsDeck: Card[] = [];
  cardToGuess: Card | undefined;
  guessedCards: Card[] = [];
  correctAnswer: number | undefined;
  wrongAnswerMessage: String = "Wrong answer ► Please try again!!";
  wrongAnswer: boolean = false;

  dateForm = this.formBuilder.group({guessedDate: new Date()});

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private dataService: DataService,) {
  }

  ngOnInit(): void {
    // First get the id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const timelineIdFromRoute = Number(routeParams.get('timelineId'));

    // Get the deck of cards
    this.dataService.getCardsListByTimelineId(timelineIdFromRoute).subscribe(cardList => {
      //Shuffle
      this.cardsDeck = this.shuffle(cardList);
      // Pick the last card and retrieve it from the deck
      this.cardToGuess = this.cardsDeck.pop();
    });
  }

  //shuffle the deck of cards
  shuffle(cardsDeck: Card[]) {
    let m = cardsDeck.length, i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      [cardsDeck[m], cardsDeck[i]] = [cardsDeck[i], cardsDeck[m]];
    }
    return cardsDeck;
  }

  getSortedItems() {
    this.guessedCards.sort(function (card1, card2) {
      //A noter = il faut bien retransformer la date issue du json en date en précisant "new Date"!
      return new Date(card1.date).getTime() - new Date(card2.date).getTime();
    });
    return this.guessedCards;
  }

  // TODO créer une fonction/div toggle pour afficher (ou non) le wrongAnswerMessage
  displayWrongAnswer() {
    return this.wrongAnswerMessage;
  }

  isWrongAnswer() {
    return this.wrongAnswer = true;
  }

  play(cardToGuess: Card) {

    //récuperer l'input et vérifier qu'il s'agit bien de la bonne date
    const guessedDate = this.dateForm.get('guessedDate')?.value;
    console.log(guessedDate);
    const trueDate = new Date(cardToGuess.date).getUTCFullYear();
    console.log(trueDate);
    if (guessedDate === trueDate) {

      // if the card is correctly guessed, then add it to the guessedCards[]
      this.guessedCards.push(cardToGuess);
      this.getSortedItems() // TODO
      //générer une nouvelle carte à jouer ou indiquer que le timeline est fini
      if (this.cardsDeck.length > 0) {
        this.cardToGuess = this.cardsDeck.pop();
      } else {
        window.alert('Well Done, your timeline is completed!');
      }
    } else {
      this.isWrongAnswer();
      console.log(this.displayWrongAnswer());
    }
  }

}
