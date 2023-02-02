import * as Coins from "@/api/coins";
import Link from "next/link";

const CoinsList = () => {
  const coins = Coins.useList();

  return (
    <>
      {coins?.map(({ id, name, rank }) => (
        <Link key={id} href={`/coins/${id}`}>
          <div>
            <span>{rank}.</span>
            <span style={{ marginLeft: 4 }}>{name}</span>
          </div>
        </Link>
      ))}
    </>
  );
};

export default CoinsList;
