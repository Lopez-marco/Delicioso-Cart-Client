export interface Item {
  couponid: string[];
  link: string[];
  description: string[];
  image: string[];
  activedate: string[];
  shutoff: string[];
  expiration: string[];
  majorCategory: string[];
  minorCategory: string[];
  brand: string[];
  value: string[];
  geotarget: string[];
}

export interface Coupons {
  item: Item[];
}

export interface CouponsResponse {
  coupons: Coupons;
}
