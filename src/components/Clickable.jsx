import React, { useState, useEffect } from "react";
import { Alert } from "@material-ui/lab";
import { Snackbar, Button } from "@material-ui/core";
import AccessibleForwardIcon from "@material-ui/icons/AccessibleForward";
import MoneyIcon from "@material-ui/icons/Money";
import farms from "../farms.js";
import FarmButton from "./Button";
import simpbuckspends from "../simpbuckspends.js";

let multiplier = 1;

function Clickable() {
  const [clickCount, setClickCount] = useState(0);
  const [simpBucks, setSimpBucks] = useState(0);
  const [simpCounter, setSimpCounter] = useState(0);
  const [open, setOpen] = useState(false);
  const [notEnoughCookies, setNotEnoughCookies] = useState(false);
  const [farmsOwned, setFarmsOwned] = useState([]);
  const [simpMultiplier, setSimpMultiplier] = useState(0);
  // const [farmInc, setFarmInc] = useState(1);

  useEffect(() => {
    function simpBucksFunc() {
      if (simpCounter % 10 === 0 && simpCounter !== 0) {
        setSimpBucks((prevSimp) => {
          return prevSimp + 1;
        });
      }
    }
    simpBucksFunc();
  }, [simpCounter]);

  useEffect(() => {
    setFarmsOwned(farms);
  }, []);

  // useEffect(() => {
  //   if (farmsOwned.length > 0) {
  //     const currentFarms = farmsOwned;
  //     const sortedFarms = currentFarms.sort((a, b) => {
  //       return a.id > b.id ? 1 : -1;
  //     });
  //     setFarmsOwned(sortedFarms);
  //     console.log(sortedFarms);
  //   }
  // }, [farmsOwned]);

  // Todo: multiplier function w/ SimpBucks

  function multiplierFunction(simpName) {
    console.log("test");

    const multiplierFind = simpbuckspends.find(
      (simpMultiplier, idx) => simpbuckspends.name === simpName
    );
    console.log(simpbuckspends[0].multiplier);

    simpbuckspends.map((spends) => {
      return setSimpMultiplier((prevMultiplier) => {
        prevMultiplier += spends.multiplier;
      });
    });
  }
  // multiplierFunction();

  function purchaseItem(increment, spend, farmName, time) {
    if (clickCount >= spend) {
      //if purchase goes thru
      setClickCount(clickCount - spend);

      const farmFind = farmsOwned.find((farm, idx) => farm.value === farmName);
      console.log(farmFind);

      var num = (farmFind.increment *= multiplier);
      setFarmsOwned([
        //populate object

        ...farmsOwned.filter((farm) => farm.value !== farmName),
        {
          name: farmFind.name,
          amount: (farmFind.amount += 1), //amount of farms owned
          value: farmFind.value, //unique name
          increment: (farmFind.increment *= num),
          cost: (farmFind.cost *= 1.3),
          description: farmFind.description,
          id: farmFind.id,
          key: farmFind.id
        }
      ]);
      if (farmsOwned.length > 0) {
        const currentFarms = farmsOwned;
        const sortedFarms = currentFarms.sort((a, b) => {
          return a.id > b.id ? 1 : -1;
        });
        setFarmsOwned(sortedFarms);
      }

      // (event.target.getAttribute("name"))
    } else {
      //Break function - not enough currency
      setNotEnoughCookies(true);
      setOpen(true);
      return;
    }
    // setFarmInc((prevFarmInc) => prevFarmInc + increment);
    var intervalID;
    farmsOwned.map((farm) => {
      if (clickCount !== 0) {
        function update() {
          setClickCount(
            (prevCount) =>
              (prevCount +=
                0.01 * (farm.increment + 0.01) * (farm.amount + 0.01))
          );
        }
        setInterval(update, 1000 / 15);
      }
      return {};
    });
    clearInterval(intervalID);
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }
  //TODO : On every 10 ~ Clicks add + 1 SimpBucks
  return (
    <div className="container">
      <div className="simp-active">
        <img
          className="simp-coin"
          onClick={() => {
            setClickCount(clickCount + 1);
            setSimpCounter(simpCounter + 1);
          }}
          src="https://i.imgur.com/ReSKwpq.png"
          alt=""
          width="200"
        />
      </div>

      <div className="top-container">
        <p className="viewer">
          <AccessibleForwardIcon />
          Viewers: {Math.round(clickCount)}
        </p>
        <p className="simp-buck">
          <MoneyIcon />
          SimpBucks: {simpBucks}
        </p>
      </div>
      <button onClick={multiplierFunction}>Add +</button>
      <hr></hr>
      {notEnoughCookies ? (
        <div>
          <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
            <Alert severity="error" onClose={handleClose}>
              Not enough SimpCoins!
            </Alert>
          </Snackbar>
        </div>
      ) : null}
      <div style={{ padding: "1rem" }}>Shop: </div>
      {farmsOwned.map((farm) => {
        var farmCost = JSON.stringify(Math.round(farm.cost)) + " ";
        return (
          <FarmButton
            purchaseItem={purchaseItem}
            name={farm.name}
            description={farmCost + farm.description}
            currentC={farm.amount}
            value={farm.value}
            cost={farm.cost}
            key={farm.id}
            time={farm.time}
            increment={farm.increment}
          ></FarmButton>
        );
      })}
    </div>
  );
}

export default Clickable;
