import { useState } from "react";
import "./App.css";

/* ============================================================
   PIXEL ICONS (inline SVG, crisp-edge / blocky style)
   ============================================================ */
const INK = "#171712";
const LIME = "#c3e600";

const LogoIcon = () => (
  <svg viewBox="0 0 26 20" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="24" height="15" fill={INK} />
    <rect x="3" y="3" width="20" height="11" fill={LIME} />
    <rect x="6" y="6" width="14" height="1.5" fill={INK} />
    <rect x="6" y="9" width="9" height="1.5" fill={INK} />
    <rect x="9" y="16" width="8" height="2" fill={INK} />
    <rect x="6" y="18" width="14" height="2" fill={INK} />
  </svg>
);

const MinIcon = () => (
  <svg viewBox="0 0 15 15"><rect x="1" y="1" width="13" height="13" fill="none" stroke={INK} strokeWidth="1.5" /><rect x="4" y="10" width="7" height="1.6" fill={INK} /></svg>
);
const MaxIcon = () => (
  <svg viewBox="0 0 15 15"><rect x="1" y="1" width="13" height="13" fill="none" stroke={INK} strokeWidth="1.5" /><rect x="4" y="4" width="7" height="7" fill="none" stroke={INK} strokeWidth="1.5" /></svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 15 15"><rect x="1" y="1" width="13" height="13" fill="none" stroke={INK} strokeWidth="1.5" /><path d="M4 4 L11 11 M11 4 L4 11" stroke={INK} strokeWidth="1.6" /></svg>
);

// Window controls. onClose (if given) makes the X button actually do something.
const WinControls = ({ onClose }) => (
  <div className="win-controls">
    <button type="button" className="wc" aria-label="Minimize"><MinIcon /></button>
    <button type="button" className="wc" aria-label="Maximize"><MaxIcon /></button>
    <button type="button" className="wc" aria-label="Close" onClick={onClose}><CloseIcon /></button>
  </div>
);

const BubbleIcon = () => (
  <svg viewBox="0 0 74 74" xmlns="http://www.w3.org/2000/svg">
    <rect x="8"  y="10" width="58" height="4"  fill={INK} />
    <rect x="8"  y="42" width="58" height="4"  fill={INK} />
    <rect x="6"  y="14" width="4"  height="28" fill={INK} />
    <rect x="64" y="14" width="4"  height="28" fill={INK} />
    <rect x="10" y="14" width="54" height="28" fill={LIME} />
    <rect x="16" y="46" width="4"  height="8"  fill={INK} />
    <rect x="20" y="46" width="4"  height="4"  fill={INK} />
    <rect x="16" y="46" width="4"  height="4"  fill={LIME} />
  </svg>
);

const HandIcon = () => (
  <svg viewBox="0 0 74 74" xmlns="http://www.w3.org/2000/svg">
    <g fill={INK}>
      <rect x="28" y="8"  width="6" height="30" />
      <rect x="34" y="24" width="6" height="14" />
      <rect x="40" y="20" width="6" height="18" />
      <rect x="46" y="24" width="6" height="16" />
      <rect x="24" y="34" width="4" height="18" />
      <rect x="26" y="50" width="26" height="6" />
      <rect x="30" y="56" width="22" height="6" />
    </g>
    <g fill={LIME}>
      <rect x="30" y="14" width="2" height="22" />
      <rect x="36" y="28" width="2" height="8" />
      <rect x="42" y="24" width="2" height="12" />
      <rect x="48" y="28" width="2" height="10" />
    </g>
  </svg>
);

const CoinsIcon = () => (
  <svg viewBox="0 0 74 74" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="26" cy="30" rx="18" ry="8" fill={INK} />
    <ellipse cx="26" cy="27" rx="18" ry="8" fill={LIME} stroke={INK} strokeWidth="3" />
    <ellipse cx="48" cy="46" rx="18" ry="8" fill={INK} />
    <ellipse cx="48" cy="43" rx="18" ry="8" fill={LIME} stroke={INK} strokeWidth="3" />
    <rect x="24" y="24" width="4" height="6" fill={INK} />
    <rect x="46" y="40" width="4" height="6" fill={INK} />
  </svg>
);

