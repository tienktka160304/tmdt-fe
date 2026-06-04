import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const HomeDataContext = createContext(null);
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const CACHE_KEY = "hc_homeData";
const CACHE_TTL = 5 * 60 * 1000; // 5 phút

function getCached() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch {
    return null;
  }
}

export function HomeDataProvider({ children }) {
  const cached = getCached();
  const [homeData, setHomeData] = useState(cached); // hiện cache ngay lập tức nếu có
  const [isFetching, setIsFetching] = useState(!cached);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await axios.get(`${API_ENDPOINT}home-data`);
        if (!isMounted) return;
        setHomeData(res.data);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data: res.data, ts: Date.now() }));
      } catch (err) {
        console.error("home-data error:", err);
      } finally {
        if (isMounted) setIsFetching(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, []);

  return (
    <HomeDataContext.Provider value={{ homeData, isFetching }}>
      {children}
    </HomeDataContext.Provider>
  );
}

export function useHomeData() {
  return useContext(HomeDataContext);
}