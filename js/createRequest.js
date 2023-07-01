const createRequest = (options = {}) => {
  const f = function () {},
    {
      method = 'POST',
      headers = {},
      success = f,
      error = f,
      callback = f,
      responseType = 'json',
      async = true,
      data = ''
    } = options,
    xhr = new XMLHttpRequest()

  let url = ApiConnect.URL

  let requestData
  if (responseType) {
    xhr.responseType = responseType
  }
  xhr.onload = function () {
    success.call(this, xhr.response)
    callback.call(this, null, xhr.response)
  }
  xhr.onerror = function () {
    const err = new Error('Request Error')
    error.call(this, err)
    callback.call(this, err)
  }

  //xhr.withCredentials = true;

  requestData = data
  try {
    xhr.open(method, url, async)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(requestData)
  } catch (err) {
    error.call(this, err)
    callback.call(this, err)
    return xhr
  }

  return xhr
}

function numberOfDays (year, month) {
  var d = new Date(year, month, 0)
  return d.getDate()
}

function makeHttpObject () {
  try {
    return new XMLHttpRequest()
  } catch (error) {}
  try {
    return new ActiveXObject('Msxml2.XMLHTTP')
  } catch (error) {}
  try {
    return new ActiveXObject('Microsoft.XMLHTTP')
  } catch (error) {}

  throw new Error('Could not create HTTP request object.')
}

var request = makeHttpObject()
request.open('GET', 'hall.html', true)
request.send(null)
request.onreadystatechange = function () {
  if (request.readyState == 4); //alert(request.responseText);
}

