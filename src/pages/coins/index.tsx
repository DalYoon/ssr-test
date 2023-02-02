import ErrorBoundary from "@/components/ErrorBoundary";
import { Suspense, useState } from "react";
import { SWRConfig } from "swr";
import { GetStaticProps } from "next";
import * as Coins from "@/api/coins";
import CoinsList from "@/components/CoinsList";

interface IPageProps {
  fallback: {
    [key: string]: Coins.IListItem[];
  };
}

const CoinsPage = ({ fallback }: IPageProps) => {
  const [count, setCount] = useState(0);

  return (
    <ErrorBoundary fallback={<h1>Error</h1>}>
      <SWRConfig
        value={{
          fallback,
          revalidateOnReconnect: false,
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnMount: false,
          // refreshInterval: 500,
        }}
      >
        <div>
          <h1>This is PDP</h1>
          <div style={{ display: "flex" }}>
            <span>{count}</span>
            <button onClick={() => setCount((prev) => prev + 1)}>+</button>
          </div>

          <Suspense fallback={<h1>Loading...</h1>}>
            <CoinsList />
          </Suspense>
        </div>
      </SWRConfig>
    </ErrorBoundary>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  console.log("Generating '/coins' page...");
  const key = Coins.makeKey();
  try {
    const coins = await Coins.getList();
    return {
      props: {
        fallback: {
          [key]: JSON.parse(JSON.stringify(coins)),
        },
      },
    };
  } catch (err) {
    return {
      props: {
        fallback: {
          [key]: [],
        },
      },
    };
  }
};

export default CoinsPage;
