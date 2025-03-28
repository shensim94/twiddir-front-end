import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITweet } from '../models/tweet.model';
import { Pageable } from '../models/pageable.model';
import { IUser } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string
}

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

  getCurrentUsername(): string {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        return decodedToken.sub;
      } catch (error) {
        console.error('Error decoding token:', error);
        throw new Error('Invalid authentication token');
      }
    } else {
      throw new Error('Authentication token not found');
    }
  }

  postTweet(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Decode the JWT token to get username
    const username = this.getCurrentUsername();

    const url = `${environment.baseUrl}/${username}/add`;
    return this.httpClient.post(url, data, { headers });
  }

  replyToTweet(parentTweetId: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Decode the JWT token to get username
    const username = this.getCurrentUsername();

    // Post to: {environment.baseUrl}/{username}/{parentTweetId}
    const url = `${environment.baseUrl}/${username}/reply/${parentTweetId}`;
    
    return this.httpClient.post(url, data, { headers });
  }

}
