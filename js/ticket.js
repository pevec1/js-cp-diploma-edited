class Destroyer{
    constructor(){
        console.log('объект с билетами: ')
        console.log(JSON.parse(localStorage['sales']))
    }
    static destroy(){
        localStorage.clear()
        //delete localStorage['list']
        console.log('list cleared')
    }
}

  value.getTicket()

let obj = new Destroyer()

Destroyer.destroy()
