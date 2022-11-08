export enum Status {
  published = 'PUBLISHED',
  drafted = 'DRAFTED',
  waitingForReview = 'WAITING_FOR_REVIEW',
}

export interface GetQueryParams {
  isAsc?: boolean;
  take?:number;
  postId?:number;
  authorId?:number;
}
