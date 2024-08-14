/** 
 * Determines per-element default listener event types for 
 * "template.listen()", "template.deafen()", "template.react()" 
 * and "template.ignore()". 
 * <br><br>
 * The supported elements (and event types) are:
 * <ul>
 * <li>input (change)</li>
 * <li>textarea (change)</li>
 * <li>button (click)</li>
 * </ul>
 */
const DEFAULTS=new Map([['INPUT','change'],['TEXTAREA','change'],
                        ['BUTTON','click'],])

class Binding{
  static set(target,property,value){
    let success=Reflect.set(...arguments)
    let bindings=target.template.bindings.get(property)
    if(bindings) for(let b of bindings) b()
    return success
  }
}

/** 
 * Manages a cloned instance of a template tag. 
 * Note that any CSS queries are only performed on the clone sub-tree 
 * (other than the one provided in the constructor). 
 * 
 * @property {element} template A reference to the template being 
 * cloned (will be referred to as the "cloned template").
 * @property {element} root A reference to the root element cloned 
 * from the template (referred as the "template's clone").
 * @property {map} bindings A map with arrays of call-back functions
 * by property names (registered with "template.bind()").
 */
export class Template{
  /** 
   * Finds a template tag, stores it as "template.element" and 
   * clones it as "template.root". Note that templates must 
   * have a single root element (direct child descendant)! This can
   * be easily achieved by wrapping the template's content in a "div".
   * 
   * @param {string} selector A CSS selector. For example: 
   * "#mytemplate" will select "template#mytemplate".
   * @param {string} classname For your convenience, this class-name 
   * is added to all root clone elements. If set to false, will not 
   * add any class-name to the root element.
   */
  constructor(selector,classname='tie'){
    selector=`template${selector}`
    let template=document.querySelector(selector)
    if(!template) throw `Cannot find template "${selector}"!`
    this.bindings=new Map()//property:[callback,]
    this.element=template
    let root=template.content.children[0].cloneNode(true)
    if(classname) root.classList.add(classname)
    this.root=root
  }
  
  /** 
   * Appends the root element to the template's parent 
   * element by default. Returns this template instance,
   * for call-chaining.
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
   * Listen for a default event from a single target-element.
   * 
   * @param {string} selector Given a CSS selector...
   * @param {function} callback Registers a call-
   * back of the target-element's default event type.
   */
  listen(selector,callback){
    let v=this.root.querySelector(selector)
    v.addEventListener(DEFAULTS.get(v.tagName),callback)
  }
  
  /** 
   * Given the same parameters, removes a listener previously
   * registered with "template.listen()". 
   * 
   * @param {string} selector Same value as passed to "template.listen()".
   * @param {function} callback Same value as passed to "template.listen()".
   */
  deafen(selector,callback){
    let v=this.root.querySelector(selector)
    v.removeEventListener(DEFAULTS.get(v.tagName),callback)
  }
  
  /**
   * React to events from all interactive elements in the
   * clone sub-tree. For example: to register a single function
   * that will render a preview when any input in a form is changed.
   * 
   * @param {function} callback Registers a call-back to all 
   * supported elements, using each element's default event type.
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
   * <br><br>
   * Note that the W3C suggests non-standard attribute names should have the
   * "data-' prefix.
   * 
   * @param {string} attribute Find an element that has this HTML attribute...
   * @param {string} value Then set the attribute to this value.
   */
  set(attribute,value){this.select(`*[${attribute}]`).setAttribute(attribute,value)}
  
  /**
   * @param {string} attribute Find an element that has this HTML attribute
   * and return the attribute's value.
   */
  get(attribute){return this.select(`*[${attribute}]`).getAttribute(attribute)}
  
  /**
   * Returns a proxy object with properties that can then be bound with 
   * "template.bind()". Bound call-backs will only be called when using
   * this method's returned proxy so it's good practice to discard the original 
   * reference.
   * <br><br>
   * Each template instance is designed to trap a single object. Consider 
   * using more templates or creating Proxy instances in client-code instead 
   * of calling this method more than once per instance.
   * 
   * @param {object} target An object instance. If not provided, will 
   * default to trapping this template instance.
   */
  trap(target=false){
    let p=new Proxy(target||this,Binding)
    p.template=this
    return p
  }

  /**
   * Binds a call-back to an object's property. The object must have been 
   * previously-trapped with "template.trap()". Any number of properties 
   * and call-backs can be registered, including multiple call-backs for a 
   * single property.
   * 
   * @param {string} property A property name. For example: a property 
   * "p" for a previously-trapped "o" object instance will bind "o.p".
   * @param {function} callback Will be called whenever the bound-property 
   * of the previously-trapped-object is changed. This function will be 
   * called with the same arguments as: https://mdn.io/handler.set()
   */
  bind(property,callback){
    let bindings=this.bindings
    let callbacks=bindings.get(property)
    if(!callbacks){
      callbacks=[]
      this.bindings.set(property,callbacks)
    }
    callbacks.push(callback)
  }
  
  /**
   * Removes a call-back binding registered with "template.bind()".
   * 
   * @param {string} property Same value as passed to "template.bind()".
   * @param {function} callback Same value as passed to "template.bind()".
   */
  free(property,callback){
    let callbacks=this.bindings.get(property)
    if(!callbacks) return false
    let i=callbacks.indexOf(callback)
    if(i<0) return false
    callbacks.splice(i,1)
    return true
  }
}
