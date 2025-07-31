import instance from "@/api/config";

/**
 * 获取图片列表
 * @param {*} page 页码
 * @returns 图片列表
 */
export const getImages = async (page) => {
    return await instance.get(`/images?page=${page}`)
}
