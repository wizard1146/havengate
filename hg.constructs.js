hg = typeof hg != 'undefined' ? hg : {}

hg.constructs = (function() {
  let ModDeckDefaults = [
     -2,
     -1,-1,-1,-1,-1,
      0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1,
      2,
      'null',
      'crit',
  ]

  class Character {
    constructor() {
      
    }
    
    static async create() {
      return new Character()
    }
  }

  class ModDeck {
    constructor() {
      this.deck = []
      ModDeckDefaults.forEach(card => {
        this.deck.push(new ModCard(card))
      })
    }

    static async new(arg) {
      return new ModDeck(arg)
    }
  }

  class ModCard {
    constructor(mod, args) {
      this.modifier = mod ? mod : 0
      this.add      = false
      this.roll     = false
      this.bless    = false
      this.curse    = false
      this.shuffle  = false
      this.origin   = args ? (args?.origin ? args?.origin : 'default') : 'default'
    }
  }

  return {
    modifierDeck: ModDeck,
  }
})()
