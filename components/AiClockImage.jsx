import React from 'react';

export default function AiClockImage({ aiTime = "Thirteen thirty-one, a moment's sigh, A time for dreams, as the day goes by."}) {
  return (
    <div tw="flex flex-col items-center justify-center h-full mx-auto w-[800px] h-[480px] bg-white">
      <h1 tw="font-bold px-12 text-[64px]">{aiTime}</h1>
    </div>
  );
} 