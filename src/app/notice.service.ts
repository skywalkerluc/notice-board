import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Notice } from './notice';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getNotices(): Observable<Notice[]> {
    return this.http.get<Notice[]>(`${this.apiServerUrl}/notice/all`);
  }

  public addNotice(notice: Notice): Observable<Notice> {
    return this.http.post<Notice>(`${this.apiServerUrl}/notice/add`, notice);
  }

  public updateNotice(notice: Notice): Observable<Notice> {
    return this.http.put<Notice>(`${this.apiServerUrl}/notice/update`, notice);
  }

  public deleteNotice(noticeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/notice/delete/${noticeId}`);
  }
}
