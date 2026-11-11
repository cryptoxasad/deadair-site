# DEAD AIR ($DEADAIR) — Official Website & World Lore

> *“At 00:07, a midnight radio crew picked up a transmission from a station that doesn’t exist.”*  
> **Main Slogan:** “Something’s on the frequency.”  
> **Network:** Solana  
> **Status:** PRE-LAUNCH (Zero presale, zero secret allocations)  
> **Primary Frequency:** 104.70 MHz FM  

---

## 1. Reference Site Analysis: The Catcity Site (`https://www.thecatcity.site/`)

As requested in the creative brief, the live reference site was inspected directly in Chromium desktop and mobile environments.

### What Was Observed (Direct Observation):
1. **Themed Header & Identity:** Features a prominent brand mark (“Catcity Coin / Vice City”), anchored navigation links (*The crew, The heist, The city, The score, Join*), and primary outbound links (*Dexscreener, Buy on PumpSwap, X*).
2. **Cinematic Hero Scene:** Opens with an expansive cinematic illustration (*“The big heist”* — three tabby cats in a pink convertible at night under palm trees and glowing neon Vice City skylines).
3. **Character-Driven Lore:** Introduces three distinct characters with punchy micro-copy (*The wheel* with pink shades, *The bag* throwing cash into the air, and *The nap* asleep on money bags).
4. **Cinematic Visual Cadence:** The page does not use repetitive boxy cards; it interleaves full-width widescreen narrative scenes (*“Fast water”* speedboat chase, *“Paws full of cash”* boulevard billboard) with focused reading moments.
5. **The Score (Official Slip):** Dedicated token contract card showing Name, Symbol, Chain (Solana), and Contract address (`9Uz1XmRQGjD2NspWH1FYAtVromkt74s45FXEwXpmpump`) with a 1-click **“Copy contract”** button, accompanied by a prominent security advisory: *“Match the mint with the crew's post on X before you swap.”*
6. **Step-by-Step Onboarding:** Simple 4-step onboarding flow (*Grab a wallet, Load it with SOL, Match the mint, Swap on PumpSwap*).
7. **Legal Disclaimers:** Transparent footer stating non-affiliation, risk notices, and copyright.

### Creative Distinction for DEAD AIR:
While the reference delivers a neon 80s Miami cat-heist narrative, **DEAD AIR** establishes an entirely original creative universe centered around a **noir midnight radio station broadcasting from a rainy rooftop**. Instead of crime cats, DEAD AIR introduces three original radio personalities:
- **Switch** — The smooth, enigmatic midnight host who reads anomalous distress signals live and insists everything is under control.
- **Patch** — The eccentric chief broadcast engineer who can hotwire an antenna to receive signals from space, but keeps exploding the station's espresso pot.
- **Echo** — The mysterious payphone caller who predicts the next transmission 30 seconds before it airs.

---

## 2. Project Architecture & File Map

```
dead-air-site/
├── public/
│   └── assets/
│       └── transmission_001_teaser.webm    # Encoded 12s teaser video (VP9)
├── src/
│   ├── assets/
│   │   ├── assetManifest.ts                # Full registry of all artwork, aspect ratios & alt text
│   │   └── images/
│   │       ├── hero_antenna_rooftop_*.jpg   # Wide rooftop transmission mast scene
│   │       ├── studio_interior_*.jpg        # Broadcast booth with glowing VU meters
│   │       ├── char_switch_*.jpg            # Switch character portrait
│   │       ├── char_patch_*.jpg             # Patch character portrait
│   │       ├── char_echo_*.jpg              # Echo payphone character portrait
│   │       ├── subway_tunnel_receiver_*.jpg # Underground receiver scene
│   │       └── social_banner_transmission_*.jpg # 4K social header banner
│   ├── components/
│   │   ├── brand/
│   │   │   └── Logo.tsx                     # Vector SVG logo suite (icon, wordmark, mono, avatar)
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                   # Sticky nav, status badge, audio engine toggle, mobile drawer
│   │   │   └── Footer.tsx                   # Disclaimers, socials, back-to-top, copyright
│   │   └── sections/
│   │       ├── Hero.tsx                     # Cinematic hero, headlines, CTAs, briefing box
│   │       ├── TheCrew.tsx                  # Character cards with quotes, audio cues & disclosures
│   │       ├── Transmissions.tsx            # Interactive teaser player, 3 episodes, modal lightbox
│   │       ├── TuneTheSignal.tsx            # Playable browser radio tuner mini-game with secret logs
│   │       ├── TokenSection.tsx             # The Frequency Card with Pre-Launch & Live state toggle
│   │       ├── Roadmap.tsx                  # Deliverable-driven phase roadmap
│   │       ├── MediaKitSection.tsx          # SVG downloads, chromatic palette codes, 4K banners
│   │       └── FaqSection.tsx               # 6 comprehensive safety and project FAQs
│   ├── config/
│   │   └── tokenConfig.ts                   # Central token and launch configuration (Single source of truth)
│   ├── utils/
│   │   ├── audioSynth.ts                    # Web Audio synthesizer for radio static, clicks & chimes
│   │   ├── tokenConfig.test.ts              # Unit tests for token safety & live validation
│   │   ├── tunerLogic.ts                    # Pure tuning math, signal proximity, and station data
│   │   └── tunerLogic.test.ts               # Unit tests for tuner logic & station lock thresholds
│   ├── App.tsx                              # Main root application view & scrollspy
│   ├── index.css                            # Tailwind CSS 4, dark scrollbars & motion preferences
│   └── main.tsx                             # React 19 entry point
├── index.html                               # Synced meta tags, Cinzel & JetBrains Mono fonts
├── metadata.json                            # AI Studio applet metadata
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 3. How to Run, Test, and Build

### Development Server
```bash
# Install dependencies
npm install

