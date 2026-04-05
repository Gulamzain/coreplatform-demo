// src/app/dashboard/trading/page.tsx
'use client'
import React, { useState } from 'react';
import { BiTrendingUp, BiTrendingDown, BiRefresh, BiSearch, BiStar } from 'react-icons/bi';
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';

const instruments = [
  { symbol: 'EUR/USD', bid: 1.08432, ask: 1.08435, spread: 0.3, change: 0.04, volume: 1245, favorite: true },
  { symbol: 'GBP/USD', bid: 1.27680, ask: 1.27685, spread: 0.5, change: 0.19, volume: 892, favorite: false },
  { symbol: 'USD/JPY', bid: 151.22, ask: 151.25, spread: 3.0, change: -0.12, volume: 2341, favorite: true },
  { symbol: 'XAU/USD', bid: 2341.20, ask: 2341.50, spread: 3.0, change: 0.35, volume: 567, favorite: false },
  { symbol: 'BTC/USD', bid: 68200, ask: 68250, spread: 50, change: 1.23, volume: 123, favorite: true },
  { symbol: 'NAS100', bid: 17890, ask: 17895, spread: 5, change: 0.33, volume: 456, favorite: false },
];

const openPositions = [
  { id: 1, symbol: 'EUR/USD', type: 'Buy', volume: 0.5, openPrice: 1.08432, currentPrice: 1.08945, profit: 256.50, sl: 1.08000, tp: 1.09500 },
  { id: 2, symbol: 'GBP/USD', type: 'Sell', volume: 0.3, openPrice: 1.27680, currentPrice: 1.27420, profit: 78.00, sl: 1.28000, tp: 1.27000 },
];

