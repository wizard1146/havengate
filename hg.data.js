hg = typeof hg != 'undefined' ? hg : {}

hg.data = {}

hg.data.levels = {
  1:   0,
  2:  45,
  3:  95,
  4: 150,
  5: 210,
  6: 275,
  7: 345,
  8: 420,
  9: 500,
}

hg.data.standardAttackDeck = [
  'card_add_0', 'card_add_0', 'card_add_0', 'card_add_0', 'card_add_0', 'card_add_0',
  'card_add_1', 'card_add_1', 'card_add_1', 'card_add_1', 'card_add_1', 
  'card_add_2',
  'card_sub_1', 'card_sub_1', 'card_sub_1', 'card_sub_1', 'card_sub_1', 
  'card_sub_2',
  'card_null',
  'card_crit',
]

hg.data.classes = {}

hg.data.classes.drifter = {
  key       : 'drifter',
  print     : 'Inox Drifter',
  hand_size : 12,
  complexity: 1,
  elemental_affinities: [],
  traits    : ['outcast', 'resourceful', 'strong'],
  ancestry  : 'inox',
  melee     : 4,
  ranged    : 4,
  mobility  : 3,
  support   : 4,
  defense   : 4,
  control   : 1,
  health    : [
    10, 12, 14, 16, 18, 20, 22, 24, 26
  ],
  perks: [
    {id: `drifter01`, perks: 1, text: `Replace one -1 card with one +1 card`},
    {id: `drifter01`, perks: 1, text: `Replace one -1 card with one +1 card`},
    {id: `drifter01`, perks: 1, text: `Replace one -1 card with one +1 card`},
    {id: `drifter02`, perks: 1, text: `Replace one -2 card with one +0 card`},
    {id: `drifter03`, perks: 1, text: `Replace two +0 cards with two Pierce 3 (rolling) cards`},
    {id: `drifter04`, perks: 1, text: `Replace two +0 cards with two Push 2 (rolling) cards`},
    {id: `drifter05`, perks: 1, text: `Add one +3 card`},
    {id: `drifter06`, perks: 1, text: `Add one +2 Immobilize card`},
    {id: `drifter06`, perks: 1, text: `Add one +2 Immobilize card`},
    {id: `drifter07`, perks: 1, text: `Add two Heal 1, self (rolling) cards`},
    {id: `drifter08`, perks: 1, text: `Ignore scenario effects and add one +1 card`},
    {id: `drifter09`, perks: 1, text: `Ignore item -1 effects and add one +1 card`},
    {id: `drifter10`, perks: 2, text: `Whenever you long rest, you may move one of your character tokens backward one slot (this perk costs two perks)`},
    {id: `drifter11`, perks: 1, text: `You may bring one additional one-hand item into each scenario`},
    {id: `drifter12`, perks: 1, text: `At the end of each scenario, you may discard up to two loot cards, except "Random Item," to draw that many new loot cards`},
  ],

  class_notes: `You have many persistent bonuses with use slots which will greatly enhance your capabilities. Whenever a bonus is triggered (e.g., each individual attack or movement), advance your character token one slot. To keep these bonuses active for longer, use abilities which move your tokens backward.
  You also have abilities which allow you to add effects by moving a character token on any one of your persistent bonuses forward. You only gain experience when you move the token forward, not backward. All effects that move your tokens forward or backward only affect use slots on ability cards, not items.`,

  flavour: `The Inox clans of the Great Grove value their strength and self-reliance, but they could not bury internal quarrels in time to repel the human empire's expansion into their lands. They paid dearly. Some Inox have retreated deeper into the most defensible areas of the forest. Others venture into other civilizations, employing their great size, woodcraft, and performative traditions in a variety of occupations.
  In fact, it is common practice among many clans to send their young warriors off into the larger world for a year so they can find themselves and discover their passion. Some of them never return, lured away by city life or, in rarer cases, discovering that their passion is the wilderness itself. These Inox revel in surviving off the land without allegiance or responsibility. They are the Drifters, and there is no better place to test their skills than the north.`,

  /* references */
  references: {
    range         : '21',
    active_bonuses: '30',
    retirement    : '48.3',
  },
}

