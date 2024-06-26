hg = typeof hg != 'undefined' ? hg : {}

hg.nexus = (function() {
  // globals
  let _cs = hg.css
  let _db = hg.db
  let _ux = hg.ux
  let _co = hg.constructs

  // variables
  let db, area;
  let vars = {
  }
  let events = {
    /* -><- */
    /* => */
    list_UUIDselected  : `list-uuid-selected`,
    character_back     : `character-back`,
    navigate_back      : `navigate-back`,
    pass_save_create   : `pass-save-create`,
    pass_save_character: `pass-save-character`,
    deck_shuffled      : `deck-shuffled`,
    ux_shuffle_deck    : `shuffle-deck`,
  }
  
  let initialise = async function() {
    // Initialise the database
    let c = await new hg.constructs.character()
    let m = []
    Object.keys(c).forEach((e) => {
      m.push({
        key: e,
        unique: e == 'uuid' ? true : false
      })
    })
    
    db = await _db.init('uuid', m)
    
    // Initialise CSS
    _cs.init()
    // Initialise the UX
    _ux.init()
    
    // Begin listening
    listen()

    return db
  }

  let listen = function() {
    area = document.querySelector('#area')
    
    area.addEventListener( events.list_UUIDselected, getCharacter )
    area.addEventListener( events.character_back, getList )
    area.addEventListener( events.navigate_back, getList )
    area.addEventListener( events.pass_save_create, createCharacter )
    area.addEventListener( events.pass_save_character, saveCharacter )

    area.addEventListener( events.ux_shuffle_deck, shuffleDeck )
    area.addEventListener( events.deck_shuffled, deckShuffled )
    
  }
  
  let getCharacter = async function(e) {
    let c = await _db.getCharacter(e.detail)

    c = new _co.character(c)
    c.deck = await _co.modifierDeck.new( c )

    _ux.char(c)
  }

  let getList = async function() {
    let r = await _db.getList()

    _ux.list( r )
  }
  
  let createCharacter = async function(e) {
    // Template the new character
    let nc = new _co.character(e.detail)
    // Write new character to DB
    await _db.writeCharacter( nc )
    // Display the character
    _ux.char( nc )
  }
  
  let saveCharacter = async function(e) {
    // Template the new character
    let nc = new _co.character(e.detail)
    // Write new character to DB
    await _db.writeCharacter( nc )
  }

  let shuffleDeck = function(e) {
    let c = e.detail
    if (c.deck) {
      c.deck.shuffle()
    }
  }

  let deckShuffled = async function(e) {
    console.log(e.detail)
  }

  return {
    init          : initialise,
    list          : getList,
  }
})()
