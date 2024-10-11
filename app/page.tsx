"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, HelpCircle, Settings } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Character = {
  photo: string;
  name: string;
  role: string;
  element: string;
  baseRarity: string;
  itemTrait1: string;
  itemTrait2: string;
  equipmentTrait: string;
  types: string[];
};

const characters: Character[] = [
  {
    photo:
      "https://barrelwisdom.com/media/games/resleri/characters/full/ryza-one-summer-story.webp",
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
      "https://barrelwisdom.com/media/games/resleri/characters/full/resna-4.webp",
    name: "Resna [Loved Rookie]",
    role: "Attacker",
    element: "Wind",
    baseRarity: "★★★",
    itemTrait1: "Air Curse",
    itemTrait2: "Strike Blessing",
    equipmentTrait: "Air Damage Boost",
    types: ["Lantarna", "Promise & Teamwork", "Bookworm", "Resleriana Academy"],
  },
  // TODO: migrate characters to db
];

const attributes = [
  "photo",
  "name",
  "role",
  "element",
  "baseRarity",
  "itemTrait1",
  "itemTrait2",
  "equipmentTrait",
  "types",
] as const;
type Attribute = (typeof attributes)[number];

export default function ReslerianaleClone() {
  const [guesses, setGuesses] = useState<Character[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [solution, setSolution] = useState<Character>(
    characters[Math.floor(Math.random() * characters.length)]
  );

  useEffect(() => {
    // TODO: set solution based on the current date
    setSolution(characters[Math.floor(Math.random() * characters.length)]);
  }, []);

  const handleGuess = (characterName: string) => {
    const guessedCharacter = characters.find(
      (char) => char.name === characterName
    );
    if (guessedCharacter) {
      const newGuesses = [...guesses, guessedCharacter];
      setGuesses(newGuesses);
      if (guessedCharacter.name === solution.name || newGuesses.length === 6) {
        setGameOver(true);
      }
    }
  };

  const getAttributeStyle = (attribute: Attribute, guess: Character) => {
    if (attribute === "photo") return "";
    if (attribute === "types") {
      const guessTypes = Array.from(new Set(guess.types));
      const solutionTypes = Array.from(new Set(solution.types));
      const exactMatch =
        JSON.stringify(guessTypes.sort()) ===
        JSON.stringify(solutionTypes.sort());
      const partialMatch = guessTypes.some((type) =>
        solutionTypes.includes(type)
      );
      if (exactMatch) return "bg-green-500 text-white";
      if (partialMatch) return "bg-yellow-500 text-white";
      return "bg-gray-500 text-white";
    }
    if (guess[attribute] === solution[attribute]) {
      return "bg-green-500 text-white";
    }
    return "bg-gray-500 text-white";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <header className="w-full max-w-4xl mb-8">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-3xl font-bold text-center">Resleridle</h1>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex justify-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>How to Play</DialogTitle>
                <DialogDescription>
                  Guess the Atelier Resleriana character in 6 tries! Each guess
                  must be a valid character. After each guess, the color of the
                  tiles will change to show how close your guess was to the
                  answer. Green indicates a correct attribute, yellow indicates
                  a partial match for Types, and gray indicates an incorrect
                  one.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button variant="ghost" size="icon">
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <div className="w-full max-w-4xl mb-8 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {attributes.map((attr) => (
                <th key={attr} className="p-2 text-sm font-bold text-left">
                  {attr === "itemTrait1"
                    ? "Item Trait 1"
                    : attr === "itemTrait2"
                    ? "Item Trait 2"
                    : attr === "equipmentTrait"
                    ? "Equipment Trait"
                    : attr === "baseRarity"
                    ? "Base Rarity"
                    : attr.charAt(0).toUpperCase() + attr.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((_, i) => (
              <tr key={i}>
                {attributes.map((attr) => {
                  const guessedChar = guesses[i];
                  return (
                    <td
                      key={attr}
                      className={`p-2 border ${
                        guessedChar
                          ? getAttributeStyle(attr, guessedChar)
                          : "bg-white"
                      }`}
                    >
                      {attr === "photo" && guessedChar ? (
                        <Image
                          src={guessedChar.photo}
                          alt={guessedChar.name}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                      ) : attr === "types" && guessedChar ? (
                        guessedChar[attr].join(", ")
                      ) : (
                        guessedChar?.[attr] || ""
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full max-w-sm mb-8">
        <Select onValueChange={handleGuess} disabled={gameOver}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a character" />
          </SelectTrigger>
          <SelectContent>
            {characters.map((char) => (
              <SelectItem
                key={char.name}
                value={char.name}
                className="hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Image
                    src={char.photo}
                    alt={char.name}
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                  <span className="font-medium">{char.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {gameOver && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {guesses[guesses.length - 1].name === solution.name
              ? "Congratulations!"
              : "Game Over"}
          </h2>
          <p className="text-xl">The character was: {solution.name}</p>
          <Image
            src={solution.photo}
            alt={solution.name}
            width={100}
            height={100}
            className="rounded-full mx-auto mt-4"
          />
        </div>
      )}
    </div>
  );
}
