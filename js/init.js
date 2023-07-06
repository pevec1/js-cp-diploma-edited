function load () {
  let navDay = new Date()
  navDay = Number(String(navDay.getDate()).padStart(2, '0'))
  console.log(new Date().getTime())
  var d = new Date()
  let today = new Date()
  today.setHours(0, 0, 0)
  localStorage['day'] = navDay
  console.log(navDay)
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
  console.log(resultDate)
  d.setDate(d.getDate() - (d.getDay() % 7) + 1)
  let pn = Number(d.getDate())
  let real = 0
  let month
  let nav = document.querySelectorAll('.page-nav__day-number')
  let pagesNav = document.querySelector('.page-nav')
  if (pagesNav) {
    //let movies = document.getElementsByTagName('movie')
    let pages = document.querySelectorAll('.page-nav__day')
    for (let i = 0; i < nav.length; i++) {
      if (
        pn + i <
        numberOfDays(new Date().getFullYear(), new Date().getMonth())
      ) {
        month = new Date().getMonth() + 1
        console.log(month)
        nav[i].innerText = pn + i
        nav[i].setAttribute('data-month', month)
        real = pn + i
      } else {
        month = new Date().getMonth() + 2
        console.log(month)
        nav[i].innerText =
          pn -
          numberOfDays(new Date().getFullYear(), new Date().getMonth() - 1) +
          i
        nav[i].setAttribute('data-month', month)
        real =
          pn -
          numberOfDays(new Date().getFullYear(), new Date().getMonth() - 1) +
          i
      }

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
            //          console.log(link.innerText)
            clk = link.innerText
            console.log(clk)
            let resultDate = link.children[1].textContent
            console.log(resultDate)
            month = link.children[1].getAttribute('data-month')
            console.log(resultDate, month)
            resultDate = Number(
              Math.floor(
                new Date(
                  new Date().getFullYear(),
                  month - 1,
                  resultDate
                ).getTime() / 1000
              )
            )
            localStorage['day'] = Number(
              Math.floor(
                new Date(
                  new Date().getFullYear(),
                  month - 1,
                  resultDate
                ).getDate()
              )
            )
            navDay = Number(
              Math.floor(
                new Date(
                  new Date().getFullYear(),
                  month - 1,
                  resultDate
                ).getDate()
              )
            )
            localStorage['date'] = resultDate
            console.log(resultDate)
          }
          for (let link_ of pages) {
            if (link_.innerText != clk) {
              link_.classList.remove('page-nav__day_chosen')
            }
          }
        })
      }
    }

    //    let pagesNav = document.querySelector('.page-nav')
  }
  localStorage['day'] = navDay
  localStorage['date'] = resultDate
  console.log(localStorage['date'])
}

function numberOfDays (year, month) {
  var d = new Date(year, month, 0)
  return d.getDate()
}

load()
