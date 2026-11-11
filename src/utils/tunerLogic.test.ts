import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateTuning,
  formatFrequency,
  clampFrequency,
  RADIO_STATIONS,
  FM_MIN_FREQ,
  FM_MAX_FREQ,
} from './tunerLogic.ts';

test('RADIO_STATIONS includes the primary 104.7 MHz 00:07 broadcast', () => {
  const station001 = RADIO_STATIONS.find((s) => s.frequency === 104.7);
  assert.ok(station001, 'Primary station 104.7 MHz must exist');
  assert.equal(station001?.speaker, 'Switch');
  assert.match(station001?.title || '', /00:07/);
});

test('evaluateTuning locks correctly when tuned to exactly 104.7 MHz', () => {
  const feedback = evaluateTuning(104.7);
  assert.equal(feedback.isLocked, true);
  assert.ok(feedback.strengthPercent >= 95);
  assert.equal(feedback.activeStation?.frequency, 104.7);
  assert.match(feedback.statusText, /SIGNAL LOCKED/);
});

test('evaluateTuning locks within tolerance (e.g. 104.75 MHz)', () => {
  const feedback = evaluateTuning(104.75);
  assert.equal(feedback.isLocked, true);
  assert.equal(feedback.activeStation?.frequency, 104.7);
});

test('evaluateTuning returns static when far away from any station', () => {
  const feedback = evaluateTuning(92.0); // No station near 92.0
  assert.equal(feedback.isLocked, false);
  assert.equal(feedback.activeStation, null);
  assert.ok(feedback.strengthPercent < 20);
  assert.match(feedback.statusText, /STATIC/);
});

test('evaluateTuning locks to Subway platform at 88.3 MHz', () => {
  const feedback = evaluateTuning(88.3);
  assert.equal(feedback.isLocked, true);
  assert.equal(feedback.activeStation?.callsign, 'SUBWAY-TUNNEL-RELAY');
});

test('clampFrequency clamps within FM broadcast bounds', () => {
  assert.equal(clampFrequency(70.0), FM_MIN_FREQ);
  assert.equal(clampFrequency(120.0), FM_MAX_FREQ);
  assert.equal(clampFrequency(101.5), 101.5);
});

test('formatFrequency outputs correct two-decimal string', () => {
  assert.equal(formatFrequency(104.7), '104.70 MHz');
  assert.equal(formatFrequency(88.35), '88.35 MHz');
});
