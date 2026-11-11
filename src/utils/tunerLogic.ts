/**
 * Pure logic for the "Tune the Signal" radio mini-game.
 * Decoupled from React DOM for deterministic unit testing.
 */

export interface RadioStation {
  id: string;
  frequency: number; // e.g. 104.7
  callsign: string;
  title: string;
  clue: string;
  speaker: 'Switch' | 'Patch' | 'Echo' | 'Unknown';
  transcriptSnippet: string;
  fullDispatchLog: string;
  unlockedBadge: string;
}

export const FM_MIN_FREQ = 87.5;
export const FM_MAX_FREQ = 108.0;
export const LOCK_TOLERANCE_MHZ = 0.15; // Within ±0.15 MHz counts as a locked signal

export const RADIO_STATIONS: RadioStation[] = [
  {
    id: 'station-001-main',
    frequency: 104.7,
    callsign: 'DEAD-AIR-007',
    title: 'The Ghost Transmission at 00:07',
    clue: 'Switch left a note: "Sweep the upper band around 104 to 105 MHz. When the rain gets loud, look for 104.7."',
    speaker: 'Switch',
    transcriptSnippet: '“If anyone is monitoring this channel... do not power down your equipment. The clock stopped at 00:07, but the tape is still feeding.”',
    fullDispatchLog: `[TRANSMISSION LOG // 00:07:14 UTC]
FREQUENCY: 104.7 MHz FM
OPERATOR: SWITCH (STUDIO BOOTH)
STATUS: CARRIER WAVE DETECTED // ZERO REFLECTION

SWITCH: "Testing one, two. Patch, is the red light supposed to pulse like that? It looks like a heartbeat."
PATCH: "That's not our transmitter, Switch. Our mast on the roof was unplugged ten minutes ago."
SWITCH: "Well somebody tell the listeners, because the switchboard is lighting up like a Christmas tree in a flooded basement."
ECHO (OVER PAYPHONE): "Don't hang up. The next record hasn't been pressed yet, but you're already playing track four."`,
    unlockedBadge: 'CARRIER MASTER // 104.7 MHZ',
  },
  {
    id: 'station-subway-echo',
    frequency: 88.3,
    callsign: 'SUBWAY-TUNNEL-RELAY',
    title: 'Subway Platform Receiver',
    clue: 'Far down at the low end of the dial where the damp rails buzz under 89 MHz.',
    speaker: 'Echo',
    transcriptSnippet: '“Stand behind the yellow line. Not because the express train is coming, but because the radio on the bench is listening to tomorrow.”',
    fullDispatchLog: `[UNDERGROUND RELAY // 01:14:02 UTC]
FREQUENCY: 88.3 MHz FM
LOCATION: 14th St Uptown Platform (Abandoned Bench)

ECHO: "The 12:45 uptown never arrived, but the echo did. Listen to the third turnstile click. That's not tokens. That's morse code counting down the block height on Solana."`,
    unlockedBadge: 'SUBTERRANEAN LISTENER // 88.3 MHZ',
  },
  {
    id: 'station-patch-workbench',
    frequency: 96.1,
    callsign: 'PATCH-WORKBENCH-TEST',
    title: "Patch's Overheated Workbench",
    clue: 'Mid-band harmonic around 96 MHz, right next to the smoking coffee pot.',
    speaker: 'Patch',
    transcriptSnippet: '“I replaced the diode with a copper penny and the signal jumped three decibels. Also the coffee pot is transmitting now.”',
    fullDispatchLog: `[WORKBENCH WIRE // 02:40:55 UTC]
FREQUENCY: 96.1 MHz FM
OPERATOR: PATCH (HARDWARE DEPT)

PATCH: "Switch, don't touch the fader on channel three. The solder is still soft. If you sneeze, this whole station becomes a low-orbit radar reflector."`,
    unlockedBadge: 'HARDWARE HACKER // 96.1 MHZ',
  },
  {
    id: 'station-echo-booth',
    frequency: 100.7,
    callsign: 'BOOTH-4B-PAYPHONE',
    title: "Echo's Rainy Payphone Line",
    clue: 'Dead center between 100 and 101 MHz. Listen for the sound of coins hitting an old brass chassis.',
    speaker: 'Echo',
    transcriptSnippet: '“You don’t buy a ticket for Dead Air. You just pick up the receiver when it rings in the rain.”',
    fullDispatchLog: `[STREET CALL // 03:00:12 UTC]
FREQUENCY: 100.7 MHz FM
SOURCE: PAYPHONE 4B (CORNER OF 5TH & BROADCAST)

ECHO: "They think the coin is just another dog or cat. Tell them this isn't a pet shop. This is a pirate radio tower built out of spare parts, stubborn engineers, and five thousand night owls holding the line."`,
    unlockedBadge: 'NIGHT OWL // 100.7 MHZ',
  },
];

export interface SignalFeedback {
  proximity: number; // 0 (far) to 1 (exact)
  strengthPercent: number; // 0 to 100
  statusText: string;
  isLocked: boolean;
  activeStation: RadioStation | null;
  needleOffsetDeg: number; // -45 to +45 deg for analog meter
}

/**
 * Calculates how close the current tuned frequency is to any active station.
 */
export function evaluateTuning(
  currentFreq: number,
  stations: RadioStation[] = RADIO_STATIONS
): SignalFeedback {
  let closestStation: RadioStation | null = null;
  let minDistance = Infinity;

  for (const station of stations) {
    const dist = Math.abs(currentFreq - station.frequency);
    if (dist < minDistance) {
      minDistance = dist;
      closestStation = station;
    }
  }

  if (!closestStation) {
    return {
      proximity: 0,
      strengthPercent: 0,
      statusText: 'STATIC ONLY // NO CARRIER',
      isLocked: false,
      activeStation: null,
      needleOffsetDeg: -40,
    };
  }

  // Maximum detection window is 1.5 MHz
  const detectionRadius = 1.2;
  const clampedDistance = Math.min(minDistance, detectionRadius);
  const rawProximity = 1 - clampedDistance / detectionRadius; // 0 to 1
  // Non-linear curve to simulate real radio heterodyne reception
  const proximity = Math.pow(rawProximity, 1.8);
  const strengthPercent = Math.round(proximity * 100);

  const isLocked = minDistance <= LOCK_TOLERANCE_MHZ;

  let statusText = 'STATIC ONLY // NO CARRIER';
  if (isLocked) {
    statusText = `SIGNAL LOCKED // ${closestStation.callsign}`;
  } else if (strengthPercent > 70) {
    statusText = 'CARRIER WAVE STRONG // FINE TUNE';
  } else if (strengthPercent > 40) {
    statusText = 'WEAK CARRIER DETECTED // AUDIBLE HUM';
  } else if (strengthPercent > 15) {
    statusText = 'FAINT RIPPLE IN STATIC';
  }

  // Needle deflection: -45 deg (idle/empty) to +45 deg (pegged at 100%)
  const needleOffsetDeg = -45 + (strengthPercent / 100) * 90;

  return {
    proximity,
    strengthPercent,
    statusText,
    isLocked,
    activeStation: isLocked ? closestStation : null,
    needleOffsetDeg,
  };
}

/**
 * Formats numeric frequency into FM display string (e.g., "104.70 MHz")
 */
export function formatFrequency(freq: number): string {
  return `${freq.toFixed(2)} MHz`;
}

/**
 * Clamps frequency within FM band
 */
export function clampFrequency(freq: number): number {
  return Math.min(Math.max(freq, FM_MIN_FREQ), FM_MAX_FREQ);
}
