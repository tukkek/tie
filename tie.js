const DEFAULTS=new Map([['INPUT','change'],['TEXTAREA','change'],
                        ['BUTTON','click'],])

export class Template{
  constructor(selector){
    selector=`template${selector}`
    let t=document.querySelector(selector)
    if(!t) throw `Cannot find template "${selector}"!`
    this.element=t
    this.root=false
  }
  
  create(parent=false){
    this.root=this.element.content.children[0].cloneNode(true)
    this.root.classList.add('tie')
    if(!parent) parent=this.element.parentNode
    parent.appendChild(this.root)
    return this
  }
  
  listen(selector,callback,kind=false){
    let v=this.root.querySelector(selector)
    if(!kind) kind=DEFAULTS.get(v.tagName)
    v.addEventListener(kind,callback)
  }
  
  deafen(selector,callback,kind=false){
    let v=this.root.querySelector(selector)
    if(!kind) kind=DEFAULTS.get(v.tagName)
    v.removeEventListener(kind,callback)
  }
  
  react(callback){
    for(let d of DEFAULTS.keys()) 
      for(let element of this.root.querySelectorAll(d))
        element.addEventListener(DEFAULTS.get(d),callback)
  }
  
  ignore(callback){
    for(let d of DEFAULTS.keys())
      for(let element of this.root.querySelectorAll(d))
        element.removeEventListener(DEFAULTS.get(d),callback)
  }
  
  select(selector){return this.root.querySelector(selector)}
  
  selectall(selector){return this.root.querySelectorAll(selector)}
  
  selectAll(selector){return this.selectall(selector)}
  
  remove(){this.root.remove()}
  
  set(attribute,value){this.select(`*[${attribute}]`).setAttribute(attribute,value)}
  
  get(attribute){return this.select(`*[${attribute}]`).getAttribute(attribute)}
}
