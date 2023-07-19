"use client";

import styles from "@/app/page.module.css";
import { useState, useEffect } from "react";

const currencies = [
  { currency: "USD", balance: 5000 },
  { currency: "GBP", balance: 2000 },
  { currency: "EUR", balance: 3500 },
  { currency: "NGN", balance: 200000 },
];
const defaultNgnCurrency = currencies.find((item) => item.currency === "NGN");
// let temporaryCurrencies = [];

export default function ExchangeInput(props) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selectedSource, setSelectedSource] = useState(defaultNgnCurrency);
  const [selectedDest, setSelectedDest] = useState({});

  const exchangeRateHandler = async (currencyCode) => {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${currencyCode}`
    );
    const data = await response.json();
    props.exchangeEmit(data.rates);
  };

  const selectCurrencyHandler = async (currencyObj) => {
    if (props.type === "source") {
      setSelectedSource(currencyObj);
      await exchangeRateHandler(currencyObj.currency);
    } else {
      setSelectedDest(currencyObj);
    }

    setIsDropDownVisible(false);
    props.selectEmit(currencyObj);
  };

  return (
    <div className={styles.exchangeInput}>
      {/* Exchange header part */}
      <div className={styles.exchangeInputHeader}>
        {/* Currency Dropdown */}
        <div className={styles.currencyDropdownContainer}>
          <div
            className={styles.dropdownBtn}
            onClick={() => setIsDropDownVisible(!isDropDownVisible)}
          >
            {props.type === "source"
              ? `${selectedSource.currency} Wallet`
              : selectedDest.currency
              ? `${selectedDest.currency} Wallet`
              : "Convert To"}
          </div>

          {isDropDownVisible ? (
            <div className={styles.currencyDropdown}>
              {currencies.map((item, index) => (
                <p key={index} onClick={() => selectCurrencyHandler(item)}>
                  {item.currency} Wallet
                </p>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Balance */}
        <div className={styles.balance}>
          <p className={styles.headerText}>Balance</p>
          <p>
            {props.type === "source"
              ? selectedSource.balance
              : selectedDest.balance}
          </p>
        </div>
      </div>

      {/* Exchange Input form */}
      <input
        value={props.amount}
        type="text"
        placeholder="0"
        disabled={props.type === "destination"}
        onInput={(e) => props.emitInput(e.target.value)}
        className={styles.exchangeInputForm}
      />
    </div>
  );
}
