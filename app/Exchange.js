"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";
import ExchangeInput from "./ExchangeInput";

export default function Exchange() {
  const [sourceCurrency, setSourceCurrency] = useState({});
  const [destinationCurrency, setDestinationCurrency] = useState({});
  const [sourceAmount, setSourceAmount] = useState("0");
  const [destinationAmount, setDestinationAmount] = useState("0");
  const [exchangeRates, setExchangeRates] = useState({});

  const destinationCurrencyHandler = (currencyObj) => {
    setDestinationCurrency(currencyObj);

    if (currencyObj.currency in exchangeRates) {
      setDestinationAmount(exchangeRates[currencyObj.currency] * sourceAmount);
    }
  };

  return (
    <div className={styles.exchangeContainer}>
      {/* Exchange Side */}
      <div className={styles.exchangeSide}>
        <p>Convert from one to another currency</p>
        <ExchangeInput
          type="source"
          selectEmit={(e) => setSourceCurrency(e)}
          emitInput={(e) => setSourceAmount(e)}
          exchangeEmit={(rate) => setExchangeRates(rate)}
        />
        <ExchangeInput
          type="destination"
          amount={destinationAmount}
          selectEmit={(e) => destinationCurrencyHandler(e)}
          emitInput={(e) => setDestinationAmount(e)}
        />
        <button className={styles.btn}>Convert</button>
      </div>

      {/* Display side */}
      <div className={styles.displaySide}>
        <p>
          You're converting:{" "}
          {sourceCurrency.currency ? sourceCurrency.currency : ""}{" "}
          {sourceAmount}
        </p>
        <p>
          You'll get:{" "}
          {destinationCurrency.currency ? destinationCurrency.currency : ""}{" "}
          {destinationAmount}
        </p>
        {sourceCurrency.currency ? (
          <p>Source: {sourceCurrency.currency} Wallet</p>
        ) : (
          ""
        )}
        {destinationCurrency.currency ? (
          <p>Destination: {destinationCurrency.currency} Wallet</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
