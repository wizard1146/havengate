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
  let characterResources = {
    gold: 30,
    lumber: 0, metal: 0, hide: 0,
    arrowvine: 0, flamefruit: 0, axenut: 0, rockroot: 0, corpsecap: 0, snowthistle: 0,
  }

  class Character {
    constructor(args) {
      this.uuid    = uuid()
      this.name    = false
      this.class   = false
      this.level   = 1
      this.xp      = 0
      this.notes   = ``
      
      Object.entries(characterResources).forEach(([k,v],index) => {
        this[k]  = v
      })
      
      if (args) Object.entries(args).forEach(([k,v],i) => {
        this[k]  = v
      })
      
      // Set Experience
      console.log(this.xp)
      this.setExperience( this.xp )
    }
    
    static async create() {
      return new Character()
    }
    
    setExperience(x) {
      let t = Object.entries(hg.data.levels)
      for (var i = 0; i < t.length; i++) {
        let c = t[i][0]
        let v = t[i][1]
        console.log(c,v,x)
        if (x > v) {
          console.log(c)
          break
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
