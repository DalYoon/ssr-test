import ErrorBoundary from "@/components/ErrorBoundary";
import { GetStaticPaths, GetStaticProps } from "next";
import { Suspense } from "react";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import * as Coins from "@/api/coins";
import CoinDetail from "@/components/CoinDetail";

interface IPageProps {
  fallback: {
    [key: string]: Coins.IListItem;
  };
}

const CoinDetailPage = ({ fallback }: IPageProps) => {
  const { query } = useRouter();
  const cid = query?.["cid"];

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
        <Suspense fallback={<h1>Loading...</h1>}>
          <div>
            <h1>This is Coin Detail Page</h1>
            {cid && <CoinDetail id={cid as string} />}
          </div>
        </Suspense>
      </SWRConfig>
    </ErrorBoundary>
  );
};

// /coins/[id]

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log(`Generating '/coins/${ctx?.params?.cid}' page...`);
  try {
    const cid = ctx?.params?.cid;
    if (typeof cid != "string") throw Error("Invalid Params");

    const key = Coins.makeKey(cid);
    const coin = await Coins.getById(cid);
    return {
      props: {
        fallback: {
          [key]: JSON.parse(JSON.stringify(coin)),
        },
      },
    };
  } catch (err) {
    return {
      props: {
        fallback: {},
      },
    };
  }
};

export default CoinDetailPage;
