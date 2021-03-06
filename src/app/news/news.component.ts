import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FetchAlgoliaService } from '../fetch-algolia.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsData: News[] = [];
  page = 0;

  constructor(private fetchAlgolia: FetchAlgoliaService, @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.fetchAlgolia.getData(this.page).subscribe(res => {
      this.newsData = [];
      res['hits'].forEach(ele => {
        if (ele.title) {
          this.newsData.push({
            comments: ele.num_comments ? ele.num_comments : 0, votes: ele.points ? ele.points : 0,
            details: ele.title, url: ele.url ? (new URL(ele.url)).hostname : '', author: ele.author,
            created: this.formatDate(ele.created_at), id: ele.objectID
          });
        }
      });
      this.updateFromStorage();
    });
  }

  updateFromStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const hiddenNews = localStorage.getItem('hiddenNews') && JSON.parse(localStorage.getItem('hiddenNews'));
      if (hiddenNews) {
        hiddenNews.forEach(outer => this.newsData = this.newsData.filter(inner => inner.id !== outer));
      }
      const changedVotes = localStorage.getItem('objWithVotesChange') && JSON.parse(localStorage.getItem('objWithVotesChange'));
      if (changedVotes) {
        Object.keys(changedVotes).forEach(key => {
          const newsObj = this.newsData.find(news => news.id.toString() === key);
          if (newsObj) { newsObj.votes = changedVotes[key]; }
        });
      }
    }
  }

  formatDate(date: string) {
    return new Date(date).toJSON().slice(0, 10).replace(/-/g, '/');
  }

  hideElement(id: number) {
    this.newsData = this.newsData.filter(ele => ele.id !== id);
    if (isPlatformBrowser(this.platformId)) {
      const hiddenNews = localStorage.getItem('hiddenNews') ? JSON.parse(localStorage.getItem('hiddenNews')) : [];
      hiddenNews.push(id);
      localStorage.setItem('hiddenNews', JSON.stringify(hiddenNews));
    }
  }

  upvote(id: number) {
    const newsObj = this.newsData.find(ele => ele.id === id);
    newsObj.votes++;
    this.newsData = this.newsData.concat([]);
    if (isPlatformBrowser(this.platformId)) {
      const changedVotes = localStorage.getItem('objWithVotesChange') ? JSON.parse(localStorage.getItem('objWithVotesChange')) : {};
      changedVotes[id] = newsObj.votes;
      localStorage.setItem('objWithVotesChange', JSON.stringify(changedVotes));
    }
  }

}

interface News {
  comments: number;
  votes: number;
  details: string;
  url: string;
  author: string;
  created: string;
  id: number;
}
