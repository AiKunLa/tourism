import instance from "@/api/config";

/**
 * 获取详情图片
 * @param {*} id
 * @returns
 */
export const getDetail = async (id) => {
  const res = await instance.get(`/detail/${id}`);
  return res;
};
