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

class ApiConnect {
  constructor (value1, value2, value3, value4) {
    this.value1 = value1
    this.value2 = value2
    this.value3 = value3
    this.value4 = value4
  }
  static URL = 'https://jscp-diplom.netoserver.ru/'
  static time (hms) {
    let a = hms.replace('"', '').replace('"', '').split(':')
    //console.log(a)
    return [a[0],a[1]]
    return Number(seconds)
  }
  /**
 * Основная функция для совершения запросов
 * на сервер.

createRequest(url, data, method, callback){
    let xhr = new XMLHttpRequest()
    let formData = '';
    xhr.responseType = 'json'
    // формат, в котором необходимо выдать результат
  console.log(url)

    formData = encodeURI(data);
    console.log(formData); // key=value

    let res;
  xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            callback(xhr.response)
            //  res = xhr.response
            //console.log(res)
           } catch (err) {
            console.log(err, e)
              callback(err, e)
           }
        }
      }
    }
  console.log(res)
    xhr.ontimeout = function () {
      console.log('Timeout')
    }
    xhr.open(method, url, true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if (method === 'POST') {
      xhr.send(formData)
    } else {
      xhr.send()
    }
  //  return res
  }
 * */
static res (res1) {
  //let x = JSON.parse(res1)
        console.log(res1)
        return Array.from(res1)
   }
  
   static getList ( callback = f => f) {
    return createRequest({
      method: 'POST',
      responseType: 'json',
      async: true,
      data: 'event=update',
      callback: (err, response) => {
        if (response&&response.halls&&response.films&&response.seances) {
          return this.res(JSON.parse(JSON.stringify(response)))
        }
        callback.call( this, err, response );
      }
    })
  }
   getConfig ( callback = f => f) {
    return createRequest({
      method: 'POST',
      responseType: 'json',
      async: true,
      data: 'event=update',
      callback: (err, response) => {
        if (response&&response.halls&&response.films&&response.seances) {
          return this.listConfig(JSON.stringify(response))
        }
        callback.call( this, err, response );
      }
    })
  }
  /*
  getList() {
    return this.createRequest(
      'https://jscp-diplom.netoserver.ru/', // адрес
      'event=update', //
      'POST', // метод запроса
    function(result){
      return result.seances.result[3].seance_time
    })
  }
*/
 runConfig(res1){
    console.log(JSON.parse(res1))
}

listConfig (res1, callback = f => f) {
  let x = JSON.parse(res1)
  const str = '2023-04-26'
  const date = new Date()
  const st = String(JSON.stringify(x.seances.result[3].seance_time))
  const st2 = String(JSON.stringify(x.seances.result[3].seance_start))
  date.setHours(ApiConnect.time(st)[0]);
  date.setMinutes(ApiConnect.time(st)[1]);
  date.setSeconds(0);
  const timestamp = date.getTime()
  //console.log(timestamp)
  const unixTimestamp = Math.floor(date.getTime() / 1000)
  //console.log(unixTimestamp)
  //console.log(ApiConnect.time('01:00'))
  let value1, value2, value3
  value1 = this.value1
  console.log(value1)
  value2 = this.value2
  console.log(value2)
  value3 = this.value3
  console.log(value3)
    console.log(x)
  //console.log(st, st2)
  if (value1 === undefined || value2 === undefined || value3 === undefined){
      value1 = unixTimestamp
      console.log(value1)
    value2 = Number(JSON.stringify(x.halls.result[0].hall_id).replace('"','').replace('"',''))
    console.log(value2)
    value3 = Number(JSON.stringify(x.seances.result[3].seance_id).replace('"','').replace('"',''))
    console.log(value3)
  }
  return createRequest({
    method: 'POST',
    responseType: 'json',
    async: true,
    data: `event=get_hallConfig&timestamp=${value1}&hallId=${value2}&seanceId=${value3}`,
    callback: (err, response) => {
      if (response) {
        return this.runConfig(JSON.stringify(response));
      }
      callback.call(this, err, response);
    }
  })
}
}

// здесь перечислены все возможные параметры для функции
//createRequest()
let value = new ApiConnect(1686640200, 71, 62)
ApiConnect.getList()

//ApiConnect.res(JSON.parse(ApiConnect.getList()))[0]
// console.log(ApiConnect.res())
// let halls = new ApiConnect()
///console.log(halls)
//ApiConnect.runConfig(ApiConnect.getList())
value.getConfig()

//console.log(ApiConnect.listconfig(ApiConnect.getList()))
//console.log(list.seances.result[3].seance_time)
//   request.getConfig(
//     unixTimestamp + request.time(request.getList().seances.result[3].seance_time) + Number(request.getList().seances.result[3].seance_start),
//     request.getList().halls.result[0].hall_id,
//     request.getList().seances.result[3].seance_id,
//     'https://jscp-diplom.netoserver.ru/',
//     'POST')
