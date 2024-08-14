import * as tie from '../../tie.js'

const CONTROLS=new tie.Template('.controls').create()
const TRACKS=document.querySelector('#tracks')
const TICK=100

class Result{
  constructor(horse,time){
    this.horse=horse
    this.time=time
  }
  
  static show(race){
    // Handle new instance of the "result" template
    // (the clone element is exposed as view.root):
    let view=new tie.Template('.result')
    // Append the clone to template's parent element:
    view.create()
    // Register call-back for all interactive elements
    // (view.remove() is short for view.root.remove()):
    view.react(()=>view.remove())
    // Same effect as above but target a single element
    // (the event used depends on element, here "click"):
    view.listen('button',()=>view.remove())
    // view.select() is short for view.root.querySelector():
    let list=view.select('ol')
    // Same as above, short for view.root.querySelectorAll():
    list=view.selectAll('ol')[0]
    for(let t of race.times){
      // Clone new instance from the "time" template:
      let item=new tie.Template('.time')
      // Append, this time using an explicit parent:
      item.create(list)
      let seconds=t.time.toFixed(1)
      let n=t.horse.name
      let text=`${n} finished in ${seconds} seconds.`
      // The exposed root element lets you write POJO code!
      // https://en.wikipedia.org/wiki/Plain_old_Java_object
      item.root.textContent=text
    }
  }
}

class Horse{
  constructor(name){
    this.view=new tie.Template('.track')
    this.name=name
    this.step=1
  }
  
  add(){-
    this.view.create()
    this.view.select('.name').textContent=this.name
  }
  
  get finished(){return this.step>=20}
  
  race(){
    if(this.finished) return
    this.step+=Math.random()
    this.view.set('step',Math.floor(this.step))
    if(!this.finished) return
    race.times.push(new Result(this,race.time))
  }
}

class Race{
  constructor(){
    this.timer=false
    this.horses=[]
    this.times=[]
    this.time=0
  }
  
  static reset(){
    if(race){
      clearInterval(race.timer)
      for(let h of race.horses) h.view.remove()
    }
    race=new Race()
    let entrants=CONTROLS.select('.entrants input').value
    for(let i=0;i<entrants;i++){
      let h=new Horse(`Horse #${i+1}`)
      h.add()
      race.horses.push(h)
    }
  }
  
  tick(){
    this.time+=TICK/1000
    let horses=this.horses
    for(let h of horses) h.race()
    if(horses.find((h)=>!h.finished)) return
    clearInterval(this.timer)
    Result.show(this)
  }
  
  start(){this.timer=setInterval(()=>this.tick(),TICK)}
}

var race=false

function start(){
  Race.reset()
  race.start()
}

export function setup(){
  Race.reset()
  CONTROLS.react(()=>Race.reset())
  CONTROLS.select('button').onclick=start
}
