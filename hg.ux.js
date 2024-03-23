hg = typeof hg != 'undefined' ? hg : {}

hg.ux = (function() {
  let settings = {
    list_header_font: `"IM Fell Great Primer SC"`,
    list_header_size: `6vmin`,
    list_item_height: `4vh`,
    list_name_font  : `"Stick No Bills"`,
    list_name_size  : `4vmin`,
    list_class_font : `"Julee"`,
    list_class_size : `3vmin`,
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
  let noise_base64 = /* https://codepen.io/stephen1on1/pen/VeyNZo */ `data:image/png;base64,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`

  // initialise function
  let initialise = function() {
    body = document.querySelector('body')
    body.insertAdjacentHTML('beforeend', '<div id="surface"><div id="area" class="noisy"></div></div>')
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

  // display list of characters
  let list = function( arr ) {
    let s  = ``
        s += `<div class="list_header" id="">HAVENGATE</div>`
    
    let t  = ``
        t += `<div class="list_item" id="_UUID" onclick="raiseEvent(\'${events.list_selectUUID}\', \'_UUID\', document.querySelector(\'#area\'))">`
        t += `   `
        t += `<span class="list_icon">_ICON</span>`
        t += `<span class="list_name">_NAME</span><span class="list_level">_LEVEL</span><span class="list_class">_CLASS</span>`
        t += `</div>`
    // Wipe
    wipe()
    // Assemble
    if (arr.length) {
     arr.forEach(c => {
      s += t
        .replace(/_UUID/g,  c.uuid )
        .replace('_NAME',  ' ' + c.name + '  ' )
        .replace('_LEVEL', 'Level ' + c.level + ' ')
        .replace('_CLASS', (classMap[c.class] ? classMap[c.class] : c.class) + ' ')
        .replace('_ICON',  `<div id="${c.class.toLowerCase()}" class="class-icon list_icon"></div>`)
     })
    }
    // New 
    let p  = ``
        p += `<div class="list_item" id="list_add">`
        p += `+`
        p += `</div>`
    s += p
    // Add
    area.insertAdjacentHTML('beforeend', s) 
  }
  
  // character
  let character = function( data ) {
    let s  = ``
        s += `<div class="character_class">${data.class}</div>`
        
    
        
    // Add
    area.insertAdjacentHTML('beforeend', s) 
  }
  
  // wipe function
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
  @import url('https://fonts.googleapis.com/css2?family=Hina+Mincho&family=Julee&family=Stick+No+Bills:wght@200..800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=IM+Fell+Great+Primer+SC&display=swap');

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
     flex-direction  : column;
     background-color: #7293DB;
   }
   
   .list_header {
     text-align : center;
     color      : rgba( 1, 1, 1, 0.35 );
     margin-left  : 13.6vmin;
     margin-right : 13.6vmin;
     margin-bottom:  0.2vmin;
     border-bottom: 1px solid rgba( 1, 1, 1, 0.35 );
     font-size  : ${settings.list_header_size};
     font-family: ${settings.list_header_font}, serif;
     font-weight: 400;
     font-style : normal;
     user-select: none;
   }

   .list_item {
     padding : 0.8vmin;
     height  : ${settings.list_item_height};
     cursor  : pointer;
     white-space: pre-wrap;
     user-select: none;
   }
   .list_item:hover {
     background-color: #5077CC;
     background-image: url(${noise_base64});  
   }
   .list_item span {
     vertical-align: middle;
     line-height   : normal;
   }
   .list_icon {
     display : inline-block;
     position: relative;
     transform: translate( 0%, -0.14vmin );
     height  : ${settings.list_item_height};
     width   : ${settings.list_item_height};
   }

   .list_name {
     font-size   : ${settings.list_name_size};
     font-family : ${settings.list_name_font}, sans-serif;
     font-optical-sizing: auto;
     font-weight : 400;
     font-style  : normal;
     transition  : all 120ms;
   }
   .list_item:hover .list_name {
     letter-spacing: 0.027rem;
   }

   .list_level, .list_class {
     color         : rgba( 13, 13, 13, 0.55 );
     vertical-align: middle;
     font-size     : ${settings.list_class_size};
     font-family   : ${settings.list_class_font};
     font-weight   : 400;
     font-style    : normal;
     transition    : all 140ms;
   }
   .list_class {
     transition    : all 270ms;
   }
   .list_item:hover .list_level, .list_item:hover .list_class {
     color         : rgba( 231, 231, 231, 0.58 );
   }
   .list_item:hover .list_class {
     letter-spacing: 0.093rem;
   }
   
   #list_add {
     height        : ${settings.list_item_height};
     line-height   : ${settings.list_item_height};
     font-size     : ${settings.list_name_size};
     font-family   : ${settings.list_class_font}, sans-serif;
     font-optical-sizing: auto;
     font-weight   : 400;
     vertical-align: middle;
     font-style    : normal;
     text-align    : center;
     transition    : all 270ms;
   }
   #list_add:hover {
     color         : rgba( 231, 231, 231, 0.58 );
   }

   @media screen and (max-width: 600px) {
    .list_header {
       font-size : 9vmin;
     }
     .list_name {
       font-size : 6.1vmin;
     }
    .list_level, .list_class {
       font-size : 4.4vmin;
     }
     #list_add {
       font-size : 6.4vmin;
     }
   }
   
   .noisy {
     background-image: url(${noise_base64});  
   } 
  `

  return {
    init: initialise,
    list: list,
  }
})()
