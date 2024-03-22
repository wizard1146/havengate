hg = typeof hg != 'undefined' ? hg : {}

hg.ux = (function() {
  let settings = {
    list_item_height: `3.6vh`,
    list_name_font  : `"Stick No Bills"`,
    list_name_size  : `4vw`,
    list_class_font : `"Julee"`,
    list_class_size : `3vw`,
  }
  let events = {
    /* -><- */
    list_selectUUID  : `list-select-uuid`,
    /* <= */
    list_UUIDselected: `list-uuid-selected`,
  }
  let classMap = {
    bannerspear: 'Banner Spear',
  }
  let CSSIdentifier = `hg.ux.rules`
  let body, surface, area;

  let initialise = function() {
    body = document.querySelector('body')
    body.insertAdjacentHTML('beforeend', '<div id="surface"><div id="area"></div></div>')
    surface = document.querySelector('#surface')
    area    = document.querySelector('#area')

    // Manage CSS
    document.querySelector(`.${CSSIdentifier}`)?.remove()
    addCSS(cssRules)

    // Eventify
    window.raiseEvent = raiseEvent
    area.addEventListener(events.list_selectUUID, (e) => {
      // Pass the event OUT
      raiseEvent( events.list_UUIDselected, e.detail, area )
      // Handle the interval UX bits
      
    })

    return surface
  }

  let list = function( arr ) {
    let s = ``
    let t = `<div class="list_item" id="_UUID" onclick="raiseEvent(\'${events.list_selectUUID}\', \'_UUID\', document.querySelector(\'#area\'))"><span class="list_name">_NAME</span><span class="list_level">_LEVEL</span><span class="list_class">_CLASS</span><span class="list_icon">_ICON</span></div>`
    // Wipe
    wipe()
    // Assemble
    arr.forEach(c => {
      s += t
        .replace(/_UUID/g,  c.uuid )
        .replace('_NAME',  '   ' + c.name + '  ' )
        .replace('_LEVEL', 'Level ' + c.level + ' ')
        .replace('_CLASS', (classMap[c.class] ? classMap[c.class] : c.class) + ' ')
        .replace('_ICON',  `<div id="${c.class.toLowerCase()}" class="class-icon list_icon"></div>`)
    })
    // Add
    area.insertAdjacentHTML('beforeend', s) 
  }

  let wipe = function() {
    area.innerHTML = ''
  }

  // helper functions
  let addCSS = function(rule, container, ruleIdentifier) {
    let rc = ruleIdentifier ? ruleIdentifier : CSSIdentifier
    let output = '<div class="' + rc + '" style="display:none;">&shy;<style>' + rule + '</style></div>'
    document.querySelectorAll(rc).forEach(e => e.remove())
    if (container) {
      document.querySelector(container).insertAdjacentHTML('beforeend', output)
    } else {
      document.body.insertAdjacentHTML('beforeend', output)
    }
  }

  let raiseEvent = function(event, datum, target) { let t = target ? target : document.querySelector('body'); return t.dispatchEvent(new CustomEvent(event, {detail: datum})) }

  let cssRules = `
  @import url('https://fonts.googleapis.com/css2?family=Julee&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Hina+Mincho&family=Julee&family=Stick+No+Bills:wght@200..800&display=swap');

   #surface {
     position: absolute;
     top     : 0%;
     left    : 0%;
     width   : 100%;
     height  : 100%;
   }
   #area {
     display : flex;
     width   : 100%;
     height  : 100%;
     flex-direction: column;
     background    : #7293DB;
   }

   .list_item {
     padding : 0.3em;
     height  : ${settings.list_item_height};
     cursor  : pointer;
     white-space: pre-wrap;
   }
   .list_item:hover {
     background    : #5077CC;
   }
   .list_item span {
     vertical-align: middle;
     line-height   : normal;
   }
   .list_icon {
     display : inline-block;
     height  : ${settings.list_item_height};
     width   : ${settings.list_item_height};
   }

   .list_name {
     font-size   : ${settings.list_name_size};
     font-family : ${settings.list_name_font}, sans-serif;
     font-optical-sizing: auto;
     font-weight : 400;
     font-style  : normal;
   }

   .list_level, .list_class {
     vertical-align: middle;
     font-size     : ${settings.list_class_size};
     font-family   : ${settings.list_class_font};
     font-weight   : 400;
     font-style    : normal;
   }
  `

  return {
    init: initialise,
    list: list,
  }
})()
