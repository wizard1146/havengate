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
        
        res( e.target.result )
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
        rej( console.log(`Error retrieving ${uuid}!`))
      }
      
      r.onsuccess = (e) => {
        if (r.result) {
          res( r.result )
        } else {
          rej( console.log(`Object ${uuid} not found!`) )
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
        rej( console.log(`Error writing ${data}!`) )
      }
      r.onsuccess = (e) => {
        res( console.log(`Wrote data ${data}!`))
      }
    })
  } 

  return {
    init          : initialise,
    getCharacter  : getCharacter,
    writeCharacter: writeCharacter,
  }
})()