const BarsIcon = () => (
  <svg viewBox="0 0 40 16"><g fill={LIME}>
    <rect x="0"  y="9"  width="5" height="7" />
    <rect x="7"  y="4"  width="5" height="12" />
    <rect x="14" y="11" width="5" height="5" />
    <rect x="21" y="2"  width="5" height="14" />
    <rect x="28" y="7"  width="5" height="9" />
    <rect x="35" y="5"  width="5" height="11" />
  </g></svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="none" stroke={INK} strokeWidth="1.6" /><path d="M5.5 10.5 L9 14 L15 6" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="square" /></svg>
);

const XIcon = () => (
  <svg viewBox="0 0 18 18" fill={INK}><path d="M13.5 1h2.6l-5.7 6.5L17 17h-5.2l-4-5.3L3 17H.4l6.1-7L1 1h5.3l3.6 4.8L13.5 1Zm-.9 14.4h1.4L5.5 2.5H4L12.6 15.4Z" /></svg>
);

/* ============================================================
   HELPERS
   ============================================================ */
const X_URL = "https://x.com/gmgnuser1";
const openExternal = (url) => window.open(url, "_blank", "noopener,noreferrer");

const shortWallet = (a) => `${a.slice(0, 6)}...${a.slice(-4)}`;

/* ============================================================
   REUSABLE PIECES
   ============================================================ */
function Terminal({ name, onClose, children }) {
  return (
    <div className="term">
      <div className="term-bar">
        <span className="term-name">{name}</span>
        <WinControls onClose={onClose} />
      </div>
      <div className="term-body">{children}</div>
    </div>
  );
}

function Step({ num, title, icon, children, terminal }) {
  return (
    <div className="step win">
      <div className="step-icon">{icon}</div>
      <div className="step-body">
        <div className="step-title"><span className="step-num">{num}.</span>{title}</div>
        <p className="step-desc">{children}</p>
      </div>
      <div className="step-term">{terminal}</div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <BarsIcon />
    </div>
  );
}

/* ============================================================
   HOME VIEW
   ============================================================ */
function HomeView({ onClaim }) {
  return (
    <>
      <div className="tags">
        <span>// ONCHAIN</span>
        <span>// GASLESS</span>
        <span>// FEES</span>
      </div>

      <h1 className="hero">TWEET. LAUNCH. EARN.</h1>

      <div className="built">
        <div>BUILT FOR X.</div>
        <div>DESIGNED FOR HARU.</div>
      </div>

      <div className="cta">
        <button className="btn btn-lime" onClick={onClaim}>CLAIM WALLET &amp; FEES</button>
        <button className="btn btn-dark" onClick={() => openExternal(X_URL)}>GO TO X &nbsp;&rarr;</button>
      </div>

      <section className="steps">
        <Step num="1" title="TWEET" icon={<BubbleIcon />}
          terminal={
            <Terminal name="TWEET.TXT">
              <span className="t-main">@HaruBot launch a token with </span>
              <span className="t-dim">name My Token and symbol MTK</span>
            </Terminal>
          }>
          Tweet a name and ticker with @HaruBot. Image and social links are optional.
        </Step>

        <Step num="2" title="LAUNCH" icon={<HandIcon />}
          terminal={
            <Terminal name="DEPLOY">
              <span className="t-main">launched, CA: 0x...000</span>
              <div className="progress">[<span className="bar">████████████</span>] 100%</div>
            </Terminal>
          }>
          We launch and pay the deploy fee for the token on haru.family for you.
        </Step>

        <Step num="3" title="EARN" icon={<CoinsIcon />}
          terminal={
            <Terminal name="WALLET">
              <span className="t-main">fees &rarr; your wallet</span>
              <div><span className="t-dim">collect: login with X</span></div>
            </Terminal>
          }>
          Specify your address or we create one associated to your X account.
        </Step>
      </section>

      <div className="stats">
        <Stat label="TOTAL LAUNCHES" value="38" />
        <Stat label="CREATORS" value="29" />
        <Stat label="FEES GENERATED" value="0 ETH" />
      </div>

      <div className="banner win">
        <CheckIcon /> INDEPENDENT SURFACE ON ROBINHOOD CHAIN <CheckIcon />
      </div>

      <div className="socials">
        <button className="social" onClick={() => openExternal(X_URL)} aria-label="X"><XIcon /></button>
      </div>
    </>
  );
}

