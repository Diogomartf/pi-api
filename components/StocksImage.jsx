import { formatPrice } from "../lib/utils";

export default function StocksImage({ stocks }) {
  const imgUrl = (ticker) =>
    `https://img.logo.dev/ticker/${ticker}?token=pk_JP3xoTJtQSeTrDFJQMFWSA`;

  return (
    <div tw="flex flex-col items-start w-[800px] h-[480px] bg-white p-5">
      {stocks.map((stock, index) => (
        <div
          key={stock.id || index}
          tw="flex items-center justify-between w-full mb-8"
        >
          <div tw="flex">
            <img
              src={imgUrl(stock.ticker)}
              width={110}
              height={110}
              alt="stock logo"
            />
            <div tw="flex flex-col">
              <span
                tw="ml-3 text-[42px] max-w-[392px]"
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {stock.name}
              </span>
              <span tw="ml-3 text-[40px] text-gray-600">{stock.ticker}</span>
            </div>
          </div>
          <div tw="flex flex-col items-end">
            <span tw="text-[50px]">{formatPrice(stock.price.c)}</span>
            <span
              tw={`text-[37px] ${
                stock.price.todaysChangePerc >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {stock.price.todaysChangePerc >= 0 ? "+" : ""}
              {stock.price.todaysChangePerc.toFixed(2)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