hg.data.classes.bannerspear = {
  key       : 'bannerspear',
  print     : 'Banner Spear',
  hand_size : 10,
  complexity: 2,
  elemental_affinities: ['Air'],
  traits    : ['armored', 'persuasive', 'resourceful'],
  ancestry  : 'human',
  melee     : 4,
  ranged    : 3,
  mobility  : 3,
  support   : 4,
  defense   : 5,
  control   : 3,
  health    : [
    10, 12, 14, 16, 18, 20, 22, 24, 26
  ],
  perks: [
    {id: `bannerspear01`, perks: 1, text: `Replace one -1 card with one "Shield 1" (rolling) card`},
    {id: `bannerspear01`, perks: 1, text: `Replace one -1 card with one "Shield 1" (rolling) card`},
    {id: `bannerspear01`, perks: 1, text: `Replace one -1 card with one "Shield 1" (rolling) card`},
    {id: `bannerspear02`, perks: 1, text: `Replace one +0 card with one +1 "Add +1 Attack for each ally adjacent to the target" card`},
    {id: `bannerspear02`, perks: 1, text: `Replace one +0 card with one +1 "Add +1 Attack for each ally adjacent to the target" card`},
    {id: `bannerspear03`, perks: 1, text: `Add one +1 Disarm card`},
    {id: `bannerspear03`, perks: 1, text: `Add one +1 Disarm card`},
    {id: `bannerspear04`, perks: 1, text: `Add one +2 Push 1 card`},
    {id: `bannerspear04`, perks: 1, text: `Add one +2 Push 1 card`},
    {id: `bannerspear05`, perks: 1, text: `Add two +1 (rolling) cards`},
    {id: `bannerspear05`, perks: 1, text: `Add two +1 (rolling) cards`},
    {id: `bannerspear06`, perks: 1, text: `Ignore item -1 effects and remove one -1 card`},
    {id: `bannerspear07`, perks: 1, text: `At the end of each of your long rests, grant one ally within Range 3: Move 2`},
    {id: `bannerspear08`, perks: 1, text: `Whenever you open a door with a move ability, add +3 Move`},
    {id: `bannerspear09`, perks: 2, text: `Once each scenario, during your turn, gain Shield 2 for the round (this costs two perk marks)`},
  ],
  
  class_notes: ``,
  
  flavour: `Northern human settlements existed long before emissaries from White Oak traveled to Frosthaven, looking for new ways to expand their Merchant’s Guild. When these endeavors only led to angering the Algox population, the southerners fled, leaving the ill-prepared fishing village to face the blow back. But humans are a resilient people. Even on the brink of despair, there is hope for survival.
  The only thing left behind by the Merchants Guild were the Banner Spears, tireless warriors forever in search of respect and glory. Frosthaven has no need of pride, though. Cut off from the rest of the world and faced with the harsh realities of the north, Banner Spears are forced to reevaluate what truly matters. They were abandoned like everything else, and they must forge new, stronger bonds to stay alive.`,
  
  masteries: [
    {key: `_bannerspear01`, text: `Attack at least three enemies with each of three different area of effect attack abilities`},
    {key: `_bannerspear02`, text: `Perform a Banner summon ability on your first turn, keeping the banner alive and within Range 3 of you for the entire scenario`},
  ]
}

