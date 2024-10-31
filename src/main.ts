#!/usr/bin/env node


import { generate, Npc, NpcGenerateOptions } from "npc-generator";
import path from "path"
import {promises as fs} from 'fs'


const raceMapping = new Map<string, number>([
  ["aasimar", 0],
  ["dragonborn", 1],
  ["dwarf", 2],
  ["elf", 3],
  ["firbolg", 4],
  ["gnome", 5],
  ["goblin", 6],
  ["goliath", 7],
  ["halfling", 8],
  ["half-elf", 9],
  ["half-orc", 10],
  ["human", 11],
  ["kenku", 12],
  ["lizardfolk", 13],
  ["medusa", 14],
  ["orc", 15],
  ["tabaxi", 16],
  ["tiefling", 17],
  ["triton", 18],
  ["troglodyte", 19],
]);

const professionMapping = new Map<string, number>([
  ["class", 0],
  ["profession", 1],
]);

const genderMapping = new Map<string, number>([
  [ "male", 0],
  [ "female", 1],
]);

const occupationMapping = new Map<string, number>([
  ["learned", 0],
  ["lessernobility", 1],
  ["professional", 2],
  ["workingclass", 3],
  ["martial", 4],
  ["underclass", 5],
  ["entertainer", 6],
]);

function getTemplated(npc: Npc): string {
 return `
# [[${npc.description.name}]]
 
## description
 
- ${npc.description.age} years old.
- ${npc.description.gender} ${npc.description.race}
- ${npc.description.pronounMinus} works as ${npc.description.occupation}

## appearance

- ${npc.physical.hair}
- ${npc.physical.eyes}
- ${npc.physical.skin}
- ${npc.physical.height} cm tall
- ${npc.physical.build}
- ${npc.physical.face}
- ${npc.physical.special1} , ${npc.physical.special2}
 
## personality 

- sexual orientation: ${npc.relationship.orientation}
- relationship status ${npc.relationship.status}
- ${npc.religion.description}
- ${npc.ptraits.traits1}
- ${npc.ptraits.traits2}
- ${npc.pquirks.description}

## quest hooks
- ${npc.hook.description}

## stats
- commoner with:
- charisma: ${npc.abilities.charisma}
- constitution: ${npc.abilities.constitution}
- dexterity: ${npc.abilities.dexterity}
- intelligence: ${npc.abilities.intelligence}
- strength: ${npc.abilities.strength}
- wisdom: ${npc.abilities.wisdom}
 `;
}

async function writeMarkdownFile(filePath: string, markdownContent: string) {
  try {
    await fs.writeFile(filePath, markdownContent);
    console.log('Markdown file written successfully:', filePath);
  } catch (error) {
    console.error('Error writing Markdown file:', error);
  }
}


function parseArgs(args: Array<string>): NpcGenerateOptions {

  let options: NpcGenerateOptions = {};

  for (const arg of args) {
    if(raceMapping.has(arg)) {
      options.race = raceMapping.get(arg);
    }

    if(professionMapping.has(arg)) {
      options.occupation1 = professionMapping.get(arg);
    }

    if(genderMapping.has(arg)) {
      options.gender = genderMapping.get(arg);
    }

    if(occupationMapping.has(arg)) {
      options.occupation2 = occupationMapping.get(arg);
    }

  }

  return options;
}

function main() {
  const args: Array<string> = process.argv;
  const options: NpcGenerateOptions = parseArgs(args);
  const npc = generate({ npcOptions: options});
  const markdown = getTemplated(npc.npc)

  const filePath = path.join(process.cwd(), `${npc.npc.description.name}.md`.replace(" ", "_"));
  writeMarkdownFile(filePath, markdown)
}





main()
