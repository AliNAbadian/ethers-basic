import React from "react";
import WalletConnect from "./components/WalletConnect";
import TokenInfo from "./components/TokenInfo";
import TokenInfoInput from "./components/TokenInfoInput";

const App = () => {
  return (
    <main>
      <WalletConnect />
      <TokenInfo />
      <TokenInfoInput />
    </main>
  );
};

export default App;
