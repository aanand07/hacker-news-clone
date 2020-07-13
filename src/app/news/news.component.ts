import { Component, OnInit } from '@angular/core';
import { FetchAlgoliaService } from '../fetch-algolia.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsData: News[] = [];
  page = 0;
  constructor(private fetchAlgolia: FetchAlgoliaService) { }

  ngOnInit() {
    this.getData(this.page);
    console.log(this.fetchAlgolia.url);
  }

  getData(page: number) {
    this.fetchAlgolia.getData(page).subscribe(res => {
      this.newsData = [];
      res['hits'].forEach(ele => {
        if (ele.title) {
        this.newsData.push({
          comments: ele.num_comments ? ele.num_comments : 0, votes: ele.points ? ele.points : 0,
          details: ele.title, url: ele.url ? (new URL(ele.url)).hostname : '', author: ele.author,
          created: this.formatDate('2017-12-14T18:13:35.000Z'),
          id: ele.objectID
        });
        }
      });
      console.log(this.newsData);
    });
  }

  formatDate(date: string) {
    return new Date(date).toJSON().slice(0, 10).replace(/-/g, '/');
  }

  hideElement(id: number) {
    this.newsData = this.newsData.filter(ele => ele.id !== id);
  }

}

interface News {
  comments: number; // num_comments
  votes: number; // points
  details: string; // title
  url: string; // url
  author: string; // . author
  created: string; // created_at
  id: number;
}
