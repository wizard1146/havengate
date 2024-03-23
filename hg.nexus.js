hg = typeof hg != 'undefined' ? hg : {}

hg.nexus = (function() {
  // globals
  let _db = hg.db
  let _ux = hg.ux

  // variables
  let db, area;
  let vars = {
  }
  let events = {
    /* -><- */
    /* => */
    list_UUIDselected: `list-uuid-selected`,
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
    
    // Initialise the UX
    _ux.init()
    
    // Begin listening
    listen()

    return db
  }

  let listen = function() {
    area = document.querySelector('#area')
    
    area.addEventListener( events.list_UUIDselected, getCharacter)
  }
  
  let getCharacter = async function(e) {
    console.log(e)
    let c = await _db.getCharacter(e.detail)
    console.log(c)

    _ux.char(c)
  }

  let getList = async function() {
    let r = await _db.getList()

    _ux.list( r )
  }

  return {
    init          : initialise,
    list          : getList,
  }
})()
