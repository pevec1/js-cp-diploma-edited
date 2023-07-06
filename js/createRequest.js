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
