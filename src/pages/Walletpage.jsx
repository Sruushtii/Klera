import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const WalletPage = () => {
  const [coins, setCoins] = useState(0);
  const [balance, setBalance] = useState(1000); // Initial wallet balance
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [cashAmount, setCashAmount] = useState(""); // Amount to add real cash
  const [withdrawAmount, setWithdrawAmount] = useState(""); // Amount to withdraw
  const [upiId, setUpiId] = useState(""); // UPI ID for withdrawal
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.uid);
      }
    });
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const userRef = doc(db, "user", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setCoins(data.coins || 0);
        setBalance(data.balance || 1000);
      } else {
        await setDoc(userRef, { email: user.email, coins: 0, balance: 1000 });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleAddCash = async () => {
    const cashToAdd = parseFloat(cashAmount);
    if (cashToAdd <= 0) return alert("Enter a valid amount!");
    alert(`Razorpay: ₹${cashToAdd} has been added to your wallet.`);
    try {
      const userRef = doc(db, "user", user.uid);
      await updateDoc(userRef, { balance: balance + cashToAdd });
      setBalance(balance + cashToAdd);
      setCashAmount("");
    } catch (error) {
      console.error("Error adding cash:", error);
    }
  };

  const handleAddCoins = async () => {
    const cost = parseInt(buyAmount);
    if (cost > balance) return alert("Insufficient balance!");
    try {
      const userRef = doc(db, "user", user.uid);
      await updateDoc(userRef, { coins: coins + cost, balance: balance - cost });
      setCoins(coins + cost);
      setBalance(balance - cost);
      setBuyAmount("");
      alert("Coins purchased successfully!");
    } catch (error) {
      console.error("Error buying coins:", error);
    }
  };

  const handleSellCoins = async () => {
    const coinsToSell = parseInt(sellAmount);
    if (coinsToSell > coins) return alert("Not enough coins to sell!");
    const profit = coinsToSell * 0.8;
    try {
      const userRef = doc(db, "user", user.uid);
      await updateDoc(userRef, { coins: coins - coinsToSell, balance: balance + profit });
      setCoins(coins - coinsToSell);
      setBalance(balance + profit);
      setSellAmount("");
      alert("Coins sold successfully!");
    } catch (error) {
      console.error("Error selling coins:", error);
    }
  };

  const handleWithdrawCash = async () => {
    const amountToWithdraw = parseFloat(withdrawAmount);
    if (!upiId || amountToWithdraw <= 0 || amountToWithdraw > balance) {
      return alert("Enter a valid UPI ID and valid withdrawal amount!");
    }
    alert(`₹${amountToWithdraw} has been transferred to UPI ID ${upiId}.`);
    try {
      const userRef = doc(db, "user", user.uid);
      await updateDoc(userRef, { balance: balance - amountToWithdraw });
      setBalance(balance - amountToWithdraw);
      setWithdrawAmount("");
      setUpiId("");
    } catch (error) {
      console.error("Error withdrawing cash:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-20">
      <div className="bg-gray-800 shadow-2xl rounded-2xl p-6 w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-center mb-6">Game Wallet</h1>

        <div className="flex justify-between mb-6 bg-gray-700 p-4 rounded-lg">
          <div className="text-center">
            <p className="text-gray-300">Your Coins</p>
            <p className="text-3xl font-bold text-yellow-400">{coins}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-300">Wallet Balance</p>
            <p className="text-3xl font-bold text-green-400">₹{balance}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label>Add Cash</label>
            <input
              type="number"
              placeholder="₹ Amount"
              value={cashAmount}
              onChange={(e) => setCashAmount(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleAddCash}
              className="w-full mt-2 py-2 bg-green-500 rounded hover:bg-green-600"
            >
              Add Cash
            </button>
          </div>

          <div>
            <label>Buy Coins</label>
            <input
              type="number"
              placeholder="Coins"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleAddCoins}
              className="w-full mt-2 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              Buy Coins
            </button>
          </div>

          <div>
            <label>Sell Coins</label>
            <input
              type="number"
              placeholder="Coins to Sell"
              value={sellAmount}
              onChange={(e) => setSellAmount(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-red-400"
            />
            <button
              onClick={handleSellCoins}
              className="w-full mt-2 py-2 bg-red-500 rounded hover:bg-red-600"
            >
              Sell Coins
            </button>
          </div>

          <div>
            <label>Withdraw Cash</label>
            <input
              type="number"
              placeholder="₹ Amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={handleWithdrawCash}
              className="w-full mt-2 py-2 bg-yellow-500 rounded hover:bg-yellow-600"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
