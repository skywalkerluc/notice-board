import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Notice } from './domain/notice';
import { PagedResponse } from './domain/paged-response';
import { NoticeService } from './services/notice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public notices: Notice[] = [];
  public editNotice: any;
  public toggledNotices: Notice[] = [];
  public deleteNotice: any;

  constructor(private noticeService: NoticeService) {}

  ngOnInit() {
    this.getNotices();
  }

  public getNotices(): void {
    this.noticeService.getNotices().subscribe(
      (response: PagedResponse) => {
        const mappedResponse = response.content.map((obj) => {
          return {
            ...obj,
            ableToView: this.existsAtToggledList(obj),
            formattedPublishDate: new Date(obj.publishDate).toLocaleString(),
            formattedViewDate: new Date(obj.viewDate).toLocaleString()
          }
        });
        this.notices = mappedResponse;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public existsAtToggledList(obj: Notice): boolean {
    return this.toggledNotices.filter(elem => elem.id === obj.id).length > 0;
  }

  public onAddNotice(addForm: any): void {
    document.getElementById('add-notice-form')?.click();

    const refDate = new Date().toISOString();
    const actualNotice = {...addForm.value, publishDate: refDate, viewDate: refDate}

    this.noticeService.addNotice(actualNotice).subscribe(
      (response: Notice) => {
        this.getNotices();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    );
  }

  public onUpdateNotice(notice: Notice): void {
    this.noticeService.updateNotice(notice).subscribe(
      (response: Notice) => {
        this.getNotices();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public onDeleteNotice(noticeId: number): void {
    this.noticeService.deleteNotice(noticeId).subscribe(
      (response: void) => {
        this.getNotices();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public onOpenModal(notice: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addNoticeModal');
    }

    if (mode === 'edit') {
      this.editNotice = notice;
      button.setAttribute('data-target', '#updateNoticeModal');
    }

    if (mode === 'delete') {
      this.deleteNotice = notice;
      button.setAttribute('data-target', '#deleteNoticeModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onToggleView(notice: any): void {
    notice.ableToView = !notice.ableToView;

    if(notice.ableToView){
      const newLastViewedDate = new Date().toISOString();
      this.noticeService.updateNotice({...notice, viewDate: newLastViewedDate}).subscribe(
        (response: Notice) => {
          this.toggledNotices.push(notice);
          this.getNotices();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        },
      );
    } else {
      this.toggledNotices = this.toggledNotices.filter((obj: Notice) => notice.ableToView === true);
    }
  }
}
