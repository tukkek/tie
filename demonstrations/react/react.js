import * as tie from '../../tie.js'

// Reacts to all default events in template's clone with `template.react()`:
function react(){
  let view=new tie.Clone('template.example').create()
  view.select('.header').textContent='template.react()'
  let t=view.select('.target')
  let i=view.select('input')
  view.react(()=>t.textContent=i.value)
}

// Reacts to a specific element's default event with `template.listen()`:
function listen(){
  let view=new tie.Clone('template.example').create()
  view.select('.header').textContent='template.listen()'
  let t=view.select('.target')
  let i=view.select('input')
  view.listen('button',()=>t.textContent=i.value)
}

// React to a non-default event using the native `addEventListener()`:
function addlistener(){
  let view=new tie.Clone('template.example').create()
  view.select('.header').textContent='element.addEventListener()'
  let t=view.select('.target')
  let i=view.select('input')
  view.select('input').addEventListener('keyup',()=>t.textContent=i.value)
  // Same effect but using the conveniently exposed "template.root":
  view.root.querySelector('input').addEventListener('keyup',()=>t.textContent=i.value)
}

// "clone.trap()" then "clone.bind()" a simple class instance:
class Counter{
  constructor(){
    this.count=0
  }
  
  change(by){this.count+=by}

  static bind(){
    let view=new tie.Clone('template.example').create()
    view.select('.header').textContent='template.trap()'
    view.root.setAttribute('kind','counter')
    let c=view.trap(new Counter())
    view.listen('.more',()=>c.change(+1))
    view.listen('.less',()=>c.change(-1))
    view.bind('count',()=>view.select('.count').textContent=c.count)
  }
}

// For each example, clone a template then react to events:
export function setup(){
  react()
  listen()
  addlistener()
  Counter.bind()
}
