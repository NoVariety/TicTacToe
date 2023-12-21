const githubLink: string = "https://github.com/NoVariety/TicTacToe"

const enum cellTypes {
  EMPTY = "",
  FIRST_PLAYER = "x",
  SECOND_PLAYER = "o",
}

const hintTextOptions: string[] = [
  "KNOW YOURSELF AND YOU WILL WIN ALL BATTLES",
  "OPPORTUNITIES MULTIPLY AS THEY ARE SEIZED",
  "APPEAR WEAK WHEN YOU ARE STRONG, AND STRONG WHEN YOU ARE WEAK",
  "THE WISE WARRIOR AVOIDS THE BATTLE",
  "ONE MAY KNOW HOW TO CONQUER WITHOUT BEING ABLE TO DO IT",
  "PONDER AND DELIBERATE BEFORE YOU MAKE A MOVE",
  "HE WILL WIN WHO KNOWS WHEN TO FIGHT AND WHEN NOT TO FIGHT",
  "WHEELS OF JUSTICE GRIND SLOW BUT GRIND FINE",
  "BE WHERE YOUR ENEMY IS NOT",
  "ALL WARFARE IS BASED OF DECEPTION",
  "KNOW THY SELF, KNOW THY ENEMY",
  "IN THE MIDST OF CHAOS, THERE IS ALSO OPPORTUNITY",
  "THE GREATEST VICTORY IS THAT WHICH REQUIRES NO BATTLE",
  "EVEN THE FINEST SWORD PLUNGED INTO SALT WATER WILL EVENTUALLY RUST",
  "WHO WISHES TO FIGHT MUST FIRST COUNT THE COST",
  "ONE MARK OF A GREAT SOLDIER IS THAT HE FIGHT ON HIS OWN TERMS OR FIGHTS NOT AT ALL",
  "IF THE MIND IS WILLING, THE FLESH COULD GO ON AND ON WITHOUT MANY THINGS",
  "ATTACK IS THE SECRET OF DEFENSE, DEFENSE IS THE PLANNING OF AN ATTACK",
  "THE OPPORTUNITY OF DEFEATING THE ENEMY IS PROVIDED BY THE ENEMY HIMSELF",
  "THE WORST CALAMITIES THAT BEFALL AN ARMY ARISE FROM HESITATION",
  "THE SUPREME ART OF WAR IS TO SUBDUE THE ENEMY WITHOUT FIGHTING",
  "THUS THE EXPERT IN BATTLE MOVES THE ENEMY, AND IS NOT MOVED BY HIM",
  "SO IN WAR, THE WAY IS TO AVOID WHAT IS STRONG, AND STRIKE AT WHAT IS WEAK",
]

type legalMoves = {
  row: number
  col: number
}

enum gameStateMessages {
  WIN_MESSAGE = "YOU WIN!",
  DRAW_MESSAGE = "IT'S A DRAW!",
  LOSS_MESSAGE = "YOU LOSE!",
  GAME_ONGOING = "",
}

enum gifWaitingTimeMillis {
  off = 0,
  min = 1200,
  mid = 2700,
  max = 4900,
}

export {
  githubLink,
  hintTextOptions,
  cellTypes,
  gameStateMessages,
  gifWaitingTimeMillis,
  type legalMoves,
}
