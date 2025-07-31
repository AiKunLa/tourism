import Mock from "mockjs";

/**
 * - 这是一个类数组对象（Array-like object），具有 length 属性
   - pageSize 决定了生成数组的长度
   - 例如当 pageSize=3 时，相当于创建了一个长度为3的空数组 [empty, empty, empty]
   第二个参数 (_, i) => ({ ... }) :

  - 这是一个映射函数，用于将类数组对象的每个元素转换为指定格式
  - 接收两个参数：
     _ ：当前元素的值（这里未使用，仅占位）
     i ：当前元素的索引（从0开始）
 */

// 模拟获取图片数据
// 创建指定长度的数组 ， 并填充数据
const getimages = (page, pageSize = 10) => {
  return Array.from({ length: pageSize }, (_, i) => ({
    id: `${page}-${i}`, // 作为索引的id
    height: Mock.Random.integer(200, 500),
    url: Mock.Random.image("300x400", Mock.Random.color(), "#fff", "img"),
  }));
};

export default [
  {
    url: "/api/getSuggestList",
    method: "get",
    timeout: 1000,
    response: (req) => {
      const keyword = req.query.keyword;
      let num = Math.floor(Math.random() * 10) + 1;

      const list = [];
      for (let i = 0; i < num; i++) {
        const listItem = Mock.mock({
          id: i,
          title: "@ctitle(5,10)",
          price: "@integer(100, 500)",
        });
        list.push(listItem);
      }
      return {
        code: 0,
        msg: "success",
        data: list,
      };
    },
  },
  {
    url: "/api/getHotList",
    method: "get",
    timeout: 1000,
    response: () => {
      return {
        code: 0,
        msg: "success",
        data: [
          {
            id: "101",
            city: "北京",
          },
          {
            id: "102",
            city: "上海",
          },
          {
            id: "103",
            city: "广州",
          },
          {
            id: "104",
            city: "深圳",
          },
          {
            id: "105",
            city: "成都",
          },
        ],
      };
    },
  },
  {
    url: "/api/detail/:id",
    method: "get",
    timeout: 1000,
    response: (req) => {
      const randomData = Mock.mock({
        title: "@ctitle(5,10)",
        price: "@integer(100, 500)",
        desc: "@cparagraph(1, 3)",
        images: [
          {
            url: "@image(300x200,@color, #fff, 主图)",
            alt: "@ctitle(5, 10)",
          },
          {
            url: "@image(300x200,@color, #fff, 风光)",
            alt: "@ctitle(5, 10)",
          },
          {
            url: "@image(300x200,@color, #fff, 细节)",
            alt: "@ctitle(5, 10)",
          },
          {
            url: "@image(300x200,@color, #fff, 环境)",
            alt: "@ctitle(5, 10)",
          },
        ],
      });
      return {
        code: 0,
        msg: "success",
        data: randomData,
      };
    },
  },
  {
    // 加载更多图片 queryString
    url: "/api/images",
    method: "get",
    timeout: 1000,
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      return {
        code: 0,
        data: getimages(page),
      };
    },
  },
];
