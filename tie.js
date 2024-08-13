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
  
  listen(selector,callback,kind='change'){
    let v=this.root.querySelector(selector)
    v.addEventListener(kind,callback)
  }
  
  deafen(selector,callback,kind='change'){
    let v=this.root.querySelector(selector)
    v.removeEventListener(kind,callback)
  }
  
  react(callback){
    let r=this.root
    for(let i of r.querySelectorAll('input'))
      i.addEventListener('change',callback)
    for(let a of r.querySelectorAll('textarea'))
      a.addEventListener('change',callback)
    for(let b of r.querySelectorAll('button'))
      b.addEventListener('click',callback)
  }
  
  ignore(callback){
    let r=this.root
    for(let i of r.querySelectorAll('input'))
      i.removeEventListener('change',callback)
    for(let a of r.querySelectorAll('textarea'))
      a.removeEventListener('change',callback)
    for(let b of r.querySelectorAll('button'))
      b.removeEventListener('click',callback)
  }
  
  select(selector){return this.root.querySelector(selector)}
  
  selectall(selector){return this.root.querySelectorAll(selector)}
  
  selectAll(selector){return this.selectall(selector)}
  
  remove(){this.root.remove()}
  
  set(attribute,value){this.select(`*[${attribute}]`).setAttribute(attribute,value)}
  
  get(attribute){return this.select(`*[${attribute}]`).getAttribute(attribute)}
}
