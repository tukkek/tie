/** 
 * Determines per-element default listener event types for 
 * "template.listen()", * "template.deafen()", "template.react()" 
 * and "template.ignore()". 
 * 
 * The supported elements (and event types) are:
 * 
 * <ul>
 * <li>input (change)</li>
 * <li>textarea (change)</li>
 * <li>button (click)</li>
 * </ul>
 */
const DEFAULTS=new Map([['INPUT','change'],['TEXTAREA','change'],
                        ['BUTTON','click'],])

/** 
 * Manages a cloned instance of a template tag. 
 * Note that any CSS queries are only performed on the clone sub-tree 
 * (other than the one provided in the constructor). 
 * 
 * @property {element} template A reference to the template being 
 * cloned (will be referred to as the "cloned template").
 * @property {element} root A reference to the root element cloned 
 * from the template (wil be referred to as the "template's clone").
 */
export class Template{
  /** 
   * Finds a template tag, stores it as "template.element" and 
   * clones it as "template.root". Note that templates must 
   * have a single root element (direct child descendant)!
   * 
   * @param {string} selector A CSS selector. For example: ".name" 
   * will select "template.name".
   */
  constructor(selector){
    selector=`template${selector}`
    let template=document.querySelector(selector)
    if(!template) throw `Cannot find template "${selector}"!`
    this.element=template
    let root=template.content.children[0].cloneNode(true)
    root.classList.add('tie')
    this.root=root
  }
  
  /** 
   * Appends the root element to the template's parent 
   * element by default.
   * 
   * @param {element} parent If present, append to this 
   * element instead. 
   */
  create(parent=false){
    if(!parent) parent=this.element.parentNode
    parent.appendChild(this.root)
    return this
  }

  /** 
   * Listen for an event from a single target element.
   * 
   * @param {string} selector Given a CSS selector...
   * @param {function} callback Registers a call-
   * back of the target element's default event type.
   */
  listen(selector,callback){
    let v=this.root.querySelector(selector)
    v.addEventListener(DEFAULTS.get(v.tagName),callback)
  }
  
  /** 
   * Given the same parameters, removes a listener previously
   * registered with "template.listen()". 
   */
  deafen(selector,callback){
    let v=this.root.querySelector(selector)
    v.removeEventListener(DEFAULTS.get(v.tagName),callback)
  }
  
  /**
   * React to events from any interactive element in the
   * clone sub-tree. For example: to register a single function
   * that will render a preview when any input in a form is changed.
   * 
   * @param {function} callback Registers a call-back to all 
   * supported interactive elements, using each element's default event type.
   */
  react(callback){
    for(let d of DEFAULTS.keys()) 
      for(let element of this.root.querySelectorAll(d))
        element.addEventListener(DEFAULTS.get(d),callback)
  }
  
  /* Removes a call-back previously registered with "template.react()". */
  ignore(callback){
    for(let d of DEFAULTS.keys())
      for(let element of this.root.querySelectorAll(d))
        element.removeEventListener(DEFAULTS.get(d),callback)
  }
  
  /** 
   * @param {string} selector A CSS selector to find and return a 
   * sub-tree element. 
   */
  select(selector){return this.root.querySelector(selector)}
  
  /** 
   * @param {string} selector A CSS selector to find and return 
   * multiple sub-tree elements.
   */
  selectAll(selector){return this.root.querySelectorAll(selector)}
  
  /** Lower-case alias for "template.selectAll()". */
  selectall(selector){return this.selectall(selector)}
  
  /** Removes the root element from the DOM-tree. */
  remove(){this.root.remove()}
  
  /** 
   * Use this to alter a standard HTML attribute (such as an anchor's "href")
   * or to store data in an attribute declared anywhere in your sub-tree. 
   * This can be useful in many cases, such as for selecting the element
   * with the CSS query: "*[attribute='value']". 
   * 
   * Note that the W3C suggests non-standard attribute names have the
   * "data-' prefix.
   * 
   * @param {string} attribute Find an element that has this HTML attribute...
   * @param {string} value And sets the attribute to this value.
   */
  set(attribute,value){this.select(`*[${attribute}]`).setAttribute(attribute,value)}
  
  /**
   * @param {string} attribute Find an element that has this HTML attribute
   * and returns the attribute's value.
   */
  get(attribute){return this.select(`*[${attribute}]`).getAttribute(attribute)}
}
