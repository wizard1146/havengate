hg = typeof hg != 'undefined' ? hg : {}

hg.nexus = (function() {
  let db;
  let vars = {
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
    
    db = await hg.db.init('uuid', m)
    
    hg.ux.init()
    
    return db
  }
  

  return {
    init          : initialise,
  }
})()
