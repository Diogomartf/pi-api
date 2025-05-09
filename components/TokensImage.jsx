export default function TokensImage({ bitcoinPrice, ethPrice, solPrice, images }) {
  return (
    <div tw="flex flex-col items-start w-[800px] h-[480px] bg-white py-6 px-16 text-[88px]">
      <div tw="flex items-center mb-8">
        <img
          src={images.bitcoin}
          width={110}
          height={110}
          alt="Bitcoin"
        />
        <span tw="ml-16">
          {bitcoinPrice}
        </span>
      </div>

      <div tw="flex items-center mb-8">
        <img
          src={images.eth}
          width={110}
          height={110}
          alt="Ethereum"
        />
        <span tw="ml-16">
          {ethPrice}
        </span>
      </div>

      <div tw="flex items-center">
        <img
          src={images.sol}
          width={110}
          height={110}
          alt="Solana"
        />
        <span tw="ml-16">
          {solPrice}
        </span>
      </div>
    </div>
  );
} 