listReserv(res1, callback = f => f) {
    //console.log(res1)
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
      console.log(this.getConfig())
  
      //value4 = JSON.parse(this.value4)
      /*return createRequest({
        method: 'POST',
        responseType: 'json',
        async: true,
        data: `event=sale_add&timestamp=${value1}&hallId=${value2}&seanceId=${value3}&hallConfiguration=${value4}`,
        callback: (err, response) => {
          if (response) {
            return this.runReserv(JSON.stringify(response));
          }
            callback.call(this, err, response);
        }
      })*/
    }
    getReserv ( callback = f => f) {
      return createRequest({
        method: 'POST',
        responseType: 'json',
        async: true,
        data: 'event=update',
        callback: (err, response) => {
          if (response&&response.halls&&response.films&&response.seances) {
            return this.listReserv(JSON.stringify(response))
          }
          callback.call( this, err, response );
        }
      })
    }
    runReserv(res1){
      console.log(JSON.parse(res1))
   }
  


     //value4 = `<div class="conf-step__row"><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_disabled"></span><span class="conf-step__chair conf-step__chair_disabled"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span></div><div class="conf-step__row"><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span></div><div class="conf-step__row"><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span></div><div class="conf-step__row"><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_vip"></span><span class="conf-step__chair conf-step__chair_vip"></span><span class="conf-step__chair conf-step__chair_vip"></span><span class="conf-step__chair conf-step__chair_vip"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span></div><div class="conf-step__row"><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart conf-step__chair_taken"></span><span class="conf-step__chair conf-step__chair_vip"></span><span class="conf-step__chair conf-step__chair_vip"></span><span class="conf-step__chair conf-step__chair_vip"></span><span class="conf-step__chair conf-step__chair_vip"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span></div><div class="conf-step__row"><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_vip"></span><span class="conf-step__chair conf-step__chair_vip"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span></div><div class="conf-step__row"><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span></div><div class="conf-step__row"><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span></div><div class="conf-step__row"><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span></div><div class="conf-step__row"><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_disabled"></span><span class="conf-step__chair conf-step__chair_disabled"></span><span class="conf-step__chair conf-step__chair_disabled"></span><span class="conf-step__chair conf-step__chair_disabled"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span><span class="conf-step__chair conf-step__chair_standart"></span></div><div class="conf-step__hall-wrapper__save-status"></div>`
     