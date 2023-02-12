import { Column } from './column.model';

export class Board {
  constructor(
    public id: string,
    public name: string,
    public createdBy: string,
    public columns: Column[]
  ) {}
}