# Start Vite dev server on port 3000
npm run dev
```
Local URL: `http://localhost:3000`

### Run Unit Tests (Logic First)
```bash
npx --yes tsx --test src/utils/tokenConfig.test.ts src/utils/tunerLogic.test.ts
```
All 11 unit tests execute in under 500ms using Node's native test runner.

### Production Build
```bash
npm run build
```
Creates an optimized static bundle in `/dist`.

---

## 4. How to Transition from Pre-Launch to Live Mode

All launch parameters are governed by a single configuration file:
`/src/config/tokenConfig.ts`

### Pre-Launch State (Default):
```typescript
export const DEFAULT_TOKEN_CONFIG: TokenConfig = {
  launchStatus: 'pre-launch',
  mintAddress: '', // STRICTLY BLANK to prevent impostors
  urls: {
    solscan: '',
    dexscreener: '',
    tradingSwap: '',
    ...
  }
}
```

### To Transition to Live Mode:
When the token contract is deployed on Solana and verified:
1. Open `/src/config/tokenConfig.ts`.
2. Change `launchStatus: 'pre-launch'` to `launchStatus: 'live'`.
3. Fill in the confirmed Solana mint address in `mintAddress` (e.g. `9Uz1Xm...pump`).
4. Add the verified swap URL in `urls.tradingSwap` (e.g. `https://swap.pump.fun/?output=...` or Raydium).
5. Add the live market chart link in `urls.dexscreener`.
6. Save the file and rebuild (`npm run build`).

Once updated, the website automatically:
- Switches the header status badge from amber `PRE-LAUNCH` to glowing emerald `LIVE ON SOLANA`.
- Unlocks the Frequency Card, rendering the copyable verified mint button and direct swap/chart links.
- Enables safe trade links while retaining all security notices.

*Note for reviewers:* You can also test both states instantly on the live site by using the interactive **“Inspect Token State”** switcher in the Frequency Card section or visiting `http://localhost:3000/?status=live`.

---

## 5. Mini-Game Specification: "Tune The Signal"
- **Frequency Spectrum:** 87.5 MHz to 108.0 MHz FM.
- **Controls:** Standard range input slider, fine-step stepper buttons (`±0.1 MHz`, `±1.0 MHz`), or keyboard arrow keys.
- **Closeness Feedback:** Text status (`STATIC ONLY` → `FAINT RIPPLE` → `WEAK CARRIER` → `CARRIER WAVE STRONG` → `SIGNAL LOCKED`) + real-time analog VU meter needle.
- **Audio Feedback:** Real-time Web Audio bandpass static noise that clears up as you approach the carrier wave, plus a resonant chime upon frequency lock (click-to-play; muted by default).
- **Target Stations:**
  - `104.70 MHz` — The Ghost Transmission at 00:07 (Switch)
  - `88.30 MHz` — Subway Platform Receiver (Echo)
  - `96.10 MHz` — Patch’s Overheated Workbench (Patch)
  - `100.70 MHz` — Echo’s Rainy Payphone Line (Echo)
- **Save State:** Unlocked logs are preserved locally in browser `localStorage`.
- **Compliance:** 100% free; zero login, zero wallet connection, zero wager, and zero cash prize.
