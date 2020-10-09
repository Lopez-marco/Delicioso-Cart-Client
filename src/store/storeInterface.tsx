export interface storeInterface {
    username: string;
    token: string;
    location: {lat: number, long: number};
    fave_store: any;
    isLoggedIn: boolean;
    isAdmin: boolean;
}
