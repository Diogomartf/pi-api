import React from 'react';

export default function TokenImage({ bitcoinPrice, ethPrice, solPrice, images }) {
  return (
    <div tw="flex flex-col items-start w-[800px] h-[480px] bg-white p-[30px_50px]">
      <div tw="flex items-center mb-10">
        <img
          src={images.bitcoin}
          width={110}
          height={110}
          alt="Bitcoin"
          tw="w-[110px] h-[110px]"
        />
        <span tw="ml-[88px] text-[84px] font-sans text-black">
          {bitcoinPrice}
        </span>
      </div>

      <div tw="flex items-center mb-10">
        <img
          src={images.eth}
          width={110}
          height={110}
          alt="Ethereum"
          tw="w-[110px] h-[110px]"
        />
        <span tw="ml-[88px] text-[84px] font-sans text-black">
          {ethPrice}
        </span>
      </div>

      <div tw="flex items-center">
        <img
          src={images.sol}
          width={110}
          height={110}
          alt="Solana"
          tw="w-[110px] h-[110px]"
        />
        <span tw="ml-[88px] text-[84px] font-sans text-black">
          {solPrice}
        </span>
      </div>
    </div>
  );
} 