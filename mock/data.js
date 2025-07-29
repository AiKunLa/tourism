import Mock from "mockjs";

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
];
