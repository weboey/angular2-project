export class Post {
  serialNum: string;
  title: string;
  subTitle: string;
  headPicture: string;
  content: string;
  attachment:string;
  author: string;
  uid:string;
  createdate: string;
  updatedate: string;
  readTimes: number;
  commentTimes: number;
  type:string;
  status:string;
}

export class PostAttach {
  constructor(
    attachName:string,
    attachDownloadUrl:string,
    articleId:string,
    attachId?:number,
    createDate?:string,
    updateDate?:string
  ) { }
}
