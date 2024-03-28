hg = typeof hg != 'undefined' ? hg : {}

hg.ux = (function() {
  /* External data */
  let _levels  = hg.data.levels
  let _classes = hg.data.classes

  let settings = {
  
  }
  let events = {
    /* -><- */
    // Navigation
    navigate_back    : `navigate-back`,
    save_create      : `save-create`,
    save_character   : `save-character`,
    
    list_selectUUID  : `list-select-uuid`,
    character_selector_switch: `character-selector-switch`,
    swap_to_Create   : `swap-to-create`,
    
    create_classPicker_open  : `create-classPicker-open`,
    create_classPicker_choose: `create-classPicker-choose`,
    
    modal_close      : `modal-close`,
    /* <= */
    list_UUIDselected: `list-uuid-selected`,
    character_back   : `character-back`,
    pass_save_create   : `pass-save-create`,
    pass_save_character: `pass-save-character`,
    
    character_save   : `character-save`,
  }
  let classMap = {
    bannerspear: 'Banner Spear',
    drifter    : 'Inox Drifter',
  }
  let vars = {
    resources: ['lumber','metal','hide','arrowvine','flamefruit','axenut','rockroot','corpsecap','snowthistle'],
    herbs    : ['arrowvine','flamefruit','axenut','rockroot','corpsecap','snowthistle'],
  }
  let maximumXP = 500
  let CSSIdentifier = `hg.ux.rules`
  let body, surface, area, character;
  
  let noise_base64 = hg.base64.noise
  let save_base64  = hg.base64.icon_save
  let back_base64  = hg.base64.icon_back
  let inv_base64   = hg.base64.icon_inventory
  let ref_base64   = hg.base64.icon_reference
  let deck_base64  = hg.base64.icon_modDeck
  let perks_base64 = hg.base64.icon_perks
  
  // initialise function
  let initialise = function() {
    body = document.querySelector('body')
    body.insertAdjacentHTML('beforeend', '<div id="surface"><div id="area" class="noisy"></div></div>')
    surface = document.querySelector('#surface')
    area    = document.querySelector('#area')

    // Eventify
    window.raiseEvent = raiseEvent
    area.addEventListener(events.list_selectUUID, (e) => {
      // Pass the event OUT
      raiseEvent( events.list_UUIDselected, e.detail, area )
      // Handle the internal UX bits
      
    })
    area.addEventListener( events.character_selector_switch, (e) => {
      // Handle the internal UX bits
      swapSelector(e.detail)
    })
    area.addEventListener( events.swap_to_Create, (e) => {
      create()
    })
    area.addEventListener( events.save_create, (e) => {
      let data = harvestCreate()
      raiseEvent( events.pass_save_create, data, area )
    })
    area.addEventListener( events.create_classPicker_open, (e) => {
      createClassPickerOpen()
    })
    area.addEventListener( events.modal_close, (e) => {
      document.querySelector('#modal').remove()
    })
    area.addEventListener( events.create_classPicker_choose, (e) => {
      document.querySelector('#create_class .create_value').innerText = classMap[e.detail] ? classMap[e.detail] : properCase(e.detail)
      document.querySelector('#create_class .create_value').setAttribute('value', e.detail)
      document.querySelector('#modal').remove()
    })
    area.addEventListener( events.character_save, (e) => {
      let data = harvestCharacter(character)
      raiseEvent( events.pass_save_character, data )
    })

    return surface
  }
  
  let render = function(str) {
    wipe()
    area.insertAdjacentHTML('beforeend', str)
  }

  // display list of characters
  let list = function( arr ) {
    let s  = ``
        s += `<div class="list_header" id="">HAVENGATE</div>`
    
    let t  = ``
        t += `<div class="list_item" id="_UUID" onclick="raiseEvent(\'${events.list_selectUUID}\', \'_UUID\')">`
        t += `   `
        t += `<span class="list_icon">_ICON</span>`
        t += `<span class="list_name">_NAME</span><span class="list_level">_LEVEL</span><span class="list_class">_CLASS</span>`
        t += `</div>`
    // Assemble
    if (arr.length) {
     arr.forEach(c => {
      s += t
        .replace(/_UUID/g,  c.uuid )
        .replace('_NAME',  ' ' + c.name + '  ' )
        .replace('_LEVEL', 'Level ' + c.level + ' ')
        .replace('_CLASS', (classMap[c.class.toLowerCase()] ? classMap[c.class.toLowerCase()] : properCase(c.class)) + ' ')
        .replace('_ICON',  `<div id="${c.class.toLowerCase()}" class="class-icon list_icon"></div>`)
     })
    }
    // New 
    let p  = ``
        p += `<div class="list_item" id="list_add" onclick="raiseEvent(\'${events.swap_to_Create}\')">`
        p += `+`
        p += `</div>`
    s += p
    
    render(s)
  }
  
  /* XP Tables */
  let templateXPTable = function(parent) {
    let t = Object.entries(_levels), a = '', b = '', s = '';
    t.forEach(([k,v],i) => {
      a += `<div class="XPTable_Level_Cell">${k}</div>`
      b += `<div class="XPTable_Experience_Cell">${v}</div>`
    })
    s += `<div id="${parent}_XPTable">`
    s +=   `<div id="${parent}_XPTable_Level">${a}</div>`
    s +=   `<div id="${parent}_XPTable_Experience">${b}</div>`
    s +=   `<div id="${parent}_XPTable_Pointer" class="XPTable_ArrowUp"></div>`
    s += `</div>`
    return s
  }
  let activateXPTable = function(parent, inputElement, outputElement, xp) {
    let t = Object.entries(hg.data.levels)
    // Measure heights and widths
    let y = document.querySelector(`#${parent}_XPTable`)
    let u = document.querySelector(`#${parent}_XPTable_Level`)
    let z = document.querySelector(`#${parent}_XPTable_Experience`)
    let p = document.querySelector(`#${parent}_XPTable_Pointer`)
    let c = document.querySelector('.XPTable_Level_Cell')

    let leftEdge      = u.getBoundingClientRect().x
    let bottomEdge    = y.getBoundingClientRect().height
    let pointerWidth  = p.getBoundingClientRect().width
    let pointerHeight = p.getBoundingClientRect().height
    let cellWidth     = c.getBoundingClientRect().width

    let leftOrigin    = leftEdge - pointerWidth/2
    let topOrigin     = bottomEdge - pointerHeight * 1.7
    
    p.style.left = leftOrigin
    p.style.top  = topOrigin
    
    let a = 0, b = 0, d = 0;
    for (var i = t.length - 1; i > -1; i--) {
      let o = t[i][0]
      let r = t[i][1]
      if (xp >= r) {
        a = o
        b = r
        break
      }
      d = r
    }
    p.style.left = leftOrigin + ((a - 1) * (cellWidth)) + ((xp - b)/(d - b) * cellWidth)

    // Listen to XP change
    inputElement.addEventListener('keyup', (e) => {
      let v = e.target.value
      // Cap the value
      v = Math.min( maximumXP, v )
      // Update the expected Level
      let level = 0
      let res   = 0
      let prior = 0
      for (var i = t.length - 1; i > -1; i--) {
        let m = t[i]
        let lvl = m[0]
        let cut = m[1]
        if (v >= cut) {
          level = lvl
          res = cut
          break;
        }
        prior = cut
      }
      outputElement.innerText = level
      // Update the pointer
      p.style.left = leftOrigin + ((level - 1) * (cellWidth)) + (((v - res))/(prior - res) * cellWidth)
    })
  }
  
  // create
  let create = function() {
    let t = Object.entries(hg.data.levels)
    
    let s  = ``
        s += `<div class="app_back_button" onclick="raiseEvent(\'${events.navigate_back}\',null,document.querySelector(\'#area\'))"><img src="${back_base64}"></img></div>`
        s += `<div class="app_header" id="">HAVENGATE</div>`
        s += `<div id="create_save" class="app_save_button" onclick="raiseEvent(\'${events.save_create}\',null, )"><img src="${save_base64}"></img></div>`
        s += `<div class="create_element" id="create_name"><div id="create_name_label" class="create_label">Name: </div><input class="create_value"></input></div>`
        s += `<div class="create_element" id="create_class"><div id="create_class_label" class="create_label">Class: </div>`
        s += `<div class="create_value" onclick="raiseEvent(\'${events.create_classPicker_open}\',null,document.querySelector('#area'))">pick a class`
        s += `</div>`
        s += `</div>`
        s += `<div class="create_element" id="create_xp"><div id="create_xp_label" class="create_label">XP: </div><input type="number" max="500" min="0" value="0" class="create_value"></input></div>`
        s += `<div class="create_element" id="create_level"><div id="create_level_label" class="create_label">Level: </div><div class="create_value"></div></div>`
        
    let a = '', b = '';
    t.forEach(([k,v],i) => {
      a += `<div class="create_xp_tableHeaderContent">${k}</div>`
      b += `<div class="create_xp_tableFooterContent">${v}</div>`
    })
    let x = ``
    x += `<div id="create_xp_table">`
    x +=   `<div id="create_xp_tableHeader">`
    x +=     a
    x +=   `</div>`
    x +=   `<div id="create_xp_tableFooter">`
    x +=     b
    x +=   `</div>`
    x += `<div id="create_xp_pointer" class="arrow-up"></div>`
    x += `</div>`
    
    x = templateXPTable('create')
    
    s += x
    
    render(s)

    activateXPTable('create', document.querySelector('#create_xp input'), document.querySelector('#create_level .create_value'))
  }
  
  let createClassPickerOpen = function() {
    let c = Object.entries( hg.data.classes )
    let s = ``
    s += `<div id="modal">`
    s += `<div id="modal_close" onclick="raiseEvent(\'${events.modal_close}\')">x</div>`
    s += `<div id="create_classPicker">`
    c.forEach(([k,v],i) => {
      if (v.stealth) {
        
      } else {
        s += `<div class="create_classPicker_element" onclick="raiseEvent(\'${events.create_classPicker_choose}\',\'${v.key}\')">${v.print}</div>`
      }
      console.log(k,v,i)
    })
    s += `</div>`
    s += `</div>`
    
    area.insertAdjacentHTML('beforeend', s)
  }
  
  // character
  let renderCharacter = function( data ) {
    console.log(data)
    // Save data
    character = data
  
    let c  = classMap[data.class.toLowerCase()] ? classMap[data.class.toLowerCase()] : properCase(data.class)

    let s  = ``
        s += `<div class="character_back" onclick="raiseEvent(\'${events.character_back}\',null, )"><img src="${back_base64}"></img></div>`
        s += `<div class="list_header" id="">HAVENGATE</div>`
        s += `<div class="character_save" onclick="raiseEvent(\'${events.character_save}\')"><img src="${save_base64}"></img></div>`
        s += `<div class="character_class">${c}</div>`
        s += `<div class="character_name"><div class="character_label">Name:</div><input class="character_value" value="${data.name}"></input></div>`
        s += `<div class="character_level"><div class="character_label">Level:</div><div class="character_value">${data.level}</div></div>`
        s += `<div class="character_xp"><div class="character_label">XP:</div><input class="character_value" value="${data.xp}"></input></div>`
        s += `<div class="character_gold"><div class="character_label">Gold:</div><input class="character_value" value="${data.gold}"></input></div>`
       
    let m = templateXPTable('character')
    s += m
    
        s += `<div id="character_tray">`
        s += `<div id="character_subtray">`
        s += `</div>`
        s += `<div id="character_selector">`
        s +=   `<div id="character_selector_inventory" class="character_selector" onclick="raiseEvent(\'${events.character_selector_switch}\',\'inventory\')"><img src="${inv_base64}"></img></div>`
        s +=   `<div id="character_selector_perks"     class="character_selector" onclick="raiseEvent(\'${events.character_selector_switch}\',\'perks\')"><img src="${perks_base64}"></img></div>`
        s +=   `<div id="character_selector_reference" class="character_selector" onclick="raiseEvent(\'${events.character_selector_switch}\',\'reference\')"><img src="${ref_base64}"></img></div>`
        s +=   `<div id="character_selector_modDeck"   class="character_selector" onclick="raiseEvent(\'${events.character_selector_switch}\',\'modDeck\')"><img src="${deck_base64}"></img></div>`
        s += `</div>`
 
        s += `</div>`
        

    render(s)
    
    swapSelector('inventory')
    
    // Listen to XP Table
    activateXPTable('character', document.querySelector('.character_xp input'), document.querySelector('.character_level .character_value'), parseInt(data.xp))
  }
  
  let swapSelector = function(which) {
    let s = ``
    let n = document.querySelector('.character_notes textarea')
    let c = hg.data.classes[character.class]
    
    // Update Active tab
    document.querySelector('.character_selector.active')?.classList.remove('active')
    document.querySelector('#character_selector_' + which).classList.add('active')
    // Save any changed data & 
    // Perks
    let m = document.querySelectorAll('#character_perks label');
    let g = []
    if (m) {
      m.forEach(item => {
        if (item.children[0].checked) {
          g.push(item.id)
        }
      })
    }
    if (g.length) { character.perks = g }
    // Notes
    if (n) { character.notes = n.value }
    // Wipe subtray
    document.querySelector('#character_subtray').innerHTML = ''
    
    switch(which) {
      case 'inventory':
        // Resources
        s += `<div id="character_resources">`
        vars.resources.forEach(res => {
          s += `<div id="character_resource_${res}" class="character_resource">`
          s += `<img class="resource-icon" src="assets/resource_${res}.png"></img>`
          s += `<div class="resource_decrement" onclick="">-</div>`
          s += `<input type="number" max="100" min="0" value="${character[res]}" id=""></input>`
          s += `<div class="resource_increment" onclick="">+</div>`
          s += `</div>`
        })
        s += `</div>`
        // Notes
        s += `<div class="character_notes"><div class="character_notes_label">Notes:</div><textarea value="">${character.notes}</textarea></div>`
        break;
      case 'perks':
        if (c) {
          let g = character?.perks ? clone(character?.perks) : []
          let r = {}
          s += `<div id="character_perks">`
          c.perks.forEach(e => {
            r[e.id] = r[e.id] || {count: 0, perks: e.perks, text: e.text}
            r[e.id]['count']++
          })
          Object.entries(r).forEach(([k,v],i) => {
            for (var j = 0; j < v.count; j++) {
              // remove if in character
              let a = g.indexOf(k), b = '';
              if (a != -1) {
                g.splice(a, 1)
                b = 'checked'
              }
              s += `<label id="${k}"><input type="checkbox" ${b}><span class="checkmark"></span></label>`
            }
            s += `<div class="">${v.text}</div><br/>`
          })
          s += `</div>`
        }
        break;
      case 'reference':
        let m = _classes[character.class]
        s += `<div id="character_reference">`
        s += `<div class="flavour">${m.flavour}</div>`
        s += `<div class="information">${m.class_notes}</div>`
        s += `</div>`
        break;
      case 'modDeck':
      let h = ''
      h += '<div id="modDeck">'
      let g = [
 'card_add_0',
 'card_add_1',
 'card_add_2',
 'card_crit',
 'card_null',
 'card_sub_1',
 'card_sub_2',]
 g.forEach( f => {
   console.log(f)
   h += `<div id="modDeck_${f}" class="modDeck_card"></div>`
 })
 h += '</div>'
 s += h

        
        break;
    }
    document.querySelector('#character_subtray').insertAdjacentHTML('beforeend', s)
  } 
  
  // collect Create data
  let harvestCreate = function() {
    return {
      name : document.querySelector('#create_name input').value,
      class: document.querySelector('#create_class .create_value').getAttribute('value'),
      xp   : document.querySelector('#create_xp input').value,
    }
  }
  
  let harvestCharacter = function(character) {
    character.name = document.querySelector('.character_name input').value
    character.xp   = document.querySelector('.character_xp input').value
    character.gold = parseInt(document.querySelector('.character_gold input').value)
    
    // If Notes
    let notes = document.querySelector('.character_notes textarea')
    if (notes) {
      character.notes = notes.value
    }
    // If Perks
    let perks = document.querySelectorAll('#character_perks label');
    let g = []
    if (perks) {
      perks.forEach(item => {
        if (item.children[0].checked) {
          g.push(item.id)
        }
      })
    }
    if (g.length) { character.perks = g }
    
    return character
  }
  
  // wipe function
  let wipe = function() { area.innerHTML = '' }
  
  // helper functions
  let raiseEvent = function(event, datum, target) { let t = target ? target : area; return t.dispatchEvent(new CustomEvent(event, {detail: datum})) }
  let properCase = function(str) { return str.replace( /\w\S*/g, (t) => { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase() } ) }

  /* Copies any object deeply */
  let clone = function(obj) {
      let copy
      if (null == obj || 'object' != typeof obj) { return obj }
      if (obj instanceof String) { return (' ' + obj).slice(1) }  /* https://stackoverflow.com/a/31733628 */
      if (obj instanceof Date) { return new Date().setTime(obj.getTime()) }
      if (obj instanceof Array) {
         copy = []
         for (let i = 0; i < obj.length; i++) { copy[i] = clone(obj[i]) }
         return copy
      }
      if (obj instanceof Object) {
         copy = {}
         for (let attr in obj) { if (obj.hasOwnProperty(attr)) { copy[attr] = clone(obj[attr]) } }
         return copy
      }
      throw new Error('Unable to copy obj! Type not supported.')
  }

  return {
    init: initialise,
    list: list,
    char: renderCharacter,
    create: create,
  }
})()
