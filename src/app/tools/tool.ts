/**
 * Created by 6396000843 on 2017/7/18.
 */

export class Tool {
  constructor(
    public id: number,
    public name: string,
    public img:string,
    public downloadAmount:number,
    public browser:number,
    public descriptive:string,
    public template:string,
    public author:string,
    public date:Date,
    public detailImg:string,
    public downloadUrl:string
  ) { }
}
