import {Component, OnInit} from '@angular/core';
import {Card} from "../card";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../data.service";
import {Timeline} from "../timeline";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.css']
})
export class EditionComponent implements OnInit {

  cardsDeck: Card[] = [];
  timeline: Timeline | undefined;
  cardToModify: Card | undefined;


  constructor(private route: ActivatedRoute, private dataService: DataService,) {
  }

  ngOnInit(): void {
    //get the ID from current route
    const routeParams = this.route.snapshot.paramMap;
    const timelineIdFromRoute = Number(routeParams.get('timelineId'));

    // Find the timeline that correspond with the id provided in route.
    this.dataService.getTimelineList().subscribe(timelineList => {
        this.timeline = timelineList.find(timeline => timeline.id === timelineIdFromRoute);
      }
    );

    // Get the deck of cards
    this.dataService.getCardsListByTimelineId(timelineIdFromRoute).subscribe(cardList => {
      this.cardsDeck = cardList;
    });
  }

  delete(card: any) {
    window.alert('Attention, voulez-vous supprimer la carte ' + card.name + '?')
  }

  //TODO récupérer une seule carte pour la modifier
  getCardToModifyById(cardId: any) {
    this.cardToModify = this.cardsDeck.find(card => card.id === cardId);
  }
}

