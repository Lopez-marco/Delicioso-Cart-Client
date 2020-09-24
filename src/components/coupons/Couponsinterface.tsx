export interface Attributes {}

export interface Attributes2 {}

export interface Attributes3 {}

export interface Child2 {
  name: string;
  attributes: Attributes3;
  children: any[];
  value: string;
}

export interface Child {
  name: string;
  attributes: Attributes2;
  children: Child2[];
  value: string;
}

export interface CouponResponse {
  name: string;
  attributes: Attributes;
  children: Child[];
  value: string;
}
