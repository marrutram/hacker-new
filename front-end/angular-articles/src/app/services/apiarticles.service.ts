import { Injectable }   from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Articles } from '../models/articles.model';
import * as _ from 'lodash';

@Injectable()
export class ApiarticlesService {

  private serviceUrl = 'http://localhost:8089/api/articles';
  private : string = null;

  constructor(private http: Http) { }

  getArticles(): Observable<Articles[]> {
    return this.http.get(this.serviceUrl).map((res: Response) => {
      let objData = res.json();
      let orderData =  _.orderBy(objData, ['created_at'], ['desc']);
      return orderData;
    })
  }

  deleteArticle(id : string) {
  	return this.http.delete(this.serviceUrl + '/' + id).map((res: Response) => res.json());
  }
}
