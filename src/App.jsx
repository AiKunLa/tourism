import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { BlankLayout } from "@/components/BlankLayout";
import { Loading } from "@/components/Loading";

// 带有tabbar的Layout
const Home = lazy(() => import("@/pages/Home"));
const Trip = lazy(() => import("@/pages/Trip"));
const Collection = lazy(() => import("@/pages/Collection"));
const Discount = lazy(() => import("@/pages/Discount"));
const Account = lazy(() => import("@/pages/Account"));

// 不需要tabbar的Layout
const Login = lazy(() => import("@/pages/Login"));
const Search = lazy(() => import("@/pages/Search"));
const Detail = lazy(() => import("@/pages/Detail"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* 带有tabbar的Layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to={"/home"} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/trip" element={<Trip />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/discount" element={<Discount />} />
            <Route path="/account" element={<Account />} />
          </Route>

          {/* 不需要tabbar的Layout */}
          <Route element={<BlankLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
