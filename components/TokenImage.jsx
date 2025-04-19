import React from 'react';

export default function TokenImage({ bitcoinPrice, ethPrice, solPrice, images }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '800px',
        height: '480px',
        backgroundColor: 'white',
        padding: '30px 50px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
        <img
          src={images.bitcoin}
          width={110}
          height={110}
          alt="Bitcoin"
        />
        <span style={{ 
          marginLeft: '88px',
          fontSize: '84px',
          fontFamily: 'sans-serif',
          color: '#000000'
        }}>
          {bitcoinPrice}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
        <img
          src={images.eth}
          width={110}
          height={110}
          alt="Ethereum"
        />
        <span style={{ 
          marginLeft: '88px',
          fontSize: '84px',
          fontFamily: 'sans-serif',
          color: '#000000'
        }}>
          {ethPrice}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={images.sol}
          width={110}
          height={110}
          alt="Solana"
        />
        <span style={{ 
          marginLeft: '88px',
          fontSize: '84px',
          fontFamily: 'sans-serif',
          color: '#000000'
        }}>
          {solPrice}
        </span>
      </div>
    </div>
  );
} 