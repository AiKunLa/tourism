import useTitle from "@/hooks/useTitle";
import useImageStore from "@/store/useImageStore";
import { useEffect } from "react";
import Waterfall from "@/components/Waterfall";

export default function Collection() {
  useTitle("收藏");
  const { images, loading, fetchMore } = useImageStore();

  useEffect(() => {
    fetchMore();
  }, []);

  return (
    <>
      <Waterfall images={images} loading={loading} fetchMore={fetchMore} />
    </>
  );
}

export { Collection };
