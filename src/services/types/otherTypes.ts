export interface INews {
  title: string;
  text: string;
  date: string;
  image: string;
  _id: string;
}

export type TOther = {
  id: number;
  name: string;
};

export interface IOwnerCommMethods {
  id: number;
  name: string;
  value: string;
}
