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

function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}

var request = makeHttpObject();
request.open("GET", "hall.html", true);
request.send(null);
request.onreadystatechange = function() {
  if (request.readyState == 4)
    ;//alert(request.responseText);
};

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
    //return Number(seconds)
  }
 res (res1) {
  //let x = JSON.parse(res1)
        console.log(res1)
        //return Array.from(res1)
   }
  
   getList ( callback = f => f) {
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
          return this.listConfig(JSON.parse(JSON.stringify(response)))
        }
        callback.call( this, err, response );
      }
    })
  }
 runConfig(res){
    console.log(res)
    return res
}

listConfig (res1, callback = f => f) {
  console.log(res1)
  let x = res1
  let value1, value2, value3
  const str = '2023-04-26'
  const date = new Date()
  let st, st2
  let timestamp
  let unixTimestamp
  let i=6;
  let j = 0;
  st = String(JSON.stringify(x.seances.result[i].seance_time))
  st2 = String(JSON.stringify(x.seances.result[i].seance_start))
  j = String(JSON.stringify(x.seances.result[i].seance_hallid))
  date.setHours(ApiConnect.time(st)[0]);
  date.setMinutes(ApiConnect.time(st)[1]);
  date.setSeconds(0);
  timestamp = date.getTime()
  //console.log(timestamp)
  unixTimestamp = Math.floor(date.getTime() / 1000)
  //console.log(unixTimestamp)
  //console.log(ApiConnect.time('01:00'))
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
    value2 = Number(j.replace('"','').replace('"',''))
    console.log(value2)
    value3 = Number(JSON.stringify(x.seances.result[i].seance_id).replace('"','').replace('"',''))
    console.log(value3)
  }
  return createRequest({
    method: 'POST',
    responseType: 'json',
    async: true,
    data: `event=get_hallConfig&timestamp=${value1}&hallId=${value2}&seanceId=${value3}`,
    callback: (err, response) => {
      if (response) {
        //console.log(JSON.stringify(response))
        return this.runConfig(JSON.stringify(response));
      }
      callback.call(this, err, response);
    }
  })
}

runReserv(res){
  console.log(res)
  return res
}

listReserv(res2, callback = f => f) {
 // console.log(res1)
  console.log(res2)
    let x = res2
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
    let value1, value2, value3, value4
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
    console.log('я не знаю как сюда поместить результат колбека this.listConfig(res1, callback)')
    
     value4 = '';

return createRequest({
      method: 'POST',
      responseType: 'json',
      async: true,
      data: `event=sale_add&timestamp=${value1}&hallId=${value2}&seanceId=${value3}&hallConfiguration=${value4}`,
      callback: (err, response) => {
        if (response) {
          return this.runReserv( JSON.stringify(response));
        }
          callback.call(this, err, response);
      }
    })
  }

  getReserv (callback = f => f) {
    return createRequest({
      method: 'POST',
      responseType: 'json',
      async: true,
      data: 'event=update',
      callback: (err, response) => {
        if (response&&response.halls&&response.films&&response.seances) {
          return this.listReserv(JSON.parse(JSON.stringify(response)))
        }
        callback.call( this, err, response );
      }
    })
  }

}

// здесь перечислены все возможные параметры для функции
//createRequest()
let value = new ApiConnect()
value.getList()

value.getConfig()
value.getReserv(value.getConfig())
// 
// 1686640200, 71, 62