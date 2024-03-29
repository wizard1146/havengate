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
  
  let ModDeckBindings = {
    card_add_0: 0,
    card_add_1: 1,
    card_add_2: 2,
    card_sub_1: -1,
    card_sub_2: -2,
    card_null : 'null',
    card_crit : 'crit',
  }
  
  let characterResources = {
    gold: 30,
    lumber: 0, metal: 0, hide: 0,
    arrowvine: 0, flamefruit: 0, axenut: 0, rockroot: 0, corpsecap: 0, snowthistle: 0,
  }

  class Character {
    constructor(args) {
      this.uuid     = uuid()
      this.name     = false
      this.class    = false
      this.level    = 1
      this.xp       = 0
      this.notes    = ``
      this.perks    = []
      this.checks   = []
      
      Object.entries(characterResources).forEach(([k,v],index) => {
        this[k]  = v
      })
      
      if (args) Object.entries(args).forEach(([k,v],i) => {
        this[k]  = v
      })
      
      // Set Experience
      this.setExperience( this.xp )
    }
    
    static async create() {
      return new Character()
    }
    
    setExperience(x) {
      let t = Object.entries(hg.data.levels)
      for (var i = t.length - 1; i > -1; i--) {
        let lvl = t[i][0]
        let cut = t[i][1]
        if (x >= cut) {
          this.level = lvl
          break;
        }
      }
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
    
    shuffle() {
      var i = this.deck.length, j, temp;
      while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1))
        // [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]]
        temp = this.deck[j]
        this.deck[j] = this.deck[i]
        this.deck[i] = temp
      }
      return this.deck
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
      this.uri      = this.getBindings(this.modifier)
    }
    
    getBindings(mod) {
      let c;
      let m =  Object.entries(ModDeckBindings)
      for (var i = 0; i < m.length; i++) {
        let k = m[i]
        let a = k[0]
        let b = k[1]
        if (mod == k[1]) {
          c = k[0]
          break
        }
      }
      return c
    }
  }
  
  // Helper functions
  /* UUID: https://stackoverflow.com/a/2117523 */
  let uuid = function() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  return {
    character   : Character,
    modifierDeck: ModDeck,
  }
})()
