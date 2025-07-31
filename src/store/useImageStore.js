import { getImages } from "@/api/home";
import { create } from "zustand";

/**
 * 图片列表状态
 */
const useImageStore = create((set, get) => ({
  images: [],
  page: 1,
  loading: false,
  fetchMore: async () => {
    // 如果还在请求中 则不请求  防止重复请求
    if (get().loading) return;
    set({ loading: true });
    try {
      const res = await getImages(get().page);
      set((state) => ({
        images: [...state.images, ...res.data],
        page: state.page + 1,
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default useImageStore;
export { useImageStore };