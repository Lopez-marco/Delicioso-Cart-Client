
export interface ListsInterface {
    id: number;
    name: string;
    items?: ShoppingListArrayInterface;
}




export interface ShoppingListInterface {
    id: number;
    item_name: string;
    quantity: number;
    bought: boolean;
    order?: number;
    shoppingListId: number;
    categoryId?: number;
}

export interface ShoppingListArrayInterface extends Array<ShoppingListInterface>{}


