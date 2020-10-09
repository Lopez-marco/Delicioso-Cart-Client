export interface Coupon2 {
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

export interface Coupon {
  coupon: Coupon2;
}

export interface MyCouponResult {
  coupon: Coupon;
}
