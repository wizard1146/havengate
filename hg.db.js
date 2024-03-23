hg = typeof hg != 'undefined' ? hg : {}

hg.db = (function() {
  let db;
  let vars = {
    dbName : 'havengate',
    dbChars: 'characters',
  }

  let loadDB = async function(kp, f) {
    return new Promise(async (res, rej) => {
      let r = window.indexedDB.open( vars.dbName )
      
      r.onerror = (e) => {
        rej( console.log('Error!') )
      }
      
      r.onsuccess = (e) => {
        res( e.target.result )
      }
      
      r.onupgradeneeded = (e) => {
        let os = e.target.result.createObjectStore( vars.dbChars, {keyPath: kp } )
        
        f.forEach((field, index) => {
          os.createIndex( field.key, field.key, {unique: field.unique} )
        })
      }
    })
  }
  
  let initialise = async function(kp, f) {
    db = await loadDB(kp, f)
    
    
    return db
  }
  
  // operations
  let getCharacter = async function( uuid ) {
    return new Promise(async (res, rej) => {
      let t = await db.transaction([ vars.dbChars ])
      let s = t.objectStore( vars.dbChars )
      let r = s.get( uuid )
    
      r.onerror = (e) => {
        rej( new Error(`Unable to retrieve ${uuid}.`) )
      }
      
      r.onsuccess = (e) => {
        if (r.result) {
          res( r.result )
        } else {
          rej( new Error(`Unable to locate ${uuid}.`) )
        }
      }
    })
  }
  
  let writeCharacter = async function( data ) {
    return new Promise(async (res, rej) => {
      let t = await db.transaction([ vars.dbChars ], 'readwrite')
      let s = t.objectStore( vars.dbChars )
      let r = s.put( data )
      
      r.onerror = (e) => {
        rej( new Error(`Unable to write data: ${data}.`) )
      }
      r.onsuccess = (e) => {
        res( console.log(`Wrote data ${data}!`))
      }
    })
  }

  let getList = async function() {
    return new Promise(async (res, rej) => {
      let t = await db.transaction([ vars.dbChars ])
      let s = t.objectStore( vars.dbChars )
      let r = s.getAll()

      r.onerror = (e) => {
        rej( new Error(`Unable to retrieve List.`) )
      }

      r.onsuccess = (e) => {
        if (r.result) {
          res( r.result )
        } else {
          rej( new Error(`Unable to process List.`) )
        }
      }
    })
  }

  return {
    init          : initialise,
    getCharacter  : getCharacter,
    writeCharacter: writeCharacter,
    getList       : getList,
  }
})()
