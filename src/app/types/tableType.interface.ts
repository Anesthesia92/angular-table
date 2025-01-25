export interface TableType {
  _id: string,
  isActive: boolean,
  balance: string | number,
  picture: string,
  age: number,
  name: {
    first: string,
    last: string,
  },
  company: string,
  email: string,
  address: string,
  tags: string[],
  favoriteFruit: string,
  color?: string;
}