hg.data.classes.blinkblade = {
  key       : 'blinkblade',
  print     : 'Blinkblade',
  hand_size : 10,
  complexity: 5,
  elemental_affinities: [],
  traits    : ['educated', 'nimble', 'resourceful'],
  ancestry  : 'quatryl',
  melee     : 5,
  ranged    : 2,
  mobility  : 5,
  support   : 1,
  defense   : 1,
  control   : 2,
  health    : [
     8,  9, 11, 12, 14, 15, 17, 18, 20
  ],
  perks: [
    {id: `blinkblade01`, perks: 1, text: `Remove one -2 card`},
    {id: `blinkblade02`, perks: 1, text: `Replace one -1 card with one +1 card`},
    {id: `blinkblade02`, perks: 1, text: `Replace one -1 card with one +1 card`},
    {id: `blinkblade03`, perks: 1, text: `Replace one -1 card with one +0 Wound card`},
    {id: `blinkblade03`, perks: 1, text: `Replace one -1 card with one +0 Wound card`},
    {id: `blinkblade04`, perks: 1, text: `Replace one +0 card with one +1 Immobilize card`},
    {id: `blinkblade04`, perks: 1, text: `Replace one +0 card with one +1 Immobilize card`},
    {id: `blinkblade05`, perks: 1, text: `Replace one +0 card with one "Place this card in your active area. On your next attack, discard this card to add +2 Attack" (rolling) card`},
    {id: `blinkblade05`, perks: 1, text: `Replace one +0 card with one "Place this card in your active area. On your next attack, discard this card to add +2 Attack" (rolling) card`},
    {id: `blinkblade05`, perks: 1, text: `Replace one +0 card with one "Place this card in your active area. On your next attack, discard this card to add +2 Attack" (rolling) card`},
    {id: `blinkblade06`, perks: 1, text: `Replace two +1 cards with two +2 cards`},
    {id: `blinkblade07`, perks: 1, text: `Add one -1 "Gain 1 Time Token" card`},
    {id: `blinkblade07`, perks: 1, text: `Add one -1 "Gain 1 Time Token" card`},
    {id: `blinkblade08`, perks: 1, text: `Add one +2 "Regenerate, self" (rolling) card`},
    {id: `blinkblade08`, perks: 1, text: `Add one +2 "Regenerate, self" (rolling) card`},
    {id: `blinkblade09`, perks: 1, text: `Whenever you short rest, you may spend one unspent Spent item for no effect to Recover a different spent item`},
    {id: `blinkblade10`, perks: 1, text: `At the start of your first turn each scenario, you may perform Move 3`},
    {id: `blinkblade11`, perks: 1, text: `Whenever you would gain Immobilize, prevent the condition`},
  ],
  
  class_notes: ``,
  
  flavour: `Quatryls typically don't like being underestimated. They are smaller than the other peoples they encounter, yes, but that doesn't mean they are worth any less. If anything, they will go out of their way to show they are worth more. Their scientific institutions on the eastern continent have developed a myriad of technological advancements - bionics and prosthetics used to enhance their own capabilities. There are even vague records that long ago, the Quatryls' scientific research led them to the north to hunt for its secrets, but these facilities have long since fallen to ruin.
  The fact of the matter is that the cold is not a forgiving climate for one so small. If a Blinkblade were to travel north, it may be because they have nowhere else to go, or because there is some quarry to be found. Blinkblades are assassins, after all. Equipped with experimental temporal drives, they can alter the flow of time, moving faster than the eye can see and striking harder than a creature ten times their size. Such actions can only be performed in short bursts, however, and there is always a cost to such great power.`,
  
  masteries: [
    {key: `_blinkblade01`, text: `Declare Fast for seven consecutive rounds`},
    {key: `_blinkblade02`, text: `Never be targeted by an attack`},
  ]
}

hg.data.classes.deathwalker = {
  key       : 'deathwalker',
  print     : 'Deathwalker',
  hand_size : 11,
  complexity: 3,
  elemental_affinities: ['Dark'],
  traits    : ['arcane', 'outcast', 'persuasive'],
  ancestry  : 'valrath',
  melee     : 4,
  ranged    : 5,
  mobility  : 3,
  support   : 1,
  defense   : 2,
  control   : 2,
  health    : [
    6,  7,  8,  9, 10, 11, 12, 13, 14
  ],
  perks: [
    {id: `deathwalker01`, perks: 1, text: `Remove two -1 cards`},
    {id: `deathwalker02`, perks: 1, text: `Replace one -2 card with one +0 card`},
    {id: `deathwalker03`, perks: 1, text: `Replace one -1 card with one +1 card`},
    {id: `deathwalker03`, perks: 1, text: `Replace one -1 card with one +1 card`},
    {id: `deathwalker03`, perks: 1, text: `Replace one -1 card with one +1 card`},
    {id: `deathwalker04`, perks: 1, text: `Replace one +0 card with one +1 Curse card`},
    {id: `deathwalker04`, perks: 1, text: `Replace one +0 card with one +1 Curse card`},
    {id: `deathwalker04`, perks: 1, text: `Replace one +0 card with one +1 Curse card`},
    {id: `deathwalker05`, perks: 1, text: `Add one "+2 Infuse Dark" card`},
    {id: `deathwalker05`, perks: 1, text: `Add one "+2 Infuse Dark" card`},
    {id: `deathwalker06`, perks: 1, text: `Add one Disarm (rolling) and one Muddle (rolling) card`},
    {id: `deathwalker06`, perks: 1, text: `Add one Disarm (rolling) and one Muddle (rolling) card`},
    {id: `deathwalker07`, perks: 1, text: `Add two "+1, Heal 1 Target 1 ally" (rolling) cards`},
    {id: `deathwalker07`, perks: 1, text: `Add two "+1, Heal 1 Target 1 ally" (rolling) cards`},
    {id: `deathwalker08`, perks: 1, text: `Ignore scenario effects`},
    {id: `deathwalker09`, perks: 1, text: `Whenever you long rest, you may move one Shadow up to three hexes`},
    {id: `deathwalker10`, perks: 1, text: `Whenever you short rest, you may Consume Dark to perform "Muddle, Curse, Range 2" as if you were occupying a hex with a Shadow`},
    {id: `deathwalker11`, perks: 1, text: `While you are occupying a hex with a Shadow, all attacks targeting you gain disadvantage`},
  ],
  
  class_notes: ``,
  
  flavour: `No group is quite so ill-suited for the icy northern climates as the Valrath, who make their homes far to the south in the Red Desert. There was once a great war in that region, were the Valraths fought against the humans, both equally interested in conquering the Stormbrew Plains for themselves. The two nations have since made peace, and the Valrath government in particular has made concerted efforts to forsake its aggressive past. In more recent times, they have focused on economic strength over the physical.
  There is a saying among the Valrath: “In order to survive the ice, one must have an icy soul.” This is apt for a Deathwalker, a nomad bent on atoning for the Valrath nation’s past sins by ensuring the souls of the dead find rest. Wherever great tragedy falls, a Deathwalker is usually not far behind, and Frosthaven has seen plenty of tragedy.`,

  masteries: [
    {key: `_deathwalker01`, text: `Remove seven Shadows in one round`},
    {key: `_deathwalker02`, text: `Place or remove at least one Shadow each round`},
  ]
}

