hg = typeof hg != 'undefined' ? hg : {}

hg.css = (function() {
  let settings = {
    // UX Settings for Header
    header_height   : `5.1rem`,
    header_height_m : `3.7rem`,
    resource_icon_size: `42px`,
    selector_icon_size: `42px`,
    
    
    // UX Settings for Modal
    modal_close_font        : `"Stick No Bills"`,
    modal_close_fsize       : `6vmin`,
    modal_close_fsize_m     : `8vmin`,

    // UX Settings for List Page
    list_header_font: `"IM Fell Great Primer SC"`,
    list_header_size: `6vmin`,
    list_item_height: `4vh`,
    list_name_font  : `"Stick No Bills"`,
    list_name_size  : `4vmin`,
    list_class_font : `"Julee"`,
    list_class_size : `3vmin`,
    
    // UX Settings for Create Page
    create_label_font   : `"Stick No Bills"`,
    create_label_fsize  : `6vmin`,
    create_label_fsize_m: `6vmin`,
    create_label_width: `11ch`,
    create_value_font   : `"Macondo"`,
    create_value_fsize  : `6vmin`,
    create_value_fsize_m: `6vmin`,
    create_value_input  : `13ch`,
    create_value_input_s: `6ch`,
    create_xp_tableContent_font: `"Stick No Bills"`,
    create_xp_tableContent_fsize: `4vmin`,
    create_xp_tableContent_fsize_m: `4vmin`,
    // UX Settings for Create Modal
    create_classPicker_element_font   : `"Stick No Bills"`,
    create_classPicker_element_fsize  : `6vmin`,
    create_classPicker_element_fsize_m: `8vmin`,

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
    
    character_notes_label_font   : `"Stick No Bills"`,
    character_notes_label_fsize  : `4.3vmin`,
    character_notes_label_fsize_m: `5.6vmin`,
    character_notes_value_width  : `calc(100% - 0% - 0%)`,
    character_notes_value_height : `16ch`,
    character_notes_value_font   : `"Julee"`,
    character_notes_value_fsize  : `4.1vmin`,
    character_notes_value_fsize_m: `3.3vmin`,
    
    /* XP Tables */
    XPTable_Arrow_height     : `6px`,
    XPTable_Cell_width       : `3.6ch`,
    XPTable_Cell_height      : `3.2ch`,
    XPTable_Cell_lineHeight  : `3.8ch`,
    XPTable_Cell_paddingLeft : `0.5ch`,
    XPTable_Cell_paddingRight: `0.8ch`,
  }
  let CSSIdentifier = `hg.css.rules`
  let noise_base64 = hg.base64.noise
  let save_base64  = hg.base64.icon_save
  let back_base64  = hg.base64.icon_back
  let inv_base64   = hg.base64.icon_inventory
  let ref_base64   = hg.base64.icon_reference
  let deck_base64  = hg.base64.icon_modDeck
  let perks_base64 = hg.base64.icon_perks

  let initialise = function() {
    // Manage CSS
    document.querySelector(`.${CSSIdentifier}`)?.remove()
    addCSS(cssRules)
    addCSS(css_XPTables)
    addCSS(css_Icons)
    addCSS(css_modDeck)
    addCSS(css_Mobile)
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
  
  let cssRules = `
  @import url('https://fonts.googleapis.com/css2?family=Hina+Mincho&family=Julee&family=Stick+No+Bills:wght@200..800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=IM+Fell+Great+Primer+SC&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Macondo&display=swap');


  #create_name {
    padding-top   : 3ch;
  }
  .create_element {
    padding-top   : 0.44ch;
    padding-bottom: 0.44ch;
  }
  .create_element div,
  .create_element input {
    display: inline-block;
  }
  .create_label {
    padding-right : 0.8ch;
    font-family   : ${settings.create_label_font};
    font-size     : ${settings.create_label_fsize};
    width         : ${settings.create_label_width};
    text-align    : right;
  }
  .create_value {
    font-family   : ${settings.create_value_font};
    font-size     : ${settings.create_value_fsize};
  }
  input.create_value {
    background    : rgba( 255, 255, 255, 0.03 );
    outline       : none;
    border        : none;
  }
  #create_name input {
    width         : ${settings.create_value_input};
  }
  #create_xp input {
    width         : ${settings.create_value_input_s};
  }
  
  #modal {
    position: absolute;
    z-index : 15;
    top     : 0%;
    left    : 0%;
    width   : 100%;
    height  : 100%;
    background: rgba( 255, 255, 255, 0.08 );
    backdrop-filter: blur(7.3px);
  }
  #modal_close {
    position: absolute;
    top     : 0%;
    right   : 0%;
    height  : 3ch;
    width   : 3ch;
    font-family: ${settings.modal_close_font};
    font-size  : ${settings.modal_close_fsize};
    color      : rgba( 209,  69, 113, 1.00 );
    color      : rgba( 150,  53,  83, 1.00 );
    text-align : center;
  }
  #create_classPicker {
    position   : absolute;
    top        : 50%;
    left       : 50%;
    width      : 80%;
    height     : auto;
    transform  : translate( -50%, -50% );
  }
  .create_classPicker_element {
    width      : 100%;
    height     : 3ch;
    text-align : center;
    font-family: ${settings.create_classPicker_element_font};
    font-size  : ${settings.create_classPicker_element_fsize};
  }
  
    
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
   
   .app_header,
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
   .character_gold {
     padding-bottom: 1.3ch;
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
   
   #character_subtray {
   
     background : rgba( 255, 255, 255, 0.08 );
   }
   #character_selector {
     max-width: ${settings.selector_icon_size};
   }
   
   .character_selector {
     display: flex;
     justify-content: center;
     align-items: center;
   }
   .character_selector.active {
     border-top-right-radius: 14px;
     background : rgba( 255, 255, 255, 0.08 );
   }
   .character_selector img {
     width              : ${settings.selector_icon_size};
     height             : ${settings.selector_icon_size};
     background-size    : contain;
     background-repeat  : no-repeat;
     background-position: center;
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

   #character_tray {
     flex-grow: 4;
     display: flex;
   }
   #character_selector {
     flex-grow: 1;
     display: flex;
     flex-direction: column;
   }
   #character_subtray {
     flex-grow: 3;
     overflow-y: scroll;
   }
   .character_selector {
     flex: 1;
   }

   #character_resources {
     display: flex;
     flex-wrap    : wrap;
     padding-top  : 1.1ch;
     padding-left : 6%;
     padding-right: 4%;
     padding-bottom: 1.1ch;
     width       : 90%;
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

   /* Generic App elements */
   .app_back_button {
     position   : absolute;
     top        : 0%;
     width      : ${settings.header_height};
     height     : ${settings.header_height};
   }
   .app_back_button {
     left       : 0%;
   }
   .app_back_button:hover {
     background: rgba( 255, 255, 255, 0.08 );
   }
   .app_back_button:active {
     background: rgba( 255, 255, 255, 0.11 );
   }
   .app_back_button img {
     position   : absolute;
     left       : 50%;
     top        : 50%;
     transform  : translate( -50%, -50% );
     width              : calc(70%);
     height             : calc(70%);
     border             : none;
     outline            : none;
     background-size    : contain;
     background-repeat  : no-repeat;
     background-position: center;
     filter             : saturate(0%) brightness(30%) contrast(140%) opacity(50%);
   }
   
   /* Create Page */
   .app_save_button {
     position   : absolute;
     top        : 0%;
     width      : ${settings.header_height};
     height     : ${settings.header_height};
   }
   .app_save_button {
     right    : 0%;
   }
   .app_save_button:hover {
     background: rgba( 255, 255, 255, 0.08 );
   }
   .app_save_button:active {
     background: rgba( 255, 255, 255, 0.11 );
   }
   .app_save_button img {
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
   
   #character_reference {
     max-height: 23ch;
     white-space: pre-wrap;
   }
   #character_reference .flavour {
     padding   : 1.3ch;
     font-style : italic;
     font-family: "Macondo";
     color      : rgba( 13, 13, 13, 0.67 );
   }
   #character_reference .information {
     padding   : 1.3ch;
     padding-top: 0.6ch;
     
   }
   .character_notes {
     padding-left : 6%;
     padding-right: 4%;
   }
   .character_notes_label {
     font-size  : ${settings.character_notes_label_fsize};
     font-family: ${settings.character_notes_label_font};
   }
   .character_notes textarea {
     width      : ${settings.character_notes_value_width};
     height     : ${settings.character_notes_value_height};
     font-family: ${settings.character_notes_value_font};
     font-size  : ${settings.character_notes_value_fsize};
     border     : none;
     outline    : 1px solid rgba( 1, 1, 1, 0 );
     background : rgba( 79, 123, 219, 0.11 );
   }
   
   #character_perks {
     max-height   : 23ch;
     padding-top  : 1.3ch;
     padding-left : 6%;
     padding-right: 4%;
   }
   #character_perks div {
     display      : inline-block;
   }
  `
  
  let css_XPTables = `
  /* 
   *
   *  XP Tables 
   *
   */
  #create_XPTable, #character_XPTable {
    position     : relative;
    padding-top  : 4ch;
    width        : 100%;
    height       : calc(${settings.XPTable_Cell_height} * 2 + 1px + ${settings.XPTable_Arrow_height});
  }
  #character_XPTable {
    padding-top  : 2.2ch;
  }
  /* Level // Experience */
  #create_XPTable_Level, #create_XPTable_Experience,
  #character_XPTable_Level, #character_XPTable_Experience {
    position     : absolute;
    left         : 50%;
    width        : calc(9 * (${settings.XPTable_Cell_width} + ${settings.XPTable_Cell_paddingLeft} + ${settings.XPTable_Cell_paddingRight} + 1px));
    font-family  : ${settings.create_xp_tableContent_font};
    font-size    : ${settings.create_xp_tableContent_fsize};
  }
  #create_XPTable_Level, #character_XPTable_Level {
    transform    : translate( -50%, -50% );
  }
  #create_XPTable_Experience, #character_XPTable_Experience {
    transform    : translate( -50%, +50% );
  }
  /* Cells */
  .XPTable_Level_Cell, .XPTable_Experience_Cell {
    display      : inline-block;
    width        : ${settings.XPTable_Cell_width};
    height       : ${settings.XPTable_Cell_height};
    line-height  : ${settings.XPTable_Cell_lineHeight};
    padding-left : ${settings.XPTable_Cell_paddingLeft};
    padding-right: ${settings.XPTable_Cell_paddingRight};
    text-align   : right;
  }
  .XPTable_Level_Cell {
    border-bottom: 1px solid rgba( 1, 1, 1, 1 );
  }
  #create_XPTable_Level > .XPTable_Level_Cell,
  #character_XPTable_Level > .XPTable_Level_Cell {
    border-left  : 1px solid rgba( 23, 23, 23, 0.00 );
  }
  #create_XPTable_Level > .XPTable_Level_Cell ~ .XPTable_Level_Cell,
  #character_XPTable_Level > .XPTable_Level_Cell ~ .XPTable_Level_Cell {
    border-left  : 1px solid rgba( 23, 23, 23, 0.67 );
  }
  #create_XPTable_Experience > .XPTable_Experience_Cell,
  #character_XPTable_Experience > .XPTable_Experience_Cell {
    border-left  : 1px solid rgba( 23, 23, 23, 0.00 );
  }
  #create_XPTable_Experience > .XPTable_Experience_Cell ~ .XPTable_Experience_Cell,
  #character_XPTable_Experience > .XPTable_Experience_Cell ~ .XPTable_Experience_Cell {
    border-left  : 1px solid rgba( 23, 23, 23, 0.67 );
  }
  /* Pointer */
  #create_XPTable_Pointer,
  #character_XPTable_Pointer {
    position     : absolute;
    transition   : all 230ms;
  }
  .XPTable_ArrowUp {
    width        : 0; 
    height       : 0; 
    border-left  : ${settings.XPTable_Arrow_height} solid transparent;
    border-right : ${settings.XPTable_Arrow_height} solid transparent;
    border-bottom: 9px solid black;
  }
  `
  
  let css_Icons = `

.class-icon {
   background-size: cover;
 }
 #bannerspear.class-icon   {
   background-image: url('assets/class_bannerspear.png');
 }
 #drifter.class-icon   {
   background-image: url('assets/class_drifter.png');
 }
 #boneshaper.class-icon   {
   background-image: url('assets/class_boneshaper.png');
 }
 #deathwalker.class-icon   {
   background-image: url('assets/class_deathwalker.png');
 }
 #blinkblade.class-icon   {
   background-image: url('assets/class_blinkblade.png');
 }
 #germinate.class-icon   {
   background-image: url('assets/class_germinate.png');
 }
 `
 
 let css_modDeck = `
   #modDeck {
     max-height: 23ch;
     padding-left: 3.4vmin;
   }
   #modDeck_cards {
     position        : relative;
   }
   #modDeck_cards_cover {
     width           : calc(23ch + 3ch);
     height          : calc(400/600 * 23ch + 3ch);
     padding         : 0ch;
   }
   .modDeck_card {
     width              : 23ch;
     height             : calc(400/600 * 23ch);
     background-size    : contain;
     background-position: center;
     background-repeat  : no-repeat;
     border-radius      : 11px;
     border-bottom      : 1px solid rgba(82, 80, 72, 1);
     border-right       : 1px solid rgba(82, 80, 72, 1);
   }
   .modDeck_card_back {
     background-image   : url('assets/card_back.png');
     position           : absolute;
   }
   .modDeck_card_add_0 {
     background-image: url('assets/card_add_0.png');
   }
   .modDeck_card_add_1 {
     background-image: url('assets/card_add_1.png');
   }
   .modDeck_card_add_2 {
     background-image: url('assets/card_add_2.png');
   }
   .modDeck_card_crit {
     background-image: url('assets/card_crit.png');
   }
   .modDeck_card_null {
     background-image: url('assets/card_null.png');
   }
   .modDeck_card_sub_1 {
     background-image: url('assets/card_sub_1.png');
   }
   .modDeck_card_sub_2 {
     background-image: url('assets/card_sub_2.png');
   }

   #modDeck_count div   { display: inline-block; }
   #modDeck_blesses div { display: inline-block; }
   #modDeck_curses div  { display: inline-block; }
 `
 
  let css_Mobile = `
  /* 
   *
   *  Mobile Settings 
   *
   */
   @media screen and (max-width: 600px) {
    .class-icon {
      
    }
    .app_header,
    .list_header,
    .character_back,
    .character_save,
    .app_save_button {
      height       : ${settings.header_height_m};
    }
    .app_header,
    .list_header {
      margin-left  : ${settings.header_height_m};
      margin-right : ${settings.header_height_m};
    }
    .app_back_button,
    .character_back {
      line-height  : ${settings.header_height_m};
      width        : ${settings.header_height_m};
      height       : ${settings.header_height_m};
    }
    .create_save,
    .character_save,
    .app_save_button {
      width        : ${settings.header_height_m};
      height       : ${settings.header_height_m};
    }

    .app_header,
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
     .app_back_button,
     .character_back {
       font-size : 9vmin;
     }
     .create_label {
       font-size : ${settings.create_label_fsize_m};
     }
     
     #modal_close {
       font-size : ${settings.modal_close_fsize_m};
     }
     
    .create_classPicker_element {
      font-size  : ${settings.create_classPicker_element_fsize_m};
    }
    .character_notes_label {
      font-size  : ${settings.character_notes_label_fsize_m};
    }
   }
   `
  
  return {
    init : initialise,
  }
})()
