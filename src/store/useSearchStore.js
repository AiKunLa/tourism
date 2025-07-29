import { create } from "zustand";
import { getSuggestList, getHotList } from "@/api/search";

const useSearchStore = create((set, get) => {
  const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  return {
    searchHistory,
    suggestList: [], // 搜索建议
    hostList: [], // 热门搜索
    setSuggestList: async (keyword) => {
      const res = await getSuggestList(keyword);
      console.log("##################", res);
      set({
        suggestList: res.data,
      });
    },
    setHostList: async () => {
      const res = await getHotList();
      console.log("##################", res);
      set({
        hostList: res.data,
      });
    },
  };
});

export default useSearchStore;
export { useSearchStore };