hg.data.classes.boneshaper = {
  key       : 'boneshaper',
  print     : 'Boneshaper',
  hand_size : 12,
  complexity: 4,
  elemental_affinities: ['Earth','Dark'],
  traits    : ['arcane', 'educated', 'intimidating'],
  ancestry  : 'aesther',
  melee     : 3,
  ranged    : 3,
  mobility  : 2,
  support   : 3,
  defense   : 5,
  control   : 2,
  health    : [
    6,  7,  8,  9, 10, 11, 12, 13, 14
  ],
  perks: [
    {id: `boneshaper01`, perks: 1, text: `Replace one -1 card with one +0 Curse card`},
    {id: `boneshaper01`, perks: 1, text: `Replace one -1 card with one +0 Curse card`},
    {id: `boneshaper02`, perks: 1, text: `Replace one -1 card with one +0 Poison card`},
    {id: `boneshaper02`, perks: 1, text: `Replace one -1 card with one +0 Poison card`},
    {id: `boneshaper03`, perks: 1, text: `Replace one -2 card with one +0 card`},
    {id: `boneshaper04`, perks: 1, text: `Replace one +0 card with one +1 "Kill the attacking summon to instead add +4" card`},
    {id: `boneshaper04`, perks: 1, text: `Replace one +0 card with one +1 "Kill the attacking summon to instead add +4" card`},
    {id: `boneshaper04`, perks: 1, text: `Replace one +0 card with one +1 "Kill the attacking summon to instead add +4" card`},
    {id: `boneshaper05`, perks: 1, text: `Add three "Heal 1, Target Boneshaper" (rolling) cards`},
    {id: `boneshaper05`, perks: 1, text: `Add three "Heal 1, Target Boneshaper" (rolling) cards`},
    {id: `boneshaper06`, perks: 1, text: `Add one "+2 Infuse Earth or Dark" card`},
    {id: `boneshaper06`, perks: 1, text: `Add one "+2 Infuse Earth or Dark" card`},
    {id: `boneshaper06`, perks: 1, text: `Add one "+2 Infuse Earth or Dark" card`},
    {id: `boneshaper07`, perks: 1, text: `Ignore scenario effects and add two +1 cards`},
    {id: `boneshaper08`, perks: 1, text: `Immediately before each of your rests, you may kill one of your summons to perform Bless, self`},
    {id: `boneshaper09`, perks: 1, text: `Once each scenario, when any character ally would become exhausted by suffering damage, you may suffer 2 damage to reduce their hit point value to 1 instead`},
    {id: `boneshaper10`, perks: 2, text: `At the start of each scenario, you may play a level 1 card from your hand to perform a summon action of the card (this perk costs two perk marks)`},
  ],
  
  class_notes: ``,
 
  flavour: `Aesthers were once human, but a tragedy long ago caused them to lose their physical form, scattering it across the infinite planes. Those who willed their psyche back together returned to a world they no longer recognized, and so they left, traveling the planes in search of knowledge and other unknowable things. Occasionally they return, but their purposes are varied, and their methods bewildering to others.
  Aesthers draw energy from the planes, and the planes are full of useful and terrible things. Boneshapers are able to tap into the wells of life found in other planes and infuse it into living things on this one - or at least things that were once living. Invariably, some of the Boneshaper’s own life force is transferred with it, and many go mad through the constant push and pull of life and death. Very few are capable of taming the wild energy and shaping it to their will.`,

  masteries: [
    {key: `_boneshaper01`, text: `Kill at least fifteen of your summons`},
    {key: `_boneshaper02`, text: `Play a summon action on your first turn, have the summon kill at least six enemies, and keep it alive for the entire scenario`},
  ]
}

