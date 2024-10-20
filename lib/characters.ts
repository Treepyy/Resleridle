import { Character } from './types'

import attackerImg from '@/public/images/roles/attacker.png'
import breakerImg from '@/public/images/roles/breaker.png'
import defenderImg from '@/public/images/roles/defender.png'
import supporterImg from '@/public/images/roles/supporter.png'

import fireImg from '@/public/images/elements/fire.png'
import windImg from '@/public/images/elements/wind.png'
import iceImg from '@/public/images/elements/ice.png'
import boltImg from '@/public/images/elements/bolt.png'
import stabImg from '@/public/images/elements/stab.png'
import strikeImg from '@/public/images/elements/strike.png'
import slashImg from '@/public/images/elements/slash.png'

export const roleImages = {
  "Attacker": attackerImg,
  "Breaker": breakerImg,
  "Defender": defenderImg,
  "Supporter": supporterImg,
}

export const elementImages = {
  "Fire": fireImg,
  "Wind": windImg,
  "Ice": iceImg,
  "Bolt": boltImg,
  "Stab": stabImg,
  "Strike": strikeImg,
  "Slash": slashImg,
}

export const originalCharacters: Character[] = [
  {
    photo: "https://barrelwisdom.com/media/games/resleri/characters/face/ryza-one-summer-story.webp",
    fullPhoto: "https://barrelwisdom.com/media/games/resleri/characters/full/ryza-one-summer-story.webp",
    name: "Ryza [One Summer Story]",
    role: "Attacker",
    element: "Fire",
    baseRarity: "★★★",
    itemTrait1: "M.Def Blessing",
    itemTrait2: "Air Blessing",
    equipmentTrait: "Fire Damage Boost",
    types: ["Kurken Island", "Promise & Teamwork", "Adventurer", "Dragon Slayer", "Spirited"],
  },
  // Add more characters here...
]