class ApiConnect {
  constructor (value1, value2, value3, value4) {
    this.value1 = value1
    this.value2 = value2
    this.value3 = value3
    this.value4 = value4
    this.wrapper = ''
    this.resultDate = localStorage['date']
    this.hallKey = ''
  }
  static URL = 'https://jscp-diplom.netoserver.ru/'
  static time (hms) {
    let a = hms.replace('"', '').replace('"', '').split(':')
    //console.log(a)
    return [a[0], a[1]]
    //return Number(seconds)
  }
  res (res) {
    //let x = JSON.parse(res1)
    console.log(res)
    let navDay = new Date()
    navDay = Number(String(navDay.getDate()).padStart(2, '0'))
    console.log(navDay)

    var d = new Date()
    console.log(
      new Date().getMonth() + 1,
      numberOfDays(new Date().getFullYear(), new Date().getMonth() + 1)
    )
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
          pn + i <=
          numberOfDays(new Date().getFullYear(), new Date().getMonth())
        ) {
          month = new Date().getMonth()
          console.log(month)
          nav[i].innerText =pn + i
          nav[i].setAttribute('data-month', month)
          real = pn + i
        } else {
          month = new Date().getMonth() + 1
          console.log(month)
          nav[i].innerText =
          pn -
            numberOfDays(new Date().getFullYear(), new Date().getMonth() - 1) +
            i +
            1
            nav[i].setAttribute('data-month', month)
          real =
            pn -
            numberOfDays(new Date().getFullYear(), new Date().getMonth() - 1) +
            i +
            1
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
              let date = Number(Math.floor(new Date(
                new Date().getFullYear(),
                month - 1,
                resultDate
              ).getTime()/1000))
              navDay =Number(Math.floor(new Date(
                new Date().getFullYear(),
                month - 1,
                resultDate
              ).getDate()))
              
              localStorage['day'] = Number(Math.floor(new Date(
                new Date().getFullYear(),
                month - 1,
                resultDate
              ).getDate()))
              localStorage['date'] = date
              console.log(date)
              
                        }
            for (let link_ of pages) {
              if (link_.innerText != clk) {
                link_.classList.remove('page-nav__day_chosen')
              }
            }
          })
          let main = document.getElementsByTagName('main')[0]
          if (pagesNav) {
            //let movie = document.createElement('section')
            let pages = document.querySelectorAll('.page-nav__day')
            for (let link of pages) {
              if (link.children[1].textContent == localStorage['day']) {
                main.innerHTML = ''
                for (let l = 0; l < res.films.result.length; l++) {
                  let section = document.createElement('section')
                  section.classList.add('movie')
                  section.innerHTML = `
                  <div class="movie__info row">
                    <div class="movie__poster col-4">
                      <img class="movie__poster-image" alt="постер" src=${res.films.result[l].film_poster}>
                    </div>
                    <div class="movie__description col-8">
                      <h2 class="movie__title">${res.films.result[l].film_name}</h2>
                      <p class="movie__synopsis">${res.films.result[l].film_description}</p>
                      <p class="movie__data">
                        <span class="movie__data-duration">${res.films.result[l].film_duration} минут</span>
                        <span class="movie__data-origin">${res.films.result[l].film_origin}</span>
                      </p>
                    </div>
                  </div>`
                  main.appendChild(section)
                  for (let h = 0; h < res.halls.result.length; h++) {
                    if (res.halls.result[h].hall_open === '1') {
                      let countSeancesInHall = 0
                      for (let s = 0; s < res.seances.result.length; s++) {
                        if (
                          res.seances.result[s].seance_hallid ===
                            res.halls.result[h].hall_id &&
                          res.seances.result[s].seance_filmid ===
                            res.films.result[l].film_id
                        ) {
                          countSeancesInHall = 1
                          localStorage[
                            'film=' + l + '&hall=' + h + '&seance=' + s
                          ] = JSON.stringify({
                            film_id: res.films.result[l].film_id,
                            hall_id: res.halls.result[h].hall_id,
                            seance_time: res.seances.result[s].seance_time,
                            l: l,
                            h: h,
                            s: s
                          })
                        }
                      }
                      if (countSeancesInHall == 1) {
                        let div = document.createElement('div')
                        div.classList.add('movie-seances__hall')
                        div.innerHTML = `
                  <h3 class="movie-seances__hall-title">Зал ${h + 1}</h3>`
                        section.appendChild(div)
                        for (let s = 0; s < res.seances.result.length; s++) {
                          if (
                            res.seances.result[s].seance_hallid ===
                              res.halls.result[h].hall_id &&
                            res.seances.result[s].seance_filmid ===
                              res.films.result[l].film_id
                          ) {
                            let ul = document.createElement('ul')
                            ul.classList.add('movie-seances__list')
                            ul.innerHTML = ` <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html?film=${l}&hall=${h}&seance=${s}">${res.seances.result[s].seance_time}</a></li>`

                            div.appendChild(ul)
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      //    let pagesNav = document.querySelector('.page-nav')
    }
    let page = window.location.href
    if (page.includes('hall.html')) {
      this.hallKey = window.location.search.substring(1)
      let info_title = document.querySelector('.buying__info-title')
      let info_start = document.querySelector('.buying__info-start')
      let info_hall = document.querySelector('.buying__info-hall')
      let hall_config = document.querySelector('.conf-step__wrapper')
      let storage = JSON.parse(localStorage[this.hallKey])
      console.log(storage)
      info_title.innerText = res.films.result[storage.l].film_name
      info_start.innerText =
        'Начало сеанса: ' + res.seances.result[storage.s].seance_time
      info_hall.innerText = 'Зал ' + String(Number(storage.h) + 1)
      hall_config.innerHTML = res.halls.result[storage.h].hall_config
      let price_standart = document.querySelector('.price-standart')
      let price_vip = document.querySelector('.price-vip')
      price_standart.innerHTML = res.halls.result[storage.h].hall_price_standart
      price_vip.innerHTML = res.halls.result[storage.h].hall_price_vip
    }
  }
  //return Array.from(res1)

  getList (callback = f => f) {
    return createRequest({
      method: 'POST',
      responseType: 'json',
      async: true,
      data: 'event=update',
      callback: (err, response) => {
        if (response && response.halls && response.films && response.seances) {
          this.res(JSON.parse(JSON.stringify(response)))
        }
        callback.call(this, err, response)
      }
    })
  }

  getConfig (callback = f => f) {
    return createRequest({
      method: 'POST',
      responseType: 'json',
      async: true,
      data: 'event=update',
      callback: (err, response) => {
        if (response && response.halls && response.films && response.seances) {
          //console.log(JSON.parse(JSON.stringify(response)))
          return this.listConfig(JSON.parse(JSON.stringify(response)))
        }
        callback.call(this, err, response)
      }
    })
  }
  createTemplateFromString (str) {
    var template = document.createElement('template')
    template.innerHTML = str
    return template.content
  }
  createFragmentFromString (str) {
    let template = document.createElement('div')
    template.classList.add('cont_fragment')
    template.innerHTML = str
    return template
  }

  runConfig (res) {
    console.log(JSON.parse(res))
    let page = window.location.href
    if (page.includes('hall.html')) {
      this.hallKey = window.location.search.substring(1)
      let storage = JSON.parse(localStorage[this.hallKey])
      console.log(storage)
      let hall_config = document.querySelector('.conf-step__wrapper')
      hall_config.innerHTML = JSON.parse(res)

      let chairs = document.querySelectorAll('.conf-step__chair')
      let rows = document.querySelectorAll('.conf-step__row')
      let selected = []
      for (let row = 1; row <= 10; row++) {
        for (let col = 0; col < chairs.length; col++) {
          chairs[col].addEventListener('click', e => {
            if (
              (chairs[col].classList.contains('conf-step__chair_disabled') &&
                rows[row].classList.contains('conf-step__row')) ||
              (chairs[col].classList.contains('conf-step__chair_taken') &&
                rows[row].classList.contains('conf-step__row'))
            ) {
            } else if (
              chairs[col].classList.contains('conf-step__chair_standart') &&
              !chairs[col].classList.contains('conf-step__chair_selected') &&
              rows[row].classList.contains('conf-step__row')
            ) {
              console.log(selected)
              switch (Math.floor(col / 10, 0)) {
                case 0:
                  selected.push({ standart: [1, (col % 10) + 1] })
                  break
                case 1:
                  selected.push({ standart: [2, (col % 10) + 1] })
                  break
                case 2:
                  selected.push({ standart: [3, (col % 10) + 1] })
                  break
                case 3:
                  selected.push({ standart: [4, (col % 10) + 1] })
                  break
                case 4:
                  selected.push({ standart: [5, (col % 10) + 1] })
                  break
                case 5:
                  selected.push({ standart: [6, (col % 10) + 1] })
                  break
                case 6:
                  selected.push({ standart: [7, (col % 10) + 1] })
                  break
                case 7:
                  selected.push({ standart: [8, (col % 10) + 1] })
                  break
                case 8:
                  selected.push({ standart: [9, (col % 10) + 1] })
                  break
                case 9:
                  selected.push({ standart: [10, (col % 10) + 1] })
                  break
              }

              //chairs[col].classList.remove('conf-step__chair_standart')
              chairs[col].classList.add('conf-step__chair_selected')
            } else if (
              chairs[col].classList.contains('conf-step__chair_standart') &&
              chairs[col].classList.contains('conf-step__chair_selected') &&
              rows[row].classList.contains('conf-step__row')
            ) {
              console.log(selected)
              switch (Math.floor(col / 10, 0)) {
                case 0:
                  selected = selected.filter(function (obj) {
                    return obj !== { standart: [1, (col % 10) + 1] }
                  })
                  break
                case 1:
                  selected = selected.filter(function (obj) {
                    return obj !== { standart: [2, (col % 10) + 1] }
                  })
                  break
                case 2:
                  selected = selected.filter(function (obj) {
                    return obj !== { standart: [3, (col % 10) + 1] }
                  })
                  break
                case 3:
                  selected = selected.filter(function (obj) {
                    return obj !== { standart: [4, (col % 10) + 1] }
                  })
                  break
                case 4:
                  selected = selected.filter(function (obj) {
                    return obj !== { standart: [5, (col % 10) + 1] }
                  })
                  break
                case 5:
                  selected = selected.filter(function (obj) {
                    return obj !== { standart: [6, (col % 10) + 1] }
                  })
                  break
                case 6:
                  selected = selected.filter(function (obj) {
                    return obj !== { standart: [7, (col % 10) + 1] }
                  })
                  break
                case 7:
                  selected = selected.filter(function (obj) {
                    return obj !== { standart: [8, (col % 10) + 1] }
                  })
                  break
                case 8:
                  selected = selected.filter(function (obj) {
                    return obj !== { standart: [9, (col % 10) + 1] }
                  })
                  break
                case 9:
                  selected = selected.filter(function (obj) {
                    return obj !== { standart: [10, (col % 10) + 1] }
                  })
                  break
              }

              // chairs[col].classList.remove('conf-step__chair_standart')
              chairs[col].classList.remove('conf-step__chair_selected')
            } else if (
              chairs[col].classList.contains('conf-step__chair_vip') &&
              rows[row].classList.contains('conf-step__row')
            ) {
              console.log(selected)
              switch (Math.floor(col / 10, 0)) {
                case 0:
                  selected.push({ vip: [1, (col % 10) + 1] })
                  break
                case 1:
                  selected.push({ vip: [2, (col % 10) + 1] })
                  break
                case 2:
                  selected.push({ vip: [3, (col % 10) + 1] })
                  break
                case 3:
                  selected.push({ vip: [4, (col % 10) + 1] })
                  break
                case 4:
                  selected.push({ vip: [5, (col % 10) + 1] })
                  break
                case 5:
                  selected.push({ vip: [6, (col % 10) + 1] })
                  break
                case 6:
                  selected.push({ vip: [7, (col % 10) + 1] })
                  break
                case 7:
                  selected.push({ vip: [8, (col % 10) + 1] })
                  break
                case 8:
                  selected.push({ vip: [9, (col % 10) + 1] })
                  break
                case 9:
                  selected.push({ vip: [10, (col % 10) + 1] })
                  break
              }

              //chairs[col].classList.remove('conf-step__chair_vip')
              chairs[col].classList.add('conf-step__chair_selected')
            }
          })
        }
      }
    }
    //    this.wrapper = this.createFragmentFromString(res)
    //  console.log(this.wrapper)
  }

  listConfig (res1, callback = f => f) {
      console.log(res1)
    let x = res1
    let value1, value2, value3
    let i = 0
    let page = window.location.href
    if (page.includes('hall.html')) {
      this.hallKey = window.location.search.substring(1)
      let storage = JSON.parse(localStorage[this.hallKey])
      console.log(storage)
      i = storage.s
    }
   const str = '2023-04-26'
    let date = localStorage['date']
    console.log(date)
    let st, st2
    let timestamp
    let unixTimestamp
    let j
    st = String(JSON.stringify(x.seances.result[i].seance_time))
    st2 = String(JSON.stringify(x.seances.result[i].seance_start))
    j = String(JSON.stringify(x.seances.result[i].seance_hallid))
    //date.setHours(ApiConnect.time(st)[0])
    //date.setMinutes(ApiConnect.time(st)[1])
    //date.setSeconds(0)
   // timestamp = date.getTime()
    //console.log(timestamp)
    unixTimestamp = Number(localStorage['date']) + Number(st2.replace('"','').replace('"',''))*60
    //unixTimestamp = Number(Math.floor(Date.now()/1000))+Number(st2.replace('"','').replace('"',''))*60+60*60*24
    console.log(unixTimestamp)
console.log(date)
    //unixTimestamp = date
    value1 = this.value1
    //console.log(value1)
    value2 = this.value2
    //  console.log(value2)
    value3 = this.value3
    //  console.log(value3)
    //    console.log(x)
    //console.log(st, st2)
    if (value1 === undefined || value2 === undefined || value3 === undefined) {
      value1 = unixTimestamp
      console.log(value1)
      value2 = Number(j.replace('"', '').replace('"', ''))
      console.log(value2)
      value3 = Number(
        JSON.stringify(x.seances.result[i].seance_id)
          .replace('"', '')
          .replace('"', '')
      )
    console.log(value3)
    }
    return createRequest({
      method: 'POST',
      responseType: 'json',
      async: true,
      data: `event=get_hallConfig&timestamp=${value1}&hallId=${value2}&seanceId=${value3}`,
      callback: (err, response) => {
        if (response) {
          return this.runConfig(JSON.stringify(response))
        }
        callback.call(this, err, response)
      }
    })
  }

  runReserv (res) {
    console.log(JSON.parse(res).sales.result)
    return res
  }

  listReserv (res2, callback = f => f) {
    // console.log(res1)
    //  console.log(res2)
    let x = res2
    let i
    let page = window.location.href
    if (page.includes('hall.html')) {
      this.hallKey = window.location.search.substring(1)
      let storage = JSON.parse(localStorage[this.hallKey])
      console.log(storage)
      i = storage.s
    }
    const str = '2023-04-26'
    let date = localStorage['date']
    console.log(date)
    let st, st2
    let timestamp
    let unixTimestamp
    let j
    st = String(JSON.stringify(x.seances.result[i].seance_time))
    st2 = String(JSON.stringify(x.seances.result[i].seance_start))
    j = String(JSON.stringify(x.seances.result[i].seance_hallid))
    //date.setHours(ApiConnect.time(st)[0])
    //date.setMinutes(ApiConnect.time(st)[1])
    //date.setSeconds(0)
   // timestamp = date.getTime()
    //console.log(timestamp)
    unixTimestamp = Number(localStorage['date']) + Number(st2.replace('"','').replace('"',''))*60
    //unixTimestamp = Number(Math.floor(Date.now()/1000))+Number(st2.replace('"','').replace('"',''))*60+60*60*24
    console.log(unixTimestamp)
console.log(date)
    //unixTimestamp = date
    let value1, value2, value3, value4
    value1 = this.value1
    //console.log(value1)
    value2 = this.value2
    //console.log(value2)
    value3 = this.value3
    //console.log(value3)
    //  console.log(x)
    //console.log(st, st2)
    if (value1 === undefined || value2 === undefined || value3 === undefined) {
      value1 = unixTimestamp
      //      console.log(value1)
      value2 = Number(j.replace('"', '').replace('"', ''))
      console.log(value2)
      value3 = Number(
        JSON.stringify(x.seances.result[i].seance_id)
          .replace('"', '')
          .replace('"', '')
      )
      //    console.log(value3)
    }

    //`hallConfiguration` - Строка - ***html разметка*** которую следует взять со страницы `hall.html` внутри контейнера с классом `conf-step__wrapper`(см разметку).
    //  console.log(this.createFragmentFromString(res2))
    if (true) {
      value4 = this.wrapper.textContent
      console.log(value4) //

      return createRequest({
        method: 'POST',
        responseType: 'json',
        async: true,
        data: `event=sale_add&timestamp=${value1}&hallId=${value2}&seanceId=${value3}&hallConfiguration=${value4}`,
        callback: (err, response) => {
          if (response) {
            //console.log(this.runReserv( JSON.stringify(response)))
            return this.runReserv(JSON.stringify(response))
          }
          callback.call(this, err, response)
        }
      })
    }
  }

  getReserv (callback = f => f) {
    return createRequest({
      method: 'POST',
      responseType: 'json',
      async: true,
      data: 'event=update',
      callback: (err, response) => {
        if (response && response.halls && response.films && response.seances) {
          //console.log(this.listReserv(JSON.parse(JSON.stringify(response))))
          return this.listReserv(JSON.parse(JSON.stringify(response)))
        }
        callback.call(this, err, response)
      }
    })
  }
}

// здесь перечислены все возможные параметры для функции
//createRequest()
let value = new ApiConnect()
value.getList()

value.getConfig()
//value.getReserv(value.getConfig())

//
// 1686640200, 71, 62
