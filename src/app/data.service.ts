import {Injectable} from '@angular/core';
import {Card} from "./card";
import {HttpClient} from "@angular/common/http";
import {Timeline} from "./timeline";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // branchement sur l'API
  baseAPIUrl = "http://localhost:8080/api/";
  cardsDeckByTimeline = '/api/timeline/{tid}/card'; // il faut mettre l'ID du timeline en paramètre,
  // pour le post et le put, il faut mettre les données de la nouvelle carte/ de l'update


  constructor(private http: HttpClient) {
  }

  // Liste de cartes par Timeline => []
  getCardsListByTimelineId(timelineId: number) {
    return this.http.get<Card[]>(this.baseAPIUrl + 'timeline/'+timelineId+'/card');
  }

  getTimelineList() {
    return this.http.get<Timeline[]>(this.baseAPIUrl + 'timeline');
  }

}
