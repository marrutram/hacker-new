import { Component, OnInit } from '@angular/core';
import { ApiarticlesService } from '../services/apiarticles.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {DataSource} from '@angular/cdk/collections';
import { Articles } from '../models/articles.model';
import * as moment from 'moment-timezone';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})

export class ArticlesComponent {
  dataSource : any = [];
  displayedColumns = ['title', 'created_at', 'action'];
  constructor(private apiarticlesService: ApiarticlesService) { }
  
  ngOnInit() {
    this.dataSource = [];
    this.dataSource = new ArticlesDataSource(this.apiarticlesService);
  }

  getFormatDate (article) {
    const date = _.get(article, 'created_at');
    if (!_.isUndefined(date)) {
      const yesterday = moment.utc().add(-1, 'days');
      const now = moment.utc();
      const articleDate = moment.utc(date);
      if (now.format('YYYY-MM-DD') === articleDate.format('YYYY-MM-DD')) {
        return articleDate.format('hh:mm');
      }
      if (yesterday.format('YYYY-MM-DD') === articleDate.format('YYYY-MM-DD')) {
        return 'Yesterday';
      }
      const formatDateSpecial = _.split(articleDate.format('ll'), ',', 2);
      return _.head(formatDateSpecial);
    }
    return '';
  }

  getUrl(articles) {
    if (!_.isEmpty(articles.story_url)) {
      window.open(articles.story_url);
    } else {
      if (!_.isEmpty(articles.url)) {
        window.open(articles.url);
      }
    }
  }

  getDelete(article) {
  const articleId = _.get(article, '_id');
    this.apiarticlesService.deleteArticle(articleId).subscribe(data => {
      const response = _.get(data, 'message');
      if (response === 'Successfully deleted') {
        this.dataSource = new ArticlesDataSource(this.apiarticlesService);
      }
    })
  }

}


export class ArticlesDataSource extends DataSource<any> {
  constructor(private apiarticlesService: ApiarticlesService) {
    super();
  }
  connect() : Observable<Articles[]> {
    return this.apiarticlesService.getArticles();
  }
  disconnect() {}
}
