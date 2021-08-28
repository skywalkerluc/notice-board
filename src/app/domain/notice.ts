export interface Notice {
  id: number;
  title: string;
  description: string;
  publishDate: Date;
  viewDate: Date;
  formattedPublishDate: string;
  formattedViewDate: string;
  ableToView: boolean;
}
