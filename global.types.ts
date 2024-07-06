type WishlistRecord = {
  completed: boolean;
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
};

type ItemsRecord = {
  id: number;
  item: string;
  completed: boolean;
  rank: number;
};

export { WishlistRecord, ItemsRecord };
