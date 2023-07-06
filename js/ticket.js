class Destroyer{
    constructor(){
    }
    static destroy(){
        let sales = JSON.parse(localStorage['sales'])
        localStorage.clear()
        //delete localStorage['list']
        console.log('list cleared')
        localStorage['sales'] = JSON.stringify(sales)
    }
}

  value.getTicket()


Destroyer.destroy()
