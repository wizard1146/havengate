hg = typeof hg != 'undefined' ? hg : {}

hg.data = {}

hg.data.classes = {}

hg.data.classes.drifter = {
  hand_size: 12,
  complexity: 1,
  elemental_affinities: [],
  traits: ['outcast', 'resourceful', 'strong'],
  ancestry: 'inox',
  melee   : 4,
  ranged  : 4,
  mobility: 3,
  support : 4,
  defense : 4,
  control : 1,
  health  : [
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
