/**
 * Determines per-element default listener event types for
 * "clone.listen()", "clone.deafen()", "clone.react()"
 * and "clone.ignore()".
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
    let bindings=target.clone.bindings.get(property)
    if(bindings) for(let b of bindings) b()
    return success
  }
}

/**
 * Manages a cloned instance of a template tag.  Note that any searches
 * are only performed on the clone's sub-tree (other than the constructor's
 * CSS selector).
 *
 * @property {element} template A reference to the template element being
 * cloned (will be referred to as the "cloned template").
 * @property {element} root A reference to the root element cloned
 * from the template (referred as the "template's clone").
 * @property {map} bindings A map with arrays of call-back functions
 * by property names (registered with "clone.bind()").
 */
export class Clone{
  /**
   * Finds a template tag, stores it as "clone.template" and
   * clones its content as "clone.root". Note that clones must have a single
   * root element (direct child descendant). This can be easily achieved by
   * wrapping the template's content inside a "div" tag.
   * <br><br>
   * Nested templates can't be accessed until the parent tag has been
   * inserted into the DOM tree. If problematic, don't nest your template
   * tags to avoid this issue.
   *
   * @param {string} selector A CSS selector for the template tag to be cloned.
   * For example: "#mytemplate" or "template#mytemplate".
   * @param {string} classname For your convenience, this class-name
   * is added to the root element of all clones. If set to "false", will
   * not add any class-name to the root element.
   */
  constructor(selector,classname='tie'){
    let template=document.querySelector(selector)
    if(!template) throw `Cannot find template "${selector}"!`
    this.bindings=new Map()//property:[callback]
    this.template=template
    let c=template.content.children[0].cloneNode(true)
    if(classname) c.classList.add(classname)
    this.root=c
  }

  /**
   * Appends the root element to the template's parent
   * element by default. Returns this clone instance,
   * for call-chaining.
   * <br><br>
   * Always create a new Clone instance for each clone to be managed.
   * "clone.create()" won't clone the template again by itself.
   *
   * @param {element} parent If present, append to this
   * element instead.
   */
  create(parent=false){
    if(!parent) parent=this.template.parentNode
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
   * registered with "clone.listen()".
   *
   * @param {string} selector Same value as passed to "clone.listen()".
   * @param {function} callback Same value as passed to "clone.listen()".
   */
  deafen(selector,callback){
    let v=this.root.querySelector(selector)
    v.removeEventListener(DEFAULTS.get(v.tagName),callback)
  }

  /**
   * React to events from all interactive elements in the
   * clone's sub-tree. For example: to register a single function
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

  /* Removes a call-back previously registered with "clone.react()". */
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

  /** Lower-case alias for "clone.selectAll()". */
  selectall(selector){return this.selectAll(selector)}

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
   * Returns a proxy object whose properties can then be bound with
   * "clone.bind()". Bound call-backs will only be called when using
   * this method's returned proxy so it's good practice to discard the original
   * object's reference.
   * <br><br>
   * Each clone instance is designed to trap a single object. Consider
   * using more clones or creating Proxy instances in client-code instead
   * of calling this method more than once per instance.
   * <br><br>
   * For internal use, adds a "proxy.clone" reference to this clone object.
   *
   * @param {object} target An object instance to trap. If not provided, will
   * default to trapping this clone instance. Can be used to trap a different
   * data or control object as well, using the clone to react to its changes.
   */
  trap(target=false){
    let p=new Proxy(target||this,Binding)
    p.clone=this
    return p
  }

  /**
   * Binds a call-back to an object's property. The object must have been
   * previously-trapped with "clone.trap()". Any number of properties
   * and call-backs can be registered, including multiple call-backs for
   * the same property.
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
   * Removes a call-back binding registered with "clone.bind()".
   *
   * @param {string} property Same value as passed to "clone.bind()".
   * @param {function} callback Same value as passed to "clone.bind()".
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

async function load(name,extension,tag,parent){
  let element=document.createElement(tag)
  element.classList.add(name)
  let body=await fetch(new URL(`${name}.${extension}`,parent))
  element.innerHTML=await body.text()
  document.body.appendChild(element)
}

export async function compose(name,parent){
  await load(name,'html','template',parent)
  await load(name,'css','style',parent)
}

/** Returns the result of <code>document.querySelector()</code>. */
export function select(query){return document.querySelector(query)}

/** Same as <code>selectAll()</code>. */
export function selectall(query){return Array.from(document.querySelectorAll(query))}

/** Returns the result of <code>document.querySelectorAll()</code>, wrapped in an array. */
export function selectAll(query){return selectall(query)}
