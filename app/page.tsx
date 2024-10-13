'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, HelpCircle, Settings, Search, ChevronDown } from 'lucide-react'
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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

const roleImages = {
  "Attacker": attackerImg,
  "Breaker": breakerImg,
  "Defender": defenderImg,
  "Supporter": supporterImg,
}

const elementImages = {
  "Fire": fireImg,
  "Wind": windImg,
  "Ice": iceImg,
  "Bolt": boltImg,
  "Stab": stabImg,
  "Strike": strikeImg,
  "Slash": slashImg,
}

type Character = {
  photo: string;
  fullPhoto: string;
  name: string;
  role: keyof typeof roleImages;
  element: keyof typeof elementImages;
  baseRarity: string;
  itemTrait1: string;
  itemTrait2: string;
  equipmentTrait: string;
  types: string[];
};

const characters: Character[] = [
  {
    photo:
      "https://barrelwisdom.com/media/games/resleri/characters/face/ryza-one-summer-story.webp",
    fullPhoto: "https://barrelwisdom.com/media/games/resleri/characters/full/ryza-one-summer-story.webp" ,
    name: "Ryza [One Summer Story]",
    role: "Attacker",
    element: "Fire",
    baseRarity: "★★★",
    itemTrait1: "M.Def Blessing",
    itemTrait2: "Air Blessing",
    equipmentTrait: "Fire Damage Boost",
    types: [
      "Kurken Island",
      "Promise & Teamwork",
      "Adventurer",
      "Dragon Slayer",
      "Spirited",
    ],
  },
  {
    photo:
      "https://barrelwisdom.com/media/games/resleri/characters/face/resna-4.webp",
    fullPhoto: "https://barrelwisdom.com/media/games/resleri/characters/full/resna-4.webp",
    name: "Resna [Loved Rookie]",
    role: "Attacker",
    element: "Wind",
    baseRarity: "★★★",
    itemTrait1: "Air Curse",
    itemTrait2: "Strike Blessing",
    equipmentTrait: "Air Damage Boost",
    types: ["Lantarna", "Promise & Teamwork", "Bookworm", "Resleriana Academy"],
  },
  {
    photo: 'https://barrelwisdom.com/media/games/resleri/characters/face/tess-rabbit-eared-troublemaker.webp',
    fullPhoto: 'https://barrelwisdom.com/media/games/resleri/characters/full/tess-rabbit-eared-troublemaker.webp',
    name: 'Tess [Rabbit-Eared Troublemaker]',
    role: 'Supporter',
    element: 'Stab',
    baseRarity: '★',
    itemTrait1: 'Stab Shield',
    itemTrait2: 'Ample Healing',
    equipmentTrait: 'Single Recovery Boost',
    types: ['Kirchen Bell', 'Sweets']
  },
  {
    photo: 'https://barrelwisdom.com/media/games/resleri/characters/face/nady-1.webp',
    fullPhoto: 'https://barrelwisdom.com/media/games/resleri/characters/full/nady-1.webp',
    name: 'Nady [Smiling Mother]',
    role: 'Supporter',
    element: 'Strike',
    baseRarity: '★',
    itemTrait1: 'All Recovery Bonus',
    itemTrait2: 'Air Shield',
    equipmentTrait: 'Recovery Boost',
    types: ['Merchant', 'Chef', 'Nurturer', 'Laid-back']
  },
  {
    photo: 'https://barrelwisdom.com/media/games/resleri/characters/face/totori-yearning-for-her-mother.webp',
    fullPhoto: 'https://barrelwisdom.com/media/games/resleri/characters/full/totori-yearning-for-her-mother.webp',
    name: 'Totori [Daughter of a Powerful Lady]',
    role: 'Supporter',
    element: 'Ice',
    baseRarity: '★★',
    itemTrait1: 'Ample Healing',
    itemTrait2: 'M. DEF Blessing',
    equipmentTrait: 'Recovery Boost',
    types: ['Arland', 'Family & Friends', 'Adventurer']
  },
  {
    photo: 'https://barrelwisdom.com/media/games/resleri/characters/face/meruru-powerful-princess.webp',
    fullPhoto: 'https://barrelwisdom.com/media/games/resleri/characters/full/meruru-powerful-princess.webp',
    name: 'Meruru [Powerful Princess]',
    role: 'Supporter',
    element: 'Wind',
    baseRarity: '★★',
    itemTrait1: 'Stab Blessing',
    itemTrait2: 'Air Shield',
    equipmentTrait: 'Magic Damage Boost',
    types: ['Arland', 'Prim', 'Spirited']
  },
  {
    photo: 'https://barrelwisdom.com/media/games/resleri/characters/face/resna-innocent-dreamer.webp',
    fullPhoto: 'https://barrelwisdom.com/media/games/resleri/characters/full/resna-innocent-dreamer.webp',
    name: 'Resna [Innocent Dreamer]',
    role: 'Supporter',
    element: 'Bolt',
    baseRarity: '★★★',
    itemTrait1: 'Critical Finish',
    itemTrait2: 'Bolt Curse',
    equipmentTrait: 'Slash Resistance Up',
    types: ['Lantarna', 'Promise & Teamwork', 'Merchant', 'Bookworm']
  },
  {
    photo: 'https://barrelwisdom.com/media/games/resleri/characters/face/iksel-fighting-chef.webp',
    fullPhoto: 'https://barrelwisdom.com/media/games/resleri/characters/full/iksel-fighting-chef.webp',
    name: 'Iksel [Fighting Chef]',
    role: 'Supporter',
    element: 'Fire',
    baseRarity: '★★★',
    itemTrait1: 'M. DEF Blessing',
    itemTrait2: 'Ice Curse',
    equipmentTrait: 'Stab Resistance Up',
    types: ['Arland', 'Chef']
  },
  {
    photo: 'https://barrelwisdom.com/media/games/resleri/characters/face/ayesha-maria-of-dusk.webp',
    fullPhoto: 'https://barrelwisdom.com/media/games/resleri/characters/full/ayesha-maria-of-dusk.webp',
    name: 'Ayesha [MARIA of Dusk]',
    role: 'Supporter',
    element: 'Wind',
    baseRarity: '★★★',
    itemTrait1: 'Ample Healing',
    itemTrait2: 'Critical Finish',
    equipmentTrait: 'Recovery Boost',
    types: ['Family & Friends', 'Nurturer', 'Whimsical']
  },
  {
    photo: 'https://barrelwisdom.com/media/games/resleri/characters/face/klaudia-one-summer-melody.webp',
    fullPhoto: 'https://barrelwisdom.com/media/games/resleri/characters/full/klaudia-one-summer-melody.webp',
    name: 'Klaudia [One Summer Melody]',
    role: 'Supporter',
    element: 'Ice',
    baseRarity: '★★★',
    itemTrait1: 'Ice Curse',
    itemTrait2: 'Ice Shield',
    equipmentTrait: 'Ice Damage Boost',
    types: ['Kurken Island', 'Merchant', 'Prim']
  },
  {
    photo: 'https://barrelwisdom.com/media/games/resleri/characters/face/patricia-1.webp',
    fullPhoto: 'https://barrelwisdom.com/media/games/resleri/characters/full/patricia-1.webp',
    name: 'Patricia [Holy Night Gift]',
    role: 'Defender',
    element: 'Slash',
    baseRarity: '★★★',
    itemTrait1: 'P.Def Blessing',
    itemTrait2: 'Single Recovery Bonus',
    equipmentTrait: 'All Resistances Up [Resolve]',
    types: ['Prim', 'Seasonal', 'Diligent']
  },
  {
    photo: 'https://barrelwisdom.com/media/games/resleri/characters/face/heidi-1.webp',
    fullPhoto: 'https://barrelwisdom.com/media/games/resleri/characters/full/heidi-1.webp',
    name: 'Heidi [Thief of Rose]',
    role: 'Breaker',
    element: 'Strike',
    baseRarity: '★★★',
    itemTrait1: 'Chaser Charge',
    itemTrait2: 'Slash Shield',
    equipmentTrait: 'Stun Damage Boost',
    types: ['Lantarna', 'Family & Friends', 'Energetic']
  },
];