export default function TradingPage() {
  const [selectedSymbol, setSelectedSymbol] = useState(instruments[0]);
  const [tradeType, setTradeType] = useState('buy');
  const [volume, setVolume] = useState(0.1);
  const [sl, setSl] = useState('');
  const [tp, setTp] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInstruments = instruments.filter(i => i.symbol.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Trading Hub</h1>
          <p className="page-subtitle">Execute trades with ultra-fast execution</p>
        </div>
        <button className="refresh-btn">
          <BiRefresh size={18} /> Refresh
        </button>
      </div>

      {/* Main Trading Grid */}
      <div className="trading-grid">
        {/* Market Watch Panel */}
        <div className="market-panel">
          <div className="market-header">
            <h3>Market Watch</h3>
            <div className="search-box">
              <BiSearch size={16} />
              <input 
                type="text" 
                placeholder="Search instruments..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="instruments-list">
            {filteredInstruments.map((instrument) => (
              <div 
                key={instrument.symbol} 
                className={`instrument-item ${selectedSymbol.symbol === instrument.symbol ? 'active' : ''}`}
                onClick={() => setSelectedSymbol(instrument)}
              >
                <div>
                  <div className="instrument-symbol">
                    {instrument.symbol}
                    <BiStar className={instrument.favorite ? 'favorite' : ''} size={12} />
                  </div>
                  <div className="instrument-spread">Spread: {instrument.spread}</div>
                </div>
                <div className="instrument-prices">
                  <div>{instrument.bid}</div>
                  <div className={instrument.change >= 0 ? 'positive' : 'negative'}>
                    {instrument.change >= 0 ? <FiArrowUpRight size={12} /> : <FiArrowDownRight size={12} />}
                    {instrument.change >= 0 ? '+' : ''}{instrument.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trading Panel */}
        <div className="trading-panel">
          <div className="symbol-header">
            <div>
              <h2>{selectedSymbol.symbol}</h2>
              <div className="spread-info">Spread: {selectedSymbol.spread} pips</div>
            </div>
            <div className="current-price">
              <div className="bid-price">{selectedSymbol.bid}</div>
              <div className={selectedSymbol.change >= 0 ? 'positive' : 'negative'}>
                {selectedSymbol.change >= 0 ? <FiArrowUpRight size={14} /> : <FiArrowDownRight size={14} />}
                {selectedSymbol.change >= 0 ? '+' : ''}{selectedSymbol.change}%
              </div>
            </div>
          </div>

          {/* Trade Type Toggle */}
          <div className="trade-type-toggle">
            <button 
              className={`trade-btn buy ${tradeType === 'buy' ? 'active' : ''}`}
              onClick={() => setTradeType('buy')}
            >
              BUY
            </button>
            <button 
              className={`trade-btn sell ${tradeType === 'sell' ? 'active' : ''}`}
              onClick={() => setTradeType('sell')}
            >
              SELL
            </button>
          </div>

          {/* Trade Form */}
          <div className="trade-form">
            <div className="form-group">
              <label>Volume (lots)</label>
              <input 
                type="number" 
                value={volume} 
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                step={0.01} 
                min={0.01}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Stop Loss (optional)</label>
                <input 
                  type="number" 
                  value={sl} 
                  onChange={(e) => setSl(e.target.value)}
                  placeholder="0.00000"
                />
              </div>
              <div className="form-group">
                <label>Take Profit (optional)</label>
                <input 
                  type="number" 
                  value={tp} 
                  onChange={(e) => setTp(e.target.value)}
                  placeholder="0.00000"
                />
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="order-info">
            <div className="info-row">
              <span>Estimated Margin:</span>
              <span>${(volume * 1000).toLocaleString()}</span>
            </div>
            <div className="info-row">
              <span>Commission:</span>
              <span>${(volume * 3.5).toLocaleString()}</span>
            </div>
            <div className="info-row">
              <span>Estimated P&L (1 pip):</span>
              <span>${(volume * 10).toLocaleString()}</span>
            </div>
          </div>

          {/* Place Order Button */}
          <button className={`place-order-btn ${tradeType}`}>
            Place {tradeType === 'buy' ? 'BUY' : 'SELL'} Order
          </button>
        </div>
      </div>

      {/* Open Positions Table */}
      <div className="positions-section">
        <div className="positions-header">
          <h3>Open Positions</h3>
          <button className="close-all">Close All →</button>
        </div>
        <div className="table-wrapper">
          <table className="positions-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Type</th>
                <th>Volume</th>
                <th>Open Price</th>
                <th>Current</th>
                <th>P&L</th>
                <th>SL</th>
                <th>TP</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {openPositions.map((position) => (
                <tr key={position.id}>
                  <td className="symbol">{position.symbol}</td>
                  <td><span className={`badge ${position.type === 'Buy' ? 'badge-buy' : 'badge-sell'}`}>{position.type}</span></td>
                  <td>{position.volume}</td>
                  <td>{position.openPrice}</td>
                  <td>{position.currentPrice}</td>
                  <td className={position.profit >= 0 ? 'profit-positive' : 'profit-negative'}>
                    {position.profit >= 0 ? '+' : ''}{position.profit}
                  </td>
                  <td>{position.sl}</td>
                  <td>{position.tp}</td>
                  <td><button className="close-btn">Close</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .page-title {
          font-size: 24px;
          font-weight: 600;
          color: white;
          margin: 0;
        }

        .page-subtitle {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin: 4px 0 0;
        }

        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: none;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .refresh-btn:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .trading-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        @media (max-width: 1024px) {
          .trading-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Market Panel */
        .market-panel {
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          overflow: hidden;
        }

        .market-header {
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .market-header h3 {
          color: white;
          font-size: 16px;
          margin: 0 0 12px;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: rgba(255,255,255,0.5);
        }

        .search-box input {
          flex: 1;
          background: none;
          border: none;
          color: white;
          font-size: 13px;
          outline: none;
        }

        .instruments-list {
          max-height: 500px;
          overflow-y: auto;
        }

        .instrument-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .instrument-item:hover {
          background: rgba(255,255,255,0.05);
        }

        .instrument-item.active {
          background: rgba(63,203,27,0.1);
          border-left: 2px solid #3fcb1b;
        }

        .instrument-symbol {
          display: flex;
          align-items: center;
          gap: 6px;
          color: white;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .instrument-symbol .favorite {
          fill: #fbbf24;
          color: #fbbf24;
        }

        .instrument-spread {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
        }

        .instrument-prices {
          text-align: right;
        }

        .instrument-prices div:first-child {
          color: white;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .positive { color: #3fcb1b; }
        .negative { color: #ef4444; }

        /* Trading Panel */
        .trading-panel {
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 24px;
        }

        .symbol-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .symbol-header h2 {
          color: white;
          font-size: 24px;
          margin: 0;
        }

        .spread-info {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          margin-top: 4px;
        }

        .current-price {
          text-align: right;
        }

        .bid-price {
          font-size: 28px;
          font-weight: bold;
          color: white;
        }

        .trade-type-toggle {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .trade-btn {
          flex: 1;
          padding: 12px;
          border-radius: 10px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .trade-btn.buy {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .trade-btn.buy.active {
          background: linear-gradient(135deg, #3fcb1b, #2e9c14);
          color: black;
          box-shadow: 0 4px 12px rgba(63,203,27,0.3);
        }

        .trade-btn.sell {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .trade-btn.sell.active {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          box-shadow: 0 4px 12px rgba(239,68,68,0.3);
        }

        .trade-form {
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 6px;
        }

        .form-group input {
          width: 100%;
          padding: 10px 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: white;
          font-size: 14px;
          outline: none;
        }

        .form-group input:focus {
          border-color: #3fcb1b;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .order-info {
          background: rgba(255,255,255,0.03);
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 20px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          padding: 8px 0;
          color: rgba(255,255,255,0.6);
        }

        .info-row span:last-child {
          color: white;
          font-weight: 500;
        }

        .place-order-btn {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .place-order-btn.buy {
          background: linear-gradient(135deg, #3fcb1b, #2e9c14);
          color: black;
        }

        .place-order-btn.sell {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
        }

        .place-order-btn:hover {
          transform: translateY(-2px);
        }

        /* Positions Section */
        .positions-section {
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 24px;
        }

        .positions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .positions-header h3 {
          color: white;
          font-size: 18px;
          margin: 0;
        }

        .close-all {
          background: none;
          border: none;
          color: #3fcb1b;
          cursor: pointer;
          font-size: 13px;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .positions-table {
          width: 100%;
          border-collapse: collapse;
        }

        .positions-table th {
          text-align: left;
          padding: 12px;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
          font-size: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .positions-table td {
          padding: 12px;
          color: white;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .positions-table tr:hover {
          background: rgba(255,255,255,0.03);
        }

        .badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
        }

        .badge-buy {
          background: rgba(63,203,27,0.2);
          color: #3fcb1b;
        }

        .badge-sell {
          background: rgba(239,68,68,0.2);
          color: #ef4444;
        }

        .profit-positive { color: #3fcb1b; font-weight: 600; }
        .profit-negative { color: #ef4444; font-weight: 600; }

        .close-btn {
          padding: 4px 12px;
          border-radius: 6px;
          background: rgba(239,68,68,0.2);
          color: #ef4444;
          border: none;
          cursor: pointer;
          font-size: 11px;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(239,68,68,0.4);
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}