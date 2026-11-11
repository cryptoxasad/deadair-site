/**
 * DEAD AIR Asset Manifest
 * Comprehensive registry of all visual scenes, logo variants, and audio elements.
 * Adheres to strict accessibility, contrast, and responsive aspect ratios.
 */

import heroAntennaImg from './images/hero_antenna_rooftop_1794340099729.jpg';
import studioInteriorImg from './images/studio_interior_1794340115872.jpg';
import charSwitchImg from './images/char_switch_1794340132248.jpg';
import charPatchImg from './images/char_patch_1794340154896.jpg';
import charEchoImg from './images/char_echo_1794340171443.jpg';
import subwayTunnelImg from './images/subway_tunnel_receiver_1794340186837.jpg';
import socialBannerImg from './images/social_banner_transmission_1794340203760.jpg';

export interface AssetEntry {
  id: string;
  title: string;
  src: string;
  aspectRatio: '16:9' | '1:1' | '3:1' | 'variable';
  alt: string;
  caption: string;
  usageNotes: string;
  category: 'scene' | 'character' | 'brand' | 'teaser';
}

export const ASSET_MANIFEST: Record<string, AssetEntry> = {
  heroAntenna: {
    id: 'heroAntenna',
    title: 'Station Antenna Over Rainy Metropolis',
    src: heroAntennaImg,
    aspectRatio: '16:9',
    alt: 'Midnight broadcast antenna tower on a rainy city rooftop emitting glowing cyan electromagnetic signals into the stormy night sky.',
    caption: 'Transmission Mast 01 — 104.7 MHz Relay Tower atop the Broadcast Guild building.',
    usageNotes: 'Hero background and primary banner artwork. Optimized for high-DPI displays.',
    category: 'scene',
  },
  studioInterior: {
    id: 'studioInterior',
    title: 'The Midnight Broadcast Booth',
    src: studioInteriorImg,
    aspectRatio: '16:9',
    alt: 'Vintage radio broadcast studio at midnight with glowing warm analog VU meters, spinning reel-to-reel tape machine, and rainy city window.',
    caption: 'Studio 3B — Home of the Dead Air midnight relay crew.',
    usageNotes: 'Featured background for Transmissions section and teaser player backdrop.',
    category: 'scene',
  },
  charSwitch: {
    id: 'charSwitch',
    title: 'Switch — The Midnight Host',
    src: charSwitchImg,
    aspectRatio: '1:1',
    alt: 'Portrait of Switch, the charismatic radio show host with studio monitor headphones and vintage microphone.',
    caption: 'Switch (Voice of the Void) — "Everything is under control. Probably."',
    usageNotes: 'Crew card portrait and avatar thumbnail.',
    category: 'character',
  },
  charPatch: {
    id: 'charPatch',
    title: 'Patch — The Hardware Alchemist',
    src: charPatchImg,
    aspectRatio: '1:1',
    alt: 'Portrait of Patch, the eccentric radio engineer with soldering iron, oscilloscope, and smoking espresso pot.',
    caption: 'Patch (Chief Engineer) — "I can tune an antenna to the moon, but don\'t touch the coffee pot."',
    usageNotes: 'Crew card portrait and avatar thumbnail.',
    category: 'character',
  },
  charEcho: {
    id: 'charEcho',
    title: 'Echo — The Caller From Tomorrow',
    src: charEchoImg,
    aspectRatio: '1:1',
    alt: 'Mysterious silhouette in a trench coat and fedora on a rainy phone booth holding a payphone receiver at 00:07.',
    caption: 'Echo (Unknown Caller) — "The next record hasn\'t dropped yet, but I already know the B-side."',
    usageNotes: 'Crew card portrait and avatar thumbnail.',
    category: 'character',
  },
  subwayTunnel: {
    id: 'subwayTunnel',
    title: 'The Underground Platform Receiver',
    src: subwayTunnelImg,
    aspectRatio: '16:9',
    alt: 'Damp subway tunnel with green tiled walls, empty wooden bench with a vintage portable transistor radio receiver pulsating cyan waves.',
    caption: 'Station 14th St Subway Bench — Episode 002 archive scene.',
    usageNotes: 'Transmission archive 002 scene and gallery element.',
    category: 'scene',
  },
  socialBanner: {
    id: 'socialBanner',
    title: 'Dead Air High-Voltage Transmission Banner',
    src: socialBannerImg,
    aspectRatio: '16:9',
    alt: 'Panoramic midnight rooftop view of glowing city skyline with neon LIVE AIR sign and lightning pulse transmitter.',
    caption: 'Dead Air Official Social Header Banner — 16:9 4K master.',
    usageNotes: 'Media kit downloadable header banner and gallery element.',
    category: 'brand',
  },
};
