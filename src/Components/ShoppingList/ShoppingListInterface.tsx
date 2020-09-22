    export interface ShoppingList {
        id: number;
        item_name: string;
        quantity: number;
        category?: String;
        bought: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }


