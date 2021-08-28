import { Notice } from './notice';

export interface PagedResponse {
  content: Notice[],
  count: number,
  totalCount: number
}
