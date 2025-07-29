import { instance } from "./config";

export const getSuggestList = async (keyword) => {
  return await instance.get(`/getSuggestList?keyword=${keyword}`);
};

export const getHotList = async () => {
  return await instance.get("/getHotList");
};
