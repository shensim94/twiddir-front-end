import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITweet } from '../models/tweet.model';
import { Pageable } from '../models/pageable.model';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private allTweetsUrl: string = `${environment.baseUrl}/all`;
  private defaultPageNumber: number = 0;
  private defaultPageSize: number = 20;
  constructor(private httpClient: HttpClient) { }

  getUserProfile(
    username: string,
  ): Observable<IUser> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<IUser>(`${environment.baseUrl}/${username}/get`, {headers});
  }

  getAllTweets(
    page: number = this.defaultPageNumber,
    size: number = this.defaultPageSize
  ): Observable<Pageable<ITweet>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
    return this.httpClient.get<Pageable<ITweet>>(this.allTweetsUrl, { headers, params });
  }


  getTweetsFromUser(
    username: string,
    page: number = this.defaultPageNumber,
    size: number = this.defaultPageSize
  ): Observable<Pageable<ITweet>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
    return this.httpClient.get<Pageable<ITweet>>(`${environment.baseUrl}/${username}`, { headers, params });
  }

  getRepliesFromTweet(
    id: number,
    page: number = 0,
    size: number = 10
  ): Observable<Pageable<ITweet>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
    return this.httpClient.get<Pageable<ITweet>>(`${environment.baseUrl}/all/${id}/replies`, { headers, params });
  }

}
