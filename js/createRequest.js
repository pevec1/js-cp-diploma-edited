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
    console.log(new Date().getTime())
    var d = new Date()
    let today = new Date();
  today.setHours(0, 0, 0);
    console.log(
      new Date().getMonth() + 1,
      numberOfDays(new Date().getFullYear(), new Date().getMonth() + 1)
    )
    d.setDate(d.getDate() - (d.getDay() % 7) + 1)
    let pn = Number(d.getDate())
    let real = 0
    let month
    let stampDate
    let nav = document.querySelectorAll('.page-nav__day-number')
    let pagesNav = document.querySelector('.page-nav')
    if (pagesNav) {
      //let movies = document.getElementsByTagName('movie')
      let pages = document.querySelectorAll('.page-nav__day')
      for (let i = 0; i < nav.length; i++) {
        let day = new Date(today.getTime() + (i * 86400000));
        let timestamp = Math.trunc(day/1000);
            if (
          pn + i <
          numberOfDays(new Date().getFullYear(), new Date().getMonth())
        ) {
          month = new Date().getMonth()+1
          console.log(month)
          nav[i].innerText =pn + i
          nav[i].setAttribute('data-month', month)
          nav[i].setAttribute('data-timestamp', timestamp)
          real = pn + i
        } else {
          month = new Date().getMonth() + 2
          console.log(month)
          nav[i].innerText =
          pn -
            numberOfDays(new Date().getFullYear(), new Date().getMonth() - 1) +
            i 
            nav[i].setAttribute('data-month', month)
            nav[i].setAttribute('data-timestamp', timestamp)
            real =
            pn -
            numberOfDays(new Date().getFullYear(), new Date().getMonth() - 1) +
            i 
        }


        if (real == navDay) {
          nav[i].parentNode.classList.add('page-nav__day_today')
          nav[i].parentNode.classList.add('page-nav__day_chosen')
        }

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
                        timestamp = Number(localStorage['date']) + Number(res.seances.result[s].seance_start) * 60
                        localStorage[
                          'film=' + l + '&hall=' + h + '&seance=' + s
                        ] = JSON.stringify({
                          film_id: res.films.result[l].film_id,
                          film_name: res.films.result[l].film_name,
                          hall_id: res.halls.result[h].hall_id,
                          hall_name: res.halls.result[h].hall_name,
                          hall_config: res.halls.result[h].hall_config,
                          hall_price_standart:
res.halls.result[h].hall_price_standart,
                          hall_price_vip:
res.halls.result[h].hall_price_vip,
seance_id: res.seances.result[s].seance_id,
seance_time: res.seances.result[s].seance_time,
seance_start: res.seances.result[s].seance_start,
timestamp: timestamp,
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
                          console.log(ul.children[0].children[0].getAttribute('data-timestamp'))

                          let timeSeance = Number(localStorage['date']) + Number(res.seances.result[s].seance_start)*60;
localStorage['timestamp'] = timeSeance
                          console.log(Number(timestamp))
                          //console.log(e.target.closest('.page-nav__day'))
                                                    console.log(timeSeance)
                          let timeNow = Number(Math.trunc(+new Date() / 1000))
                          console.log(timeNow)

                          console.log(timeSeance - timeNow)
                                if ((timeSeance - timeNow) > 0) {
                            ul.children[0].children[0].classList.remove('acceptin-button-disabled');
                          } else {
                            ul.children[0].children[0].classList.add('acceptin-button-disabled');
                          };
          
                        }
                      }
                    }
                  }
                }
              }
            }
          }
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
              let date = Number(
                Math.floor(
                  new Date(
                    new Date().getFullYear(),
                    month - 1,
                    resultDate
                  ).getTime() / 1000
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

              localStorage['day'] = Number(
                Math.floor(
                  new Date(
                    new Date().getFullYear(),
                    month - 1,
                    resultDate
                  ).getDate()
                )
              )
              localStorage['date'] = date
              console.log(date)
              stampDate = date

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
                              timestamp = Number(localStorage['date']) + Number(res.seances.result[s].seance_start) * 60
                        localStorage[
                          'film=' + l + '&hall=' + h + '&seance=' + s
                        ] = JSON.stringify({
                          film_id: res.films.result[l].film_id,
                          film_name: res.films.result[l].film_name,
                          hall_id: res.halls.result[h].hall_id,
                          hall_name: res.halls.result[h].hall_name,
                          hall_config: res.halls.result[h].hall_config,
                          hall_price_standart:
res.halls.result[h].hall_price_standart,
                          hall_price_vip:
res.halls.result[h].hall_price_vip,
seance_id: res.seances.result[s].seance_id,
seance_time: res.seances.result[s].seance_time,
seance_start: res.seances.result[s].seance_start,
timestamp: timestamp,
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

console.log(ul.children[0].children[0].getAttribute('data-timestamp'))

                                let timeSeance = Number(localStorage['date']) + Number(res.seances.result[s].seance_start)*60;
localStorage['timestamp'] = timeSeance
                                console.log(Number(timestamp))
                                console.log(e.target.closest('.page-nav__day'))
                                                          console.log(timeSeance)
                                let timeNow = Number(Math.trunc(+new Date() / 1000))
                                console.log(timeNow)

                                console.log(timeSeance - timeNow)
                                      if ((timeSeance - timeNow) > 0) {
                                  ul.children[0].children[0].classList.remove('acceptin-button-disabled');
                                } else {
                                  ul.children[0].children[0].classList.add('acceptin-button-disabled');
                                };
                      
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }            }
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
    let page = window.location.href
    if (page.includes('hall.html')) {
      this.hallKey = window.location.search.substring(1)
      let info_title = document.querySelector('.buying__info-title')
      let info_start = document.querySelector('.buying__info-start')
      let info_hall = document.querySelector('.buying__info-hall')
      let hall_config = document.querySelector('.conf-step__wrapper')
      let storage
      console.log(this.hallKey)
      try {
      storage = JSON.parse(localStorage[this.hallKey]) 
        
      } catch (error) {
        storage = JSON.parse(localStorage['storage'])
        
      }
      console.log(storage)
      let timestamp = Number(localStorage['date']) + Number(res.seances.result[storage.s].seance_start) * 60
      localStorage[
        'storage'
      ] = JSON.stringify({
        film_id: res.films.result[storage.l].film_id,
        film_name: res.films.result[storage.l].film_name,
        hall_id: res.halls.result[storage.h].hall_id,
        hall_name: res.halls.result[storage.h].hall_name,
        hall_config: res.halls.result[storage.h].hall_config,
        hall_price_standart:
res.halls.result[storage.h].hall_price_standart,
        hall_price_vip:
res.halls.result[storage.h].hall_price_vip,
seance_id: res.seances.result[storage.s].seance_id,
seance_time: res.seances.result[storage.s].seance_time,
seance_start: res.seances.result[storage.s].seance_start,
timestamp: timestamp,
l: storage.l,
        h: storage.h,
        s: storage.s
      })

      info_title.innerText = res.films.result[storage.l].film_name
      info_start.innerText =
        'Начало сеанса: ' + res.seances.result[storage.s].seance_time
      info_hall.innerText = res.halls.result[storage.h].hall_name
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
    console.log('000')
    console.log(JSON.parse(res))
    let page = window.location.href
    if (page.includes('hall.html')) {
      this.hallKey = window.location.search.substring(1)
      let storage
      try {
        storage = JSON.parse(localStorage[this.hallKey]) 
          
        } catch (error) {
          storage = JSON.parse(localStorage['storage'])
          
        }
        let date = localStorage['date']
      let day = localStorage['day']

      console.log(storage)
      let hall_config = document.querySelector('.conf-step__wrapper')

    try {
      hall_config.innerHTML = JSON.parse(res)
      console.log(res)
    } catch (error) {
      console.log(error)
      hall_config.innerHTML = storage.hall_config
      console.log(storage.hall_config)
    }

      let buttonAcceptin = document.querySelector('.acceptin-button')
      let chairs = Array.from(
        document.querySelectorAll('.conf-step__row .conf-step__chair')
      )
      buttonAcceptin.setAttribute('disabled', true)

      chairs.forEach(chair => {
        chair.addEventListener('click', event => {
          if (event.target.classList.contains('conf-step__chair_taken')) {
            return
          }
          event.target.classList.toggle('conf-step__chair_selected')
          let chairsSelected = Array.from(
            document.querySelectorAll(
              '.conf-step__row .conf-step__chair_selected'
            )
          )
          if (chairsSelected.length > 0) {
            buttonAcceptin.removeAttribute('disabled')
          } else {
            buttonAcceptin.setAttribute('disabled', true)
          }
        })
      })

      buttonAcceptin.addEventListener('click', event => {
        event.preventDefault()

        let selectedPlaces = Array()
        let rows = Array.from(document.getElementsByClassName('conf-step__row'))

        for (let i = 0; i < rows.length; i++) {
          let spanPlaces = Array.from(
            rows[i].getElementsByClassName('conf-step__chair')
          )
          for (let j = 0; j < spanPlaces.length; j++) {
            if (spanPlaces[j].classList.contains('conf-step__chair_selected')) {
              let typePlace = spanPlaces[j].classList.contains(
                'conf-step__chair_standart'
              )
                ? 'standart'
                : 'vip'
              selectedPlaces.push({
                row: i + 1,
                place: j + 1,
                type: typePlace
              })
            }
          }
        }

    hall_config = document.querySelector('.conf-step__wrapper').innerHTML;
    localStorage.clear();
    localStorage['hall_config'] = JSON.stringify(hall_config);
    localStorage['places'] = JSON.stringify(selectedPlaces);
     localStorage['storage'] = JSON.stringify(storage)
    localStorage['date'] = date
    localStorage['day'] = day
  
    window.location.href = "payment.html?"+this.hallKey;

      })
    }

  }

  listConfig (res1, callback = f => f) {
    console.log(res1)
    let x = res1
    let value1, value2, value3
    let i = 0
    let page = window.location.href
    if (page.includes('hall.html')) {
      this.hallKey = window.location.search.substring(1)
      let storage
      try {
        storage = JSON.parse(localStorage[this.hallKey]) 
          
        } catch (error) {
          storage = JSON.parse(localStorage['storage'])
          
        }
        console.log(storage)
        let hall_config = document.querySelector('.conf-step__wrapper')

        try {
          hall_config.innerHTML = JSON.parse(res)
          console.log(res)
        } catch (error) {
          console.log(error)
          hall_config.innerHTML = storage.hall_config
          console.log(storage.hall_config)
        }
    
          let buttonAcceptin = document.querySelector('.acceptin-button')
          let chairs = Array.from(
            document.querySelectorAll('.conf-step__row .conf-step__chair')
          )
          buttonAcceptin.setAttribute('disabled', true)
    
          chairs.forEach(chair => {
            chair.addEventListener('click', event => {
              if (event.target.classList.contains('conf-step__chair_taken')) {
                return
              }
              event.target.classList.toggle('conf-step__chair_selected')
              let chairsSelected = Array.from(
                document.querySelectorAll(
                  '.conf-step__row .conf-step__chair_selected'
                )
              )
              if (chairsSelected.length > 0) {
                buttonAcceptin.removeAttribute('disabled')
              } else {
                buttonAcceptin.setAttribute('disabled', true)
              }
            })
          })
    
          buttonAcceptin.addEventListener('click', event => {
            event.preventDefault()
    
            let selectedPlaces = Array()
            let rows = Array.from(document.getElementsByClassName('conf-step__row'))
    
            for (let i = 0; i < rows.length; i++) {
              let spanPlaces = Array.from(
                rows[i].getElementsByClassName('conf-step__chair')
              )
              for (let j = 0; j < spanPlaces.length; j++) {
                if (spanPlaces[j].classList.contains('conf-step__chair_selected')) {
                  let typePlace = spanPlaces[j].classList.contains(
                    'conf-step__chair_standart'
                  )
                    ? 'standart'
                    : 'vip'
                  selectedPlaces.push({
                    row: i + 1,
                    place: j + 1,
                    type: typePlace
                  })
                }
              }
            }
    
        hall_config = document.querySelector('.conf-step__wrapper').innerHTML;
        localStorage.clear();
        localStorage['hall_config'] = JSON.stringify(hall_config);
        localStorage['places'] = JSON.stringify(selectedPlaces);
         localStorage['storage'] = JSON.stringify(storage)
        localStorage['date'] = date
      
        window.location.href = "payment.html?"+this.hallKey;
    
          })

          i = storage.s
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
    unixTimestamp =
      Number(localStorage['date']) +
      Number(st2.replace('"', '').replace('"', '')) * 60
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
      value2 = Number(storage.hall_id) //Number(j.replace('"', '').replace('"', ''))
      console.log(value2)
      value3 = Number(storage.seance_id)  /*Number(
        JSON.stringify(x.seances.result[i].seance_id)
          .replace('"', '')
          .replace('"', '')
      )*/
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
}

  runReserv (res) {
         console.log(JSON.parse(res))
    localStorage['sales'] = res
    document.body.innerHTML = ''
    window.location.href = 'ticket.html'

}

getTicket(){
  let page = window.location.href
  if (page.includes('ticket.html')) {
      let storage = JSON.parse(localStorage['storage'])
      console.log(storage)
      let salesPlaces = JSON.parse(localStorage['places'])
      let date = localStorage['date']
      let day = localStorage['day']
let places = "";
let price = 0;

salesPlaces.forEach(salePlace => {
  if (places) {
    places += ", ";
  };
  places += `${salePlace.row}/${salePlace.place}`;
  price += salePlace.type === "standart" ? Number(storage.hall_price_standart) : Number(storage.hall_price_vip);
});

document.querySelector(".ticket__title").innerHTML = storage.film_name;
document.querySelector(".ticket__chairs").innerHTML = places;
document.querySelector(".ticket__hall").innerHTML = storage.hall_name;
document.querySelector(".ticket__start").innerHTML = storage.seance_time;


let dates = new Date(Number(localStorage['date'] * 1000));
let dateStr = dates.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
let textQR =`
Фильм: ${storage.film_name}
Зал: ${storage.hall_name}
Ряд/Место ${places}
Дата: ${dateStr}
Начало сеанса: ${storage.seance_time}
Билет действителен строго на свой сеанс`;

let qrcode = QRCreator(textQR, { image: "SVG"	});
qrcode.download();
document.querySelector(".ticket__info-qr").append(qrcode.result);
}    
   
}
  listReserv (res2, callback = f => f) {
    // console.log(res1)
    //  console.log(res2)
    let x = res2
    let i
    let page = window.location.href
    if (page.includes('payment.html')) {
      let storage = JSON.parse(localStorage['storage'])
      console.log(storage)
      i = storage.s

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
    unixTimestamp =
      Number(localStorage['date']) +
      Number(st2.replace('"', '').replace('"', '')) * 60
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
      value2 = Number(storage.hall_id) //Number(j.replace('"', '').replace('"', ''))
      console.log(value2)
      value3 = Number(storage.seance_id)  /*Number(
        JSON.stringify(x.seances.result[i].seance_id)
          .replace('"', '')
          .replace('"', '')
      )*/
      console.log(value3)

    //`hallConfiguration` - Строка - ***html разметка*** которую следует взять со страницы `hall.html` внутри контейнера с классом `conf-step__wrapper`(см разметку).
    //      let page = window.location.href
      if (page.includes('payment.html')) {
      this.hallKey = window.location.search.substring(1)
        let storage = JSON.parse(localStorage['storage'])
        console.log(storage)
        i = storage.s
        let salesPlaces = JSON.parse(localStorage['places'])
        let date = localStorage['date']
        let day = localStorage['day']
  
       
        localStorage['storage'] = JSON.stringify(storage)
        localStorage['date'] = date
        localStorage['day'] = day
        let places = "";
      let price = 0;
      
      salesPlaces.forEach(salePlace => {
        if (places) {
          places += ", ";
        };
        places += `${salePlace.row}/${salePlace.place}`;
        price += salePlace.type === "standart" ? Number(storage.hall_price_standart) : Number(storage.hall_price_vip);
      });
      localStorage['places'] = JSON.stringify(salesPlaces);
      
      document.querySelector(".ticket__title").innerHTML = storage.film_name;
      document.querySelector(".ticket__chairs").innerHTML = places;
      document.querySelector(".ticket__hall").innerHTML = storage.hall_name;
      document.querySelector(".ticket__start").innerHTML = storage.seance_time;
      document.querySelector(".ticket__cost").innerHTML = price;
      }    
    
    document.querySelector(".acceptin-button").addEventListener("click", (event) => {
      event.preventDefault()
      value4 = JSON.parse(localStorage['hall_config']).replace(/selected/g, "taken")
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
    
    })
  }
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
let page = window.location.href
if (page.includes('ticket.html')) {
value.getTicket()
} else{
value.getList()

value.getConfig()
value.getReserv(value.getConfig())
}
//value.runReserv(value.getReserv(value.getConfig()))
//
// 1686640200, 71, 62