const attributes = ['photo', 'name', 'role', 'element', 'baseRarity', 'itemTrait1', 'itemTrait2', 'equipmentTrait', 'types'] as const;
type Attribute = typeof attributes[number]

export default function Resleridle() {
  const [guesses, setGuesses] = useState<Character[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [solution, setSolution] = useState<Character>(characters[Math.floor(Math.random() * characters.length)])
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [revealedCells, setRevealedCells] = useState<boolean[][]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // TODO: set the solution based on the current date
    // current random: Math.floor(Math.random() * characters.length) | test character: 6, 8
    setSolution(characters[Math.floor(Math.random() * characters.length)])
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleGuess = (characterName: string) => {
    const guessedCharacter = characters.find(char => char.name === characterName)
    if (guessedCharacter && !guesses.some(guess => guess.name === characterName)) {
      const newGuesses = [...guesses, guessedCharacter]
      setGuesses(newGuesses)
      if (guessedCharacter.name === solution.name || newGuesses.length === 6) {
        setGameOver(true)
      }
      setIsOpen(false)
      setSearchTerm('')

      revealCells(newGuesses.length - 1)
    }
  }

  const revealCells = (rowIndex: number) => {
    setTimeout(() => {
      setRevealedCells(prev => {
        const newState = [...prev];
        newState[rowIndex] = Array(attributes.length).fill(true);
        return newState;
      });
    }, 100); 
  };

  const toggleDropdown = () => setIsOpen(!isOpen)

  const filteredCharacters = characters.filter(char =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !guesses.some(guess => guess.name === char.name)
  )

  const getAttributeStyle = (attribute: Attribute, guess: Character) => {
    if (attribute === 'photo') return ''

    // returns yellow if atleast one type is matching with the solution
    if (attribute === 'types') { 
      const guessTypes = Array.from(new Set(guess.types))
      const solutionTypes = Array.from(new Set(solution.types))
      const exactMatch = JSON.stringify(guessTypes.sort()) === JSON.stringify(solutionTypes.sort())
      const partialMatch = guessTypes.some(type => solutionTypes.includes(type))
      if (exactMatch) return 'bg-green-500 text-white'
      if (partialMatch) return 'bg-yellow-500 text-white'
      return 'bg-gray-500 text-white'
    }

    // returns yellow if trait1 matches trait2 for items (mostly just happens with crit finish)
    if (attribute === 'itemTrait1'){
      if (guess.itemTrait1 === solution.itemTrait2){
        return 'bg-yellow-500 text-white'
      }
    }
    if (attribute === 'itemTrait2'){
      if (guess.itemTrait2 === solution.itemTrait1){
        return 'bg-yellow-500 text-white'
      }
    }

    // returns yellow if its the right character but the wrong costume (this might be OP might remove idk)
    if (attribute === 'name'){
      const myArray = guess.name.split(" ");
      const myArray2 = solution.name.split(" ");
      const guessName = myArray[0];
      const solutionName = myArray2[0];
      if (guessName === solutionName && myArray[1] != myArray2[1]){
        return 'bg-yellow-500 text-white'
      }

    }
    if (guess[attribute] === solution[attribute]) {
      return 'bg-green-500 text-white'
    }
    return 'bg-gray-500 text-white'
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center py-8 px-4" style={{backgroundImage: "url('https://i.imgur.com/uFgv3iH.jpeg')"}}>
      <div className="w-full max-w-4xl bg-gray-900 bg-opacity-80 rounded-lg shadow-lg p-6">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-6 w-6 text-white" />
            </Button>
            <h1 className="text-3xl font-bold text-center text-white">Resleridle</h1>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-6 w-6 text-white" />
            </Button>
          </div>
          <div className="flex justify-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-6 w-6 text-white" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>How to Play</DialogTitle>
                  <DialogDescription>
                    Guess the Atelier Resleriana character in 6 tries. Each guess must be a valid character. 
                    After each guess, the color of the tiles will change to show how close your guess was to the character.
                    Green indicates a correct attribute, yellow indicates a partial match for Types, and gray indicates an incorrect one.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon">
              <Settings className="h-6 w-6 text-white" />
            </Button>
          </div>
        </header>

        <div className="bg-gray rounded-lg p-4 mb-6">
          <div className="w-full mb-4 relative" ref={dropdownRef}>
            <Button
              onClick={toggleDropdown}
              variant="default"
              className="w-full justify-between bg-black text-white"
              disabled={gameOver}
            >
              Select or search for a character
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>

            {isOpen && (
              <div className="absolute mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                <div className="p-2">
                  <Input
                    type="text"
                    placeholder="Search characters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                </div>
                <div className="max-h-60 overflow-auto">
                  {filteredCharacters.length > 0 ? (
                    filteredCharacters.map((char, index) => (
                      <button
                        key={index}
                        onClick={() => handleGuess(char.name)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center space-x-2"
                      >
                        <Image
                          src={char.photo}
                          alt={char.name}
                          width={30}
                          height={30}
                          className="rounded-full object-cover"
                        />
                        <span>{char.name}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">No matching character found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {gameOver && (
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">
                {guesses[guesses.length - 1].name === solution.name ? 'Congratulations!' : 'Game Over'}
              </h2>
              <p className="text-xl text-white">The character was: {solution.name}</p>
              <Image src={solution.fullPhoto} alt={solution.name} width={200} height={200} className="rounded-full mx-auto mt-4" />
            </div>
          )}
        </div>

        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white">
                {attributes.map(attr => (
                  <th key={attr} className="p-2 text-sm font-bold text-center border-r border-blue-700 last:border-r-0">
                    {attr === 'itemTrait1' ? 'Item Gift 1' : 
                     attr === 'itemTrait2' ? 'Item Gift 2' : 
                     attr === 'equipmentTrait' ? 'Equipment Gift' : 
                     attr === 'baseRarity' ? 'Base Rarity' :
                     attr.charAt(0).toUpperCase() + attr.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guesses.map((guess, i) => (
                <tr key={i}>
                  {attributes.map((attr, j) => {
                    const isRevealed = revealedCells[i]?.[j]
                    return (
                      <td 
                        key={attr} 
                        className={`p-2 border ${getAttributeStyle(attr, guess)} 
                                    transition-all duration-500 ease-in-out`}
                        style={{
                          perspective: '1000px',
                          transformStyle: 'preserve-3d',
                          transform: isRevealed ? 'rotateX(0deg)' : 'rotateX(180deg)',
                        }}
                      >
                        <div 
                          className={`w-full h-full ${isRevealed ? 'opacity-100' : 'opacity-0'} 
                                      transition-opacity duration-150 delay-300 flex justify-center items-center`}
                          style={{
                            backfaceVisibility: 'hidden',
                            transform: isRevealed ? 'rotateX(0deg)' : 'rotateX(180deg)',
                          }}
                        >
                          {attr === 'photo' ? (
                            <Image src={guess.photo} alt={guess.name} width={100} height={100} className="rounded-full" />
                          ) : attr === 'role' ? (
                            <Image src={roleImages[guess.role]} alt={guess.role} width={100} height={100} />
                          ) : attr === 'element' ? (
                            <Image src={elementImages[guess.element]} alt={guess.element} width={50} height={50} />
                          ) : attr === 'types' ? (
                            guess[attr].join(', ')
                          ) : (
                            guess[attr]
                          )}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}