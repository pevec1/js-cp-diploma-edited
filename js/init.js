console.log(this)
window.location.href = 'index.html'
function load () {
  let navDay = new Date()
  navDay = Number(String(navDay.getDate()).padStart(2, '0'))
  var d = new Date()
  let today = new Date()
  today.setHours(0, 0, 0)
  localStorage['day'] = navDay
  var d = new Date()
  let resultDate = Number(
    Math.floor(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ).getTime() / 1000
    )
  )
  d.setDate(d.getDate() - (d.getDay() % 7) + 1)
  let pn = Number(today.getDate())
  let real = 0
  let nav = document.querySelectorAll('.page-nav__day-number')
  let week = document.querySelectorAll(".page-nav__day-week");
  let weekDay = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  let pagesNav = document.querySelector('.page-nav')
  if (pagesNav) {
    //let movies = document.getElementsByTagName('movie')
    let pages = document.querySelectorAll('.page-nav__day')
    for (let i = 0; i < nav.length; i++) {
        let day = new Date(today.getTime() + i * 86400000)
        nav[i].innerHTML = `${day.getDate()},`
        week[i].innerHTML = `${weekDay[day.getDay()]}`
     if (weekDay[day.getDay()]=="Сб"||weekDay[day.getDay()]=="Вс"){
            nav[i].parentNode.classList.add("page-nav__day_weekend")
        }  
        real = pn+i

      if (real == navDay) {
        nav[i].parentNode.classList.add('page-nav__day_today')
        nav[i].parentNode.classList.add('page-nav__day_chosen')
      }
      for (let link of pages) {
        link.addEventListener('click', e => {
          e.preventDefault()
          let clk = ''
          if (nav[i].textContent == real) {
            link.classList.add('page-nav__day_chosen')
            clk = link.innerText
            let resultDate = link.children[1].textContent
            resultDate = Number(
              Math.floor(
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  resultDate
                ).getTime() / 1000
              )
            )
            localStorage['day'] = Number(
              Math.floor(
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  resultDate
                ).getDate()
              )
            )
            navDay = Number(
              Math.floor(
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  resultDate
                ).getDate()
              )
            )
            localStorage['date'] = resultDate
          }
          for (let link_ of pages) {
            if (link_.innerText != clk) {
              link_.classList.remove('page-nav__day_chosen')
            }
          }
        })
      }
    }

  }
  localStorage['day'] = navDay
  localStorage['date'] = resultDate
}

function numberOfDays (year, month) {
  var d = new Date(year, month, 0)
  return d.getDate()
}

if (localStorage['sales']) {
    delete localStorage['sales']
}
load()
