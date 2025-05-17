import React from "react";
import WalletConnect from "./components/WalletConnect";
import TokenInfo from "./components/TokenInfo";

const App = () => {
  return (
    <main>
      <WalletConnect />
      <TokenInfo />
    </main>
  );
};

export default App;
