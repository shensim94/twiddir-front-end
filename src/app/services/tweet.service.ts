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
  private defaultPageSize: number = 10;
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
    size: number = this.defaultPageSize,
    lastId?: number
  ): Observable<Pageable<ITweet>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let params = new HttpParams()
      .set('size', size.toString());
    if (lastId !== undefined) {
      params = params.set('lastId', lastId.toString());
    }
    return this.httpClient.get<Pageable<ITweet>>(this.allTweetsUrl, { headers, params });
  }

  getTweetById(id: number): Observable<ITweet> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<ITweet>(`${environment.baseUrl}/all/${id}`, {headers});
  }


  getTweetsFromUser(
    username: string,
    size: number = this.defaultPageSize,
    lastId?: number
  ): Observable<Pageable<ITweet>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let params = new HttpParams()
      .set('size', size.toString());
    if (lastId !== undefined) {
      params = params.set('lastId', lastId.toString());
    }
    return this.httpClient.get<Pageable<ITweet>>(`${environment.baseUrl}/${username}`, { headers, params });
  }

  getRepliesFromTweet(
    id: number,
    size: number = this.defaultPageSize,
    lastId?: number
  ): Observable<Pageable<ITweet>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let params = new HttpParams()
      .set('size', size.toString());
    if (lastId !== undefined) {
      params = params.set('lastId', lastId.toString());
    }
    return this.httpClient.get<Pageable<ITweet>>(`${environment.baseUrl}/all/${id}/replies`, { headers, params });
  }

  postTweet(){

  }

  replyToTweet(){

  }

}
