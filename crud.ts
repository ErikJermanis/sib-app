import { WishlistRecord } from "./global.types";

const getRecords = async (accessToken: string) => {
  const res = await fetch("https://sib-api.erikjermanis.me/records", {
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

const modifyRecordCompleted = async (accessToken: string, completed: boolean, id: number) => {
  const res = await fetch(`https://sib-api.erikjermanis.me/records/${id}`, {
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
  const res = await fetch(`https://sib-api.erikjermanis.me/records/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.ok;
};

export { getRecords, modifyRecordCompleted, deleteRecord };
