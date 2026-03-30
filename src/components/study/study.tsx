"use client";

import { useEffect, useState } from "react";
import LineChart from "./chart";
import { getCommitsByMonth } from "@/lib/api/githubApi";

export const StudyChart = () => {
  const [data, setData] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = getCommitsByMonth("ichbinmin2", "r3f_basic_study", 2024);
      // ...
      setData(await response);
    }
    fetchData();
  }, []);

  return (
    <div className=''>
      <LineChart commitOfMonth={data} />
    </div>
  );
};