hg.data.classes.germinate = {
  key       : 'germinate',
  print     : 'Germinate',
  hand_size : [7,7],
  complexity: 5,
  elemental_affinities: ['Fire','Ice','Light'],
  traits    : ['arcane', 'chaotic', 'nimble'],
  ancestry  : 'harrower',
  melee     : 4,
  ranged    : 4,
  mobility  : 3,
  support   : 2,
  defense   : 3,
  control   : 3,
  health    : [
    8,  9, 11, 12, 14, 15, 17, 18, 20
  ],
  perks: [
    {id: `germinate01`, perks: 1, text: `Replace one -2 card with one +0 card`},
    {id: `germinate02`, perks: 1, text: `Replace one -1 card with one +0 "Consume Wild element:Infuse Wild Element" card`},
    {id: `germinate02`, perks: 1, text: `Replace one -1 card with one +0 "Consume Wild element:Infuse Wild Element" card`},
    {id: `germinate02`, perks: 1, text: `Replace one -1 card with one +0 "Consume Wild element:Infuse Wild Element" card`},
    {id: `germinate03`, perks: 1, text: `Replace one +0 card with one +1 Poison card`},
    {id: `germinate03`, perks: 1, text: `Replace one +0 card with one +1 Poison card`},
    {id: `germinate04`, perks: 1, text: `Replace one +0 card with one +1 Wound card`},
    {id: `germinate04`, perks: 1, text: `Replace one +0 card with one +1 Wound card`},
    {id: `germinate05`, perks: 1, text: `Replace two +0 cards with two Pierce 3 (rolling) cards`},
    {id: `germinate06`, perks: 1, text: `Add two +1 Push 3 cards`},
    {id: `germinate07`, perks: 1, text: `Add one 2x "Brittle, self" card`},
    {id: `germinate08`, perks: 1, text: `Add one +1 "Regenerated, self" (rolling) card ☐ Ignore scenario effects`},
    {id: `germinate08`, perks: 1, text: `Add one +1 "Regenerated, self" (rolling) card ☐ Ignore scenario effects`},
    {id: `germinate09`, perks: 1, text: `Whenever you short rest, you may remove one negative condition from one ally within range 3`},
    {id: `germinate10`, perks: 1, text: `Once each scenario, when you would give yourself a negative condition, prevent the condition`},
    {id: `germinate11`, perks: 2, text: `Whenever you perform an action with a lost icon, you may discard one card to Recover one card from your discard pile or equal or lower level (this perk costs two perk marks)`},
  ],
  
  class_notes: ``,
 
  flavour: `A Harrower is not one single life form, but rather a swarm of thousands of insects gathered to form a hive mind intelligence. Their existence, in fact, predates all other sentient life, going back to the volatile early ages of the world. They have always maintained their distance from the operations of humans and other species, concerning themselves with their own disparate machinations. When Harrowers do interact with others, they shape their swarms into a vaguely human form, so as to minimize the other party’s discomfort.
  Not all Harrowers, however, act as a single unit. Rarely, a swarm develops in such a way that they cannot come to a single mind. Instead, they settle into a stable equilibrium of two wills, which compete to exert influence over their collective form. The Geminate, as the phenomenon is called, will work in harmony to shift between two wildly different configurations, each with their own abilities and desires.`,
  
  masteries: [
    {key: `_germinate01`, text: `Switch forms each round`},
    {key: `_germinate02`, text: `Lose at least one ability card each round`},
  ],
}

hg.data.classes.pyroclast = {
  key       : 'pyroclast',
  print     : 'Pyroclast',
  stealth   : 'meteor',
  
}
