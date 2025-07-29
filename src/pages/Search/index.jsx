import { SearchBox } from "@/components/SearchBox";
import { useState, useCallback, memo, useEffect } from "react";
import { useSearchStore } from "@/store/useSearchStore";
import styles from "./search.module.css";

const HostList = memo((props) => {
  const { hostList } = props;
  return (
    <div className={styles.hot}>
      <h1>热门推荐</h1>
      {hostList.map((item) => {
        return <div key={item.id}>{item.city}</div>;
      })}
    </div>
  );
});

export default function Search() {
  const [query, setQuery] = useState("");
  const { suggestList, setSuggestList, hostList, setHostList } =
    useSearchStore();

  const suggestListStyle = {
    display: query == "" ? "none" : "block",
  };

  // 获取搜索建议
  const handleQuery = useCallback(async (query) => {
    console.log(query);
    setQuery(query);
    if (!query) return;
    await setSuggestList(query);
  }, []);

  // 渲染时间 获取热门搜索
  useEffect(() => {
    const getHostList = async () => {
      await setHostList();
    };
    getHostList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SearchBox handleQuery={handleQuery} />
        <HostList hostList={hostList} />
        <div className={styles.list} style={suggestListStyle}>
          {suggestList.map((item) => {
            return <div key={item.id}>{item.title}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export { Search };
