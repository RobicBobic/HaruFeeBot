import React from "react";
import ReactDOM from "react-dom/client";
import { PrivyProvider } from "@privy-io/react-auth";
import App from "./App.jsx";

const appId = import.meta.env.VITE_PRIVY_APP_ID;
const hasPrivy = Boolean(appId);

// The site always renders. Real X login turns on only when a Privy App ID is set;
// otherwise a simulated login is used so the page is never blank.
const app = <App privyEnabled={hasPrivy} />;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {hasPrivy ? (
      <PrivyProvider
        appId={appId}
        config={{
          loginMethods: ["twitter"],
          embeddedWallets: { createOnLogin: "users-without-wallets" },
          appearance: { theme: "light", accentColor: "#c3e600" },
        }}
      >
        {app}
      </PrivyProvider>
    ) : (
      app
    )}
  </React.StrictMode>
);