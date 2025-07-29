import style from "./search.module.css";
import { memo, useRef, useState, useEffect, useMemo } from "react";
import { ArrowLeft, Close } from "@react-vant/icons";
import { debounce } from "@/utils";
const SearchBox = memo((props) => {
  const [query, setQuery] = useState("");
  // 夫子组件通信
  const { handleQuery } = props;
  // 非受控组件，没有绑定value，
  const queryRef = useRef(null);

  const displayStyle = query ? { display: "block" } : { display: "none" };

  // 防抖
  // 避免每次渲染都生成新的防抖函数实例： 缓存执行结果 也就是缓存函数的返回值 这里缓存的实际上是一个debounce返回函数
  const handleQueryDebounce = useMemo(() => debounce(handleQuery, 1000));
  useEffect(() => {
    handleQueryDebounce(query);
  }, [query]);

  const handleChange = () => {
    let val = queryRef.current.value;
    setQuery(val);
  };

  const clearQuery = () => {
    setQuery("");
    queryRef.current.value = "";
    queryRef.current.focus();
  };

  return (
    <div className={style.wrapper}>
      <ArrowLeft onClick={() => history.back()} />
      <input
        type="text"
        placeholder="搜索"
        className={style.ipt}
        ref={queryRef}
        onChange={handleChange}
      />
      <Close onClick={clearQuery} style={displayStyle} />
    </div>
  );
});

export default SearchBox;
export { SearchBox };
