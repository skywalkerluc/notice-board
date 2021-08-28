import { Notice } from '../domain/notice';
import { PagedResponse } from '../domain/paged-response';
import { NoticeService } from './notice.service';

let httpClientSpy: { get: jasmine.Spy };
let noticeService: NoticeService;

xdescribe('Notice Service', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    noticeService = new NoticeService(httpClientSpy as any);
  });

  it('should get all notices', (done: DoneFn) => {
    const expectedNotices: PagedResponse =
    {
      'content': [
          {
              id: 4,
              ableToView: false,
              title: 'Lucas',
              description: 'Lucas description',
              publishDate: new Date('2021-08-28T12:33:39.000+00:00'),
              viewDate: new Date('2021-08-28T14:16:59.000+00:00')
          },
          {
              id: 6,
              ableToView: false,
              title: 'Lucas',
              'description': 'Lucas descriptionw',
              'publishDate': new Date('2021-08-28T12:33:39.000+00:00'),
              'viewDate': new Date('2021-08-28T14:16:58.000+00:00')
          }
      ],
      'count': 2,
      'totalCount': 3
    };

    httpClientSpy.get.and.returnValue(expectedNotices);
    noticeService.getNotices().subscribe(
      response => {
        expect(response).toEqual(expectedNotices, 'expected notices');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  })
});
