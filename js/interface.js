function numberOfDays(year, month) {
    var d = new Date(year, month, 0);
    return d.getDate();
}

class Interface {
  constructor () {
    this.resultDate = 0
    this.hallKey=''
  }
  getIndexPage () {
    //this.getNavDay()
  }
  getHallPage () {
    this.hallKey = window.location.search.substring(1)
  }
  getPaymentPage () {}
  getTicketPage () {}

  getNavDay () {
    let navDay = new Date()
    navDay = Number(String(navDay.getDate()).padStart(2, '0'))
    console.log(navDay)
    this.resultDate = navDay;
    var d = new Date()
    console.log(new Date().getMonth()+1, numberOfDays(new Date().getFullYear(),new Date().getMonth()+1))
    d.setDate(d.getDate() - (d.getDay() % 7) + 1)
    let pn = Number(d.getDate())
    let real = 0
    let nav = document.querySelectorAll('.page-nav__day-number')
    let pagesNav = document.querySelector('.page-nav')
    if (pagesNav) {
      let movies = document.getElementsByTagName('movie')
      let pages = document.querySelectorAll('.page-nav__day')
      for (let i = 0; i < nav.length; i++) {
        if(pn+i <= numberOfDays(new Date().getFullYear(),new Date().getMonth()+1)){
            nav[i].innerText = pn + i
            real = pn+i

        }
        else { 
            nav[i].innerText = i-4
            real = i-4
        }
        
        if (real == navDay) {
            nav[i].parentNode.classList.add('page-nav__day_today')
            nav[i].parentNode.classList.add('page-nav__day_chosen')
        }
        for (let link of pages) {
            link.addEventListener('click', e => {
              e.preventDefault()
              let clk = '';
              if (nav[i].textContent == real) {
                link.classList.add('page-nav__day_chosen')
      //          console.log(link.innerText)
                clk = link.innerText
                this.resultDate = link.children[1].textContent
                console.log(this.resultDate)    
            } 
                for(let link_ of pages) {
                    if (link_.innerText != clk) {
                    link_.classList.remove('page-nav__day_chosen')
              }
            }

            })
        }
          }

    }
  }
}

let pageCreate = new Interface()
let page = window.location.href
if (page.includes('hall.html')) {
  pageCreate.getHallPage()
} else if (page.includes('payment.html')) {
  pageCreate.getPaymentPage()
} else if (page.includes('ticket.html')) {
  pageCreate.getTicketPage()
} else if (page.includes('index.html')) {
  pageCreate.getIndexPage()
} else {
  pageCreate.getIndexPage()
}
