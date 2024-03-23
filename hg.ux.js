hg = typeof hg != 'undefined' ? hg : {}

hg.ux = (function() {
  let settings = {
    // UX Settings for Header
    header_height   : `5.1rem`,
    header_height_m : `3.7rem`,
    resource_icon_size: `42px`,

    // UX Settings for List Page
    list_header_font: `"IM Fell Great Primer SC"`,
    list_header_size: `6vmin`,
    list_item_height: `4vh`,
    list_name_font  : `"Stick No Bills"`,
    list_name_size  : `4vmin`,
    list_class_font : `"Julee"`,
    list_class_size : `3vmin`,

    // UX Settings for Character Page
    character_header_font  : `"IM Fell Great Primer SC"`,
    character_header_size  : `6vmin`,
    character_save_height  : `33px`,

    character_class_font   : `"Stick No Bills"`,
    character_class_fsize  : `8.4vmin`,
    character_class_height : `13vmin`,
    character_class_lineHeight: `15vmin`,

    character_label_font   : `"Stick No Bills"`,
    character_label_fsize  : `6vmin`,
    character_label_fsize_m: `6vmin`,
    character_label_width  : `11ch`,
    character_label_width_m: `11ch`,
    character_label_padding: `0.8ch`,

    character_value_font   : `"Macondo"`,
    character_value_fsize  : `6vmin`,

    character_resource_font : `"Stick No Bills"`,
    character_resource_fsize: `5.1vmin`,
    character_resource_input: `5vmin`,
  }
  let events = {
    /* -><- */
    list_selectUUID  : `list-select-uuid`,
    /* <= */
    list_UUIDselected: `list-uuid-selected`,
  }
  let classMap = {
    bannerspear: 'Banner Spear',
    drifter    : 'Inox Drifter',
  }
  let vars = {
    resources: ['lumber','metal','hide','arrowvine','flamefruit','axenut','rockroot','corpsecap','snowthistle'],
    herbs    : ['arrowvine','flamefruit','axenut','rockroot','corpsecap','snowthistle'],
  }
  let CSSIdentifier = `hg.ux.rules`
  let body, surface, area;
  let noise_base64 = /* https://codepen.io/stephen1on1/pen/VeyNZo */ `data:image/png;base64,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`
  let save_base64 = /* https://www.pngall.com/save-png/download/96487 */`data:image/png;base64,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`
  let back_base64 = /* https://cdn.iconscout.com/icon/free/png-256/free-back-arrow-1767507-1502574.png */ `data:image/png;base64,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`

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
    // Assemble
    if (arr.length) {
     arr.forEach(c => {
      s += t
        .replace(/_UUID/g,  c.uuid )
        .replace('_NAME',  ' ' + c.name + '  ' )
        .replace('_LEVEL', 'Level ' + c.level + ' ')
        .replace('_CLASS', (classMap[c.class.toLowerCase()] ? classMap[c.class.toLowerCase()] : c.class) + ' ')
        .replace('_ICON',  `<div id="${c.class.toLowerCase()}" class="class-icon list_icon"></div>`)
     })
    }
    // New 
    let p  = ``
        p += `<div class="list_item" id="list_add">`
        p += `+`
        p += `</div>`
    s += p
    // Wipe
    wipe()
    // Add
    area.insertAdjacentHTML('beforeend', s) 
  }
  
  // character
  let character = function( data ) {
    let c  = classMap[data.class.toLowerCase()] ? classMap[data.class.toLowerCase()] : data.class

    let s  = ``
        s += `<div class="character_back" onclick="raiseEvent(\'\')"><img src="${back_base64}"></img></div>`
        s += `<div class="list_header" id="">HAVENGATE</div>`
        s += `<div class="character_save" onclick="raiseEvent(\'\')"><img src="${save_base64}"></img></div>`
        s += `<div class="character_class">${c}</div>`
        s += `<div class="character_name"><div class="character_label">Name:</div><input class="character_value" value="${data.name}"></input></div>`
        s += `<div class="character_level"><div class="character_label">Level:</div><div class="character_value">${data.level}</div></div>`
        s += `<div class="character_xp"><div class="character_label">XP:</div><input class="character_value" value="${data.xp}"></input></div>`
        s += `<div class="character_gold"><div class="character_label">Gold:</div><input class="character_value" value="${data.gold}"></input></div>`
       
        // Resources
        s += `<div id="character_resources">`
        vars.resources.forEach(res => {
          s += `<div id="character_resource_${res}" class="character_resource">`
          s += `<img class="resource-icon" src="assets/resource_${res}.png"></img>`
          s += `<div class="resource_decrement" onclick="">-</div>`
          s += `<input type="number" max="100" min="0" value="${data[res]}" id=""></input>`
          s += `<div class="resource_increment" onclick="">+</div>`
          s += `</div>`
        })
 
        s += `</div>`

        // Notes
        s += `<div class="character_notes"><div class="character_notes_label">Notes:</div><textarea></textarea></div>`


    // Wipe
    wipe()
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
  @import url('https://fonts.googleapis.com/css2?family=Macondo&display=swap');

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
     height     : ${settings.header_height};
     line-height: ${settings.header_height};
     text-align : center;
     color      : rgba( 1, 1, 1, 0.35 );
     margin-left  : ${settings.header_height};
     margin-right : ${settings.header_height};
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
   
   .noisy {
     background-image: url(${noise_base64});  
   } 

   .character_name > div,
   .character_level > div,
   .character_xp > div, 
   .character_gold > div {
     display: inline-block;
   }

   .character_back,
   .character_save {
     position   : absolute;
     top        : 0%;
     width      : ${settings.header_height};
     height     : ${settings.header_height};
   }
   .character_back {
     left     : 0%;
   }
   .character_save {
     right    : 0%;
   }
   .character_back:hover,
   .character_save:hover {
     background: rgba( 255, 255, 255, 0.08 );
   }
   .character_back:active,
   .character_save:active {
     background: rgba( 255, 255, 255, 0.11 );
   }

   .character_back img,
   .character_save img {
     position   : absolute;
     left       : 50%;
     top        : 50%;
     transform  : translate( -50%, -50% );
     width         : calc(70%);
     height        : calc(70%);
     border             : none;
     outline            : none;
     background-size    : contain;
     background-repeat  : no-repeat;
     background-position: center;
     filter             : saturate(0%) brightness(30%) contrast(140%) opacity(50%);
   }

   .character_class,
   .character_name,
   .character_level,
   .character_xp,
   .character_gold {
     padding-left: 4vmin;
   }
   .character_class {
     height     : ${settings.character_class_height};
     line-height: ${settings.character_class_lineHeight};
     text-align : center;
     font-family: ${settings.character_class_font};
     font-size  : ${settings.character_class_fsize};
   }

   .character_label {
     width        : ${settings.character_label_width};
     padding-right: ${settings.character_label_padding};
     font-family  : ${settings.character_label_font};
     font-size    : ${settings.character_label_fsize};
     text-align   : right;
     color        : rgba( 35, 35, 35, 1.00 );
   }
   .character_value {
     font-family  : ${settings.character_value_font};
     font-size    : ${settings.character_value_fsize};
   }

   input.character_value  {
     background   : rgba( 255, 255, 255, 0.02 );
     border       : none;
     outline      : none;
     width        : 13ch;
   }
   .character_xp input.character_value,
   .character_gold input.character_value {
     width        : 6ch;
   }

   #area .resource-icon  { filter: saturate(0%) brightness(50%) contrast(170%); }

   #character_resources {
     display: flex;
     flex-wrap    : wrap;
     padding-top  : 1.1ch;
     padding-left : 10%;
     padding-right: 10%;
     width       : 80%;
   }
   .character_resource {
     display: flex;
     padding-left: 0.9ch;
     padding-right: 0.9ch;
   }
   .character_resource .resource_decrement,
   .character_resource input,
   .character_resource .resource_increment {
     display : inline-block;
     font-family: ${settings.character_resource_font};
     font-size  : ${settings.character_resource_fsize};
   }
   .character_resource .resource_decrement,
   .character_resource .resource_increment {
     padding-left : 0.7ch;
     padding-right: 0.7ch;
     text-align   : center;
     line-height  : ${settings.resource_icon_size};
   }
   .character_resource input {
     background: rgba( 255, 255, 255, 0.06 );
     border    : none;
     outline   : none;
     text-align: center;
     min-width : 40px;
     width     : ${settings.character_resource_input};
     user-select: auto;
   }
   .character_resource .resource_decrement {
     border-top-left-radius    : 6px;
     border-bottom-left-radius : 6px;
   }
   .character_resource .resource_increment {
     border-top-right-radius   : 6px;
     border-bottom-right-radius: 6px;
   }
   .character_resource .resource_decrement:hover,
   .character_resource .resource_increment:hover {
     background: rgba( 255, 255, 255, 0.08 );
   }
   .character_resource .resource_decrement:active,
   .character_resource .resource_increment:active {
     background: rgba( 255, 255, 255, 0.11 );
   }

 .resource-icon {
   width : ${settings.resource_icon_size};
   height: ${settings.resource_icon_size};
   background-size: cover;
 }
   .resource-icon.lumber { background-image: url('assets/resource_lumber.png'); }
   .resource-icon.metal  { background-image: url('assets/resource_metal.png'); }
   .resource-icon.hide   { background-image: url('assets/resource_hide.png'); }

   .resource-icon.arrowvine   { background-image: url('assets/resource_arrowvine.png'); }
   .resource-icon.flamefruit  { background-image: url('assets/resource_flamefruit.png'); }
   .resource-icon.axenut      { background-image: url('assets/resource_axenut.png'); }
   .resource-icon.rockroot    { background-image: url('assets/resource_rockroot.png'); }
   .resource-icon.corpsecap   { background-image: url('assets/resource_corpsecap.png'); }
   .resource-icon.snowthistle { background-image: url('assets/resource_snowthistle.png'); }

   @media screen and (max-width: 600px) {
    .list_header,
    .character_back,
    .character_save {
      height       : ${settings.header_height_m};
    }
    .list_header {
      margin-left  : ${settings.header_height_m};
      margin-right : ${settings.header_height_m};
    }
    .character_back {
      line-height  : ${settings.header_height_m};
      width        : ${settings.header_height_m};
      height       : ${settings.header_height_m};
    }
    .character_save {
      width        : ${settings.header_height_m};
      height       : ${settings.header_height_m};
    }

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
     .character_back {
       font-size : 9vmin;
     }
   }
  `

  return {
    init: initialise,
    list: list,
    char: character,
  }
})()
