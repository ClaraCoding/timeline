import {Component, OnInit} from '@angular/core';
import {Timeline} from "../timeline";
import {Card} from "../card";
import {DataService} from "../data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  timelines:Timeline[] =[];
  cardList: Card[] = [];


  constructor(private route: ActivatedRoute, private dataService: DataService,) {
  }


  ngOnInit(): void {
   this.dataService.getTimelineList().subscribe(timelines =>{
     this.timelines=timelines;
   });
  }

  delete(timeline: any) {
    window.alert('Attention, voulez-vous supprimer le Timeline ' + timeline.name + '?')
  }
}
