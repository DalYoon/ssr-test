import * as Coins from "@/api/coins";
import { FC } from "react";

interface IProps {
  id: string;
}

const CoinDetail: FC<IProps> = ({ id }) => {
  const { name, rank } = Coins.useById(id) || {};
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>Name: {name} </span>
      <span>Rank: {rank} </span>
    </div>
  );
};

export default CoinDetail;
