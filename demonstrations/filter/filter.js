import * as tie from '../../tie.js'

const ITEMS=['Alpha','Beta','Gamma','Delta','Epsilon','Zeta','Eta','Theta','Iota','Kappa','Lambda','Mu','Nu','Xi','Omicron','Pi','Rho','Sigma','Tau','Upsilon','Phi','Chi','Psi','Omega']

class Item extends tie.Clone{
  constructor(text){
    super('#item')
    let r=this.root
    r.textContent=`Item ${text}`
    this.style=r.style
  }

  hide(){this.style['display']='none'}

  show(){this.style.removeProperty('display')}
  
  match(fragment){return this.root.textContent.toLowerCase().indexOf(fragment.toLowerCase())>=0}
  
  get hidden(){return this.style['display']=='none'}
}

class Filter extends tie.Clone{
  constructor(items){
    super('#filter')
    this.items=items
    this.input=this.select('input')
  }
  
  filter(){
    for(let i of this.items)
      if(i.match(this.input.value)) i.show()
      else i.hide()
  }
  
  create(){
    super.create()
    this.items=this.items.map((i)=>new Item(i).create())
    this.input.focus()
    this.input.oninput=()=>this.filter()
    window.addEventListener('keyup',(event)=>this.press(event))
    return this
  }
  
  press(event){
    let k=event.key 
    if(k!='Enter') return
    let c=this.items.find((c)=>!c.hidden)
    if(c) document.querySelector('#result').textContent=c.root.textContent
  }
}

export function setup(){new Filter(ITEMS).create()}
