const DEFAULTS=new Map([['INPUT','change'],['TEXTAREA','change'],
                        ['BUTTON','click'],])

export class Template{
  constructor(selector){
    selector=`template${selector}`
    let template=document.querySelector(selector)
    if(!template) throw `Cannot find template "${selector}"!`
    this.element=template
    let root=template.content.children[0].cloneNode(true)
    root.classList.add('tie')
    this.root=root
  }
  
  create(parent=false){
    if(!parent) parent=this.element.parentNode
    parent.appendChild(this.root)
    return this
  }
  
  listen(selector,callback){
    let v=this.root.querySelector(selector)
    v.addEventListener(DEFAULTS.get(v.tagName),callback)
  }
  
  deafen(selector,callback){
    let v=this.root.querySelector(selector)
    v.removeEventListener(DEFAULTS.get(v.tagName),callback)
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
  
  selectAll(selector){return this.root.querySelectorAll(selector)}
  
  selectall(selector){return this.selectall(selector)}
  
  remove(){this.root.remove()}
  
  set(attribute,value){this.select(`*[${attribute}]`).setAttribute(attribute,value)}
  
  get(attribute){return this.select(`*[${attribute}]`).getAttribute(attribute)}
}
