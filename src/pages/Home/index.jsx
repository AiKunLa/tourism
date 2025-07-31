import useTitle from "@/hooks/useTitle";
import { useEffect } from "react";
import { showToast } from "@/components/Toast/toastController";
import { Button } from "react-vant";

export default function Home() {
  useTitle("首页");
  
  useEffect(() => {
    showToast(1, 2, 3);
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export { Home };
