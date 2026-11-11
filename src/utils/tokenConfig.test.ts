import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_TOKEN_CONFIG,
  isLiveTokenConfigured,
  formatMintAddress,
  type TokenConfig,
} from '../config/tokenConfig.ts';

test('DEFAULT_TOKEN_CONFIG starts in safe pre-launch mode with blank mint', () => {
  assert.equal(DEFAULT_TOKEN_CONFIG.launchStatus, 'pre-launch');
  assert.equal(DEFAULT_TOKEN_CONFIG.mintAddress, '');
  assert.equal(DEFAULT_TOKEN_CONFIG.network, 'Solana');
  assert.equal(DEFAULT_TOKEN_CONFIG.ticker, '$DEADAIR');
  assert.equal(DEFAULT_TOKEN_CONFIG.name, 'DEAD AIR');
  assert.equal(isLiveTokenConfigured(DEFAULT_TOKEN_CONFIG), false);
});

test('isLiveTokenConfigured returns false when in pre-launch even if mock mint is entered', () => {
  const mockConfig: TokenConfig = {
    ...DEFAULT_TOKEN_CONFIG,
    launchStatus: 'pre-launch',
    mintAddress: 'DeadAirTokenMintSolana1111111111111111111111',
    urls: {
      ...DEFAULT_TOKEN_CONFIG.urls,
      tradingSwap: 'https://swap.pump.fun/?output=test',
    },
  };
  assert.equal(isLiveTokenConfigured(mockConfig), false);
});

test('isLiveTokenConfigured requires valid 32+ char mint and trading url in live mode', () => {
  const invalidLiveConfig: TokenConfig = {
    ...DEFAULT_TOKEN_CONFIG,
    launchStatus: 'live',
    mintAddress: '',
  };
  assert.equal(isLiveTokenConfigured(invalidLiveConfig), false);

  const shortMintLiveConfig: TokenConfig = {
    ...DEFAULT_TOKEN_CONFIG,
    launchStatus: 'live',
    mintAddress: 'short_invalid_mint',
  };
  assert.equal(isLiveTokenConfigured(shortMintLiveConfig), false);

  const validLiveConfig: TokenConfig = {
    ...DEFAULT_TOKEN_CONFIG,
    launchStatus: 'live',
    mintAddress: '7a4e1180deadairsolanamint9999999999999999',
    urls: {
      ...DEFAULT_TOKEN_CONFIG.urls,
      tradingSwap: 'https://jup.ag/swap/SOL-DEADAIR',
      dexscreener: 'https://dexscreener.com/solana/deadair',
    },
  };
  assert.equal(isLiveTokenConfigured(validLiveConfig), true);
});

test('formatMintAddress formats with middle ellipsis correctly', () => {
  assert.equal(formatMintAddress(''), 'TBA');
  assert.equal(formatMintAddress('short'), 'short');
  assert.equal(
    formatMintAddress('9Uz1XmRQGjD2NspWH1FYAtVromkt74s45FXEwXpmpump', 4),
    '9Uz1...pump'
  );
});
