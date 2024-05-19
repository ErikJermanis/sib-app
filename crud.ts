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

export { getRecords };
