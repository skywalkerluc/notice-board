import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Notice } from './domain/notice';
import { environment } from 'src/environments/environment';
import { PagedResponse } from './domain/paged-response';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getNotices(): Observable<PagedResponse> {
    return this.http.get<PagedResponse>(`${this.apiServerUrl}/notice/all`);
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
