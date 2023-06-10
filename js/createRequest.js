class ApiConnect{
    constructor(){
        
    }

time(hms){
    let a = hms.split(':');
    let seconds = (+a[0]) * 60 + (+a[1]); 
    return Number(seconds);   
}

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
createRequest(url, data, method, callback){
    let xhr = new XMLHttpRequest()
    let formData = '';
    xhr.responseType = 'json'
    // формат, в котором необходимо выдать результат
  console.log(url)

    formData = encodeURI(data);
    console.log(formData); 

    let res;
  xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
              //callback(xhr.response)
              res = xhr.response
            console.log(res)
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
    return res
  }

  getList(url,data = 'event=update',method) {
    let res = 1;
    return this.createRequest(
        url ,
        data,
        method,
        function(result){
            console.log(response)
            res = result
           })
    }

  getConfig(url, data, method){
    let value1, value2, value3
       // value1= result.unixTimestamp + this.time(result.seances.result[3].seance_time) + Number(result.seances.result[3].seance_start)

    data = `event=get_hallConfig&timestamp=${value1}&hallId=${value2}&seanceId=${value3}`
    return this.createRequest(
        url,
        data,
        method,
        function(result){
            console.log(result)
           })
  }
}  

let request = new ApiConnect()
  // здесь перечислены все возможные параметры для функции
 console.log(request.createRequest(
    'https://jscp-diplom.netoserver.ru/', // адрес
  'event=update', //
  'POST', // метод запроса
function(result){
 console.log(result)
})
 )
  
let list = request.getList(
    'https://jscp-diplom.netoserver.ru/', // адрес
    'event=update', //
    'POST'
)

  const str = '2023-04-26';
  const date = new Date(str);
  const timestamp = date.getTime();
  console.log(timestamp); 
  const unixTimestamp = Math.floor(date.getTime() / 1000);
console.log(unixTimestamp);
console.log(request.time('01:00'))

console.log(list)

console.log(list.seances.result[3].seance_time)
//   request.getConfig(
//     unixTimestamp + request.time(request.getList().seances.result[3].seance_time) + Number(request.getList().seances.result[3].seance_start),
//     request.getList().halls.result[0].hall_id,
//     request.getList().seances.result[3].seance_id,
//     'https://jscp-diplom.netoserver.ru/',
//     'POST')
