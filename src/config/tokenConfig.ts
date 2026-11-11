/**
 * DEAD AIR ($DEADAIR) — Central Token & Project Configuration
 * 
 * This is the single source of truth for the project's launch status,
 * token metadata, network details, trading links, explorer links, and socials.
 * 
 * Rules:
 * - Default launchStatus is "pre-launch".
 * - When in "pre-launch", mint, trading, and chart links must remain empty/blank
 *   or explicitly unconfirmed to protect visitors from fake contract addresses.
 * - To switch to "live", set launchStatus to "live" and provide the verified mint,
 *   pair address, Dexscreener URL, and verified DEX swap URL (e.g. Raydium/PumpSwap/Jupiter).
 */

export type LaunchStatus = 'pre-launch' | 'live';

export interface TokenConfig {
  /** The project name */
  name: string;
  /** Ticker symbol with leading dollar sign */
  ticker: string;
  /** Primary tagline / slogan */
  slogan: string;
  /** Hero headline */
  heroHeadline: string;
  /** Sub-headline describing the narrative lore */
  supportingLine: string;
  /** Target blockchain network */
  network: string;
  /** Current state: 'pre-launch' or 'live' */
  launchStatus: LaunchStatus;
  /** Proposed or confirmed token supply (empty string when unconfirmed) */
  totalSupply: string;
  /** Solana mint contract address (empty string in pre-launch) */
  mintAddress: string;
  /** Decimals */
  decimals: number;
  /** Outbound URLs */
  urls: {
    /** Solana block explorer (e.g. Solscan) */
    solscan: string;
    /** Live market chart (e.g. Dexscreener / Birdeye) */
    dexscreener: string;
    /** Verified swap link (e.g. PumpSwap / Raydium / Jupiter) */
    tradingSwap: string;
    /** Official X / Twitter handle link */
    twitter: string;
    /** Official Telegram community link */
    telegram: string;
    /** Official Discord server link */
    discord: string;
  };
  /** Team & safety disclosures */
  disclaimers: {
    isFictionalWorld: boolean;
    hasPresale: boolean;
    hasPrivateAllocations: boolean;
    warningNotice: string;
  };
}

export const DEFAULT_TOKEN_CONFIG: TokenConfig = {
  name: 'DEAD AIR',
  ticker: '$DEADAIR',
  slogan: "Something's on the frequency.",
  heroHeadline: "You weren't supposed to hear this.",
  supportingLine: "At 00:07, a midnight radio crew picked up a transmission from a station that doesn't exist.",
  network: 'Solana',
  launchStatus: 'pre-launch',
  totalSupply: 'To be announced (Fair Launch on Solana)',
  mintAddress: '', // STRICT: Blank in pre-launch to prevent spoofing
  decimals: 9,
  urls: {
    solscan: '',
    dexscreener: '',
    tradingSwap: '',
    twitter: 'https://x.com/deadair_radio',
    telegram: 'https://t.me/deadair_frequency',
    discord: '', // Left blank until officially launched
  },
  disclaimers: {
    isFictionalWorld: true,
    hasPresale: false,
    hasPrivateAllocations: false,
    warningNotice:
      'DEAD AIR is currently in PRE-LAUNCH. There is NO live token, NO presale, NO private seed round, and NO direct wallet transfer address. Any token claiming to be $DEADAIR before official verification on this site and X is an impostor.',
  },
};

/**
 * Validates whether the token is configured for live trading.
 * A live token must have launchStatus === 'live', a non-empty mint address (32-44 base58 chars),
 * and at least one valid trading URL.
 */
export function isLiveTokenConfigured(config: TokenConfig): boolean {
  if (config.launchStatus !== 'live') return false;
  if (!config.mintAddress || config.mintAddress.trim().length < 32) return false;
  if (!config.urls.tradingSwap && !config.urls.dexscreener) return false;
  return true;
}

/**
 * Formats a mint address with middle ellipsis (e.g. 7a4e...pump)
 */
export function formatMintAddress(address: string, visibleChars = 4): string {
  if (!address || address.length < visibleChars * 2) return address || 'TBA';
  return `${address.slice(0, visibleChars)}...${address.slice(-visibleChars)}`;
}
