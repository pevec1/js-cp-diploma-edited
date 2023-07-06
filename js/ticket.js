class Destroyer{
    constructor(){
    }
destroyer(){
        let sales = JSON.parse(localStorage['sales'])
        localStorage.clear()
        //delete localStorage['list']
        console.log('list cleared')
        localStorage['sales'] = JSON.stringify(sales)
    }
}

  value.getTicket()

let obj = new Destroyer()
obj.destroyer()
