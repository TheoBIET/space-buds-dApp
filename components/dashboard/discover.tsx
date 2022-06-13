import styles from "../../styles/components/Discover.module.scss";

import { BiTrendingDown, BiTrendingUp, BiSearchAlt } from "react-icons/bi";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

export default function Discover() {
  const router = useRouter();
  const initialCoins = useMemo(
    () => ["bitcoin", "solana", "ethereum", "binancecoin"],
    []
  );
  const availablesTimeFrames = ["24h", "7d", "30d"];
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [coinsData, setCoinsData] = useState<Array<any>>([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentTimeFrame, setCurrentTimeFrame] = useState(
    availablesTimeFrames[0]
  );

  const getCoinPriceData = (coin: any) => {
    switch (currentTimeFrame) {
      case "24h":
        return coin.price_change_percentage_24h;
      case "7d":
        return coin.price_change_percentage_7d;
      case "30d":
        return coin.price_change_percentage_30d;
      default:
        return coin.price_change_percentage_24h;
    }
  };

  const formatCoinData = (data: any) => ({
    name: data.name,
    symbol: data.symbol,
    image: data.image.small,
    url: data.links.homepage[0],
    market_data: {
      current_price: {
        usd: data.market_data.current_price.usd,
        eur: data.market_data.current_price.eur,
      },
    },
    price_change_percentage_24h: parseFloat(
      data.market_data.price_change_percentage_24h
    ).toFixed(2),
    price_change_percentage_7d: parseFloat(
      data.market_data.price_change_percentage_7d
    ).toFixed(2),
    price_change_percentage_30d: parseFloat(
      data.market_data.price_change_percentage_30d
    ).toFixed(2),
  });

  useEffect(() => {
    if (coinsData.length === 0 && !isDataLoaded) {
      setIsDataLoaded(true);
      const fetchData = () => {
        const result = initialCoins.map((coin) => {
          return axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`);
        });

        Promise.all(result).then((data) => {
          const formattedData: Array<any> = data.map((coin) =>
            formatCoinData(coin.data)
          );
          setCoinsData(formattedData);
        });
      };

      fetchData();
    }
  }, [initialCoins, coinsData, isDataLoaded]);

  const searchWallet = (e: any) => {
    router.push(`/profile/${searchValue}/inventory`);
  };

  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
  }


  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          value={searchValue}
          onChange={handleInputChange}
          type="text"
          placeholder="Search anything..."
          onSubmit={searchWallet}
        />
        <BiSearchAlt onClick={searchWallet} />
      </div>
      <div className={styles.currentTrends}>
        <h3>Current Trends</h3>
        <ul className={styles.trends}>
          <li className={styles.trend}>
            <span className={styles.trendPosition}>1</span>
            <span className={styles.trendText}>Communi3</span>
            <span className={styles.trendNumber}>188k</span>
          </li>
          <li className={styles.trend}>
            <span className={styles.trendPosition}>2</span>
            <span className={styles.trendText}>Just Ape.</span>
            <span className={styles.trendNumber}>144k</span>
          </li>
          <li className={styles.trend}>
            <span className={styles.trendPosition}>3</span>
            <span className={styles.trendText}>Okay Bears</span>
            <span className={styles.trendNumber}>126k</span>
          </li>
          <li className={styles.trend}>
            <span className={styles.trendPosition}>4</span>
            <span className={styles.trendText}>Shin Sengoku</span>
            <span className={styles.trendNumber}>108k</span>
          </li>
          <li className={styles.trend}>
            <span className={styles.trendPosition}>5</span>
            <span className={styles.trendText}>DeGods</span>
            <span className={styles.trendNumber}>94k</span>
          </li>
        </ul>
        <div className={styles.more}>
          <a href="#">Explore all...</a>
        </div>
      </div>
      <div className={styles.watchlist}>
        <div className={styles.watchlistHeader}>
          <h3>Watchlist</h3>
          <div className={styles.watchlistHeaderRight}>
            {availablesTimeFrames.map((timeFrame) => (
              <div
                key={timeFrame}
                onClick={() => setCurrentTimeFrame(timeFrame)}
                className={`${styles.watchlistHeaderRightItem} ${
                  currentTimeFrame === timeFrame ? styles.active : ""
                }`}>
                {timeFrame}
              </div>
            ))}
          </div>
        </div>
        <ul className={styles.watchlistItems}>
          {coinsData.map((coin, index) => (
            <a key={index} href={coin.url} target="_blank" rel="noreferrer">
              <li className={styles.watchlistItem}>
                <div className={styles.watchlistItemLogo}>
                  <Image
                    src={coin.image}
                    alt={`${coin.name} logo`}
                    height={30}
                    width={30}
                  />
                </div>
                <div className={styles.watchlistItemName}>{coin.name}</div>
                <div className={styles.watchlistItemPct}>
                  {getCoinPriceData(coin) > 0 ? (
                    <span className={styles.green}>
                      <BiTrendingUp /> {getCoinPriceData(coin)}%
                    </span>
                  ) : (
                    <span className={styles.red}>
                      <BiTrendingDown /> {getCoinPriceData(coin)}%
                    </span>
                  )}
                </div>
              </li>
            </a>
          ))}
        </ul>
      </div>
    </div>
  );
}
