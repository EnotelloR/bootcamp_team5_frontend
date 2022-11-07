export interface TServerAnswer<type> {
  status: string;
  code: number;
  result: type;
}
