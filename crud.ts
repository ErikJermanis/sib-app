import { ItemsRecord, WishlistRecord } from "./global.types";

const getRecords = async (accessToken: string) => {
  const res = await fetch("https://sib.erikjermanis.me/api/wishlist", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data as WishlistRecord[];
  }
  return null;
};

const createRecord = async (accessToken: string, text: string) => {
  const res = await fetch("https://sib.erikjermanis.me/api/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ text }),
  });

  return res.ok;
};

const modifyRecordCompleted = async (accessToken: string, completed: boolean, id: number) => {
  const res = await fetch(`https://sib.erikjermanis.me/api/wishlist/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ completed }),
  });
  if (res.ok) {
    const data = await res.json();
    return data as WishlistRecord;
  }
  return false;
};

const deleteRecord = async (accessToken: string, id: number) => {
  const res = await fetch(`https://sib.erikjermanis.me/api/wishlist/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.ok;
};

const getItems = async (accessToken: string) => {
  const res = await fetch("https://sib.erikjermanis.me/api/items", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data as ItemsRecord[];
  }
  return null;
};

const createItem = async (accessToken: string, item: string) => {
  const res = await fetch("https://sib.erikjermanis.me/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ item }),
  });

  return res.ok;
};

const toggleItemCompleted = async (accessToken: string, id: number, completed: boolean) => {
  const res = await fetch(`https://sib.erikjermanis.me/api/items/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ completed }),
  });
  return res.ok;
};

const deleteCompletedItems = async (accessToken: string) => {
  const res = await fetch("https://sib.erikjermanis.me/api/items", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.ok;
};

export {
  getRecords,
  createRecord,
  modifyRecordCompleted,
  deleteRecord,
  getItems,
  createItem,
  toggleItemCompleted,
  deleteCompletedItems,
};