/* ============================================================
   CLAIM VIEW — shared presentational UI
   ============================================================ */
function ClaimUI({
  ready, authenticated, handle, address, fees, claim,
  onLogin, onClaim, onLogout, onBack,
}) {
  return (
    <>
      <div className="tags">
        <span>// LOGIN</span>
        <span>// CLAIM</span>
      </div>

      <h1 className="hero">CLAIM WALLET &amp; FEES</h1>

      <div className="claim-auth">
        <Terminal name="AUTH" onClose={onBack}>
          {!ready && (
            <div className="term-line t-main">&gt; initializing<span className="blink">_</span></div>
          )}

          {ready && !authenticated && (
            <>
              <div className="term-line t-main">&gt; log in with the X account that tagged the bot.</div>
              <div className="term-line t-dim">&gt; your pre-generated wallet + fees appear here.</div>
            </>
          )}

          {ready && authenticated && (
            <>
              <div className="term-line t-main">&gt; logged in as @{handle || "user"}</div>
              <div className="term-line t-dim">
                &gt; wallet: {address ? shortWallet(address) : "creating wallet…"}
              </div>
              <div className="term-line t-main">
                &gt; claimable fees: {claim === "claimed" ? "0.0000" : fees} ETH
              </div>
              {claim === "claiming" && (
                <div className="term-line t-dim">&gt; broadcasting transaction<span className="blink">_</span></div>
              )}
              {claim === "claimed" && (
                <div className="term-line t-main">&gt; {fees} ETH sent to your wallet ✓</div>
              )}
            </>
          )}
        </Terminal>
      </div>

      <div className="cta">
        {ready && !authenticated && (
          <button className="btn btn-lime" onClick={onLogin}>LOG IN WITH X &nbsp;&rarr;</button>
        )}
        {ready && authenticated && claim === "ready" && (
          <button className="btn btn-lime" onClick={onClaim} disabled={!address}>
            CLAIM FEES &nbsp;&rarr;
          </button>
        )}
        {ready && authenticated && claim === "claiming" && (
          <button className="btn btn-lime" disabled>CLAIMING…</button>
        )}
        {ready && authenticated && claim === "claimed" && (
          <button className="btn btn-lime" disabled>CLAIMED ✓</button>
        )}

        {ready && authenticated
          ? <button className="btn btn-dark" onClick={onLogout}>LOG OUT</button>
          : <button className="btn btn-dark" onClick={onBack}>&larr; &nbsp;BACK</button>}
      </div>
    </>
  );
}

// Login + claim flow (simulated).
function ClaimViewMock({ onBack }) {
  const [status, setStatus] = useState("idle"); // idle | authed
  const [claim, setClaim] = useState("ready");
  const [wallet, setWallet] = useState(null);
  const [fees] = useState((Math.random() * 0.08 + 0.002).toFixed(4));

  const login = () => {
    const addr = "0x" + Array.from({ length: 40 },
      () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
    setWallet(addr);
    setStatus("authed");
  };
  const startClaim = () => {
    setClaim("claiming");
    setTimeout(() => setClaim("claimed"), 1200);
  };
  const logout = () => { setStatus("idle"); setClaim("ready"); setWallet(null); };

  return (
    <ClaimUI
      ready={true} authenticated={status === "authed"} handle="HaruUser"
      address={wallet} fees={fees} claim={claim}
      onLogin={login} onClaim={startClaim} onLogout={logout} onBack={onBack}
    />
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [view, setView] = useState("home");
  const ClaimView = ClaimViewMock;

  return (
    <div className="app">
      <div className="container">
        <header className="titlebar">
          <button className="titlebar-left" onClick={() => setView("home")} aria-label="Haru home">
            <img src="/logo.png" alt="Haru logo" className="titlebar-logo" /><span>HARU</span>
          </button>
          <WinControls onClose={() => setView("home")} />
        </header>

        <p className="disclaimer">
          // Independent interface for Robinhood Chain (chain ID 4663) · not
          affiliated with Robinhood Markets, Inc.
        </p>

        {view === "home"
          ? <HomeView onClaim={() => setView("claim")} />
          : <ClaimView onBack={() => setView("home")} />}
      </div>
    </div>
  );
}