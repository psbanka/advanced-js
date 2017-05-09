const FAIL_PERCENT = 0.5

console.log('\n\n\n\nstart program ------------------------------------------')

function talkToServer (successCallback, errorCallback) {
  const functionThatWillBeRunInFiveHundredMs = function () {
    const randomValue = Math.random()
    const serverResponse = (Math.random() > FAIL_PERCENT) ? 500 : 200
    if (randomValue > FAIL_PERCENT) {
      errorCallback('error')
    } else {
      console.log('the server responded!!')
      let serverStringReply = {responseCode: serverResponse, output: '[{"category":"Sporting Goods","price":49.99,"stocked":true,"name":"Football"},{"category":"Sporting Goods","price":9.99,"stocked":true,"name":"Baseball"},{"category":"Sporting Goods","price":29.99,"stocked":false,"name":"Basketball"},{"category":"Electronics","price":99.99,"stocked":true,"name":"iPod Touch"},{"category":"Electronics","price":399.99,"stocked":false,"name":"iPhone 5"},{"category":"Electronics","price":199.99,"stocked":true,"name":"Nexus 7"}]'}
      console.log('callback initiated')
      successCallback(serverStringReply)
    }
  }
  console.log('initiating connection to the server...')
  setTimeout(functionThatWillBeRunInFiveHundredMs, 500)
}

function verifyResponse (serverResponse, successCallback, errorCallback) {
  setTimeout(() => {
    if (serverResponse.responseCode === 500) {
      errorCallback('error verifying server response')
    } else {
      successCallback(serverResponse.output)
    }
  }, 500)
}

function convertJson (jsonString, successCallback) {
  const conversionFunction = function () {
    successCallback(JSON.parse(jsonString))
  }
  setTimeout(conversionFunction, 500)
}

const successfulJsonCallback = function (parsedServerReply) {
  console.log('json callback')
  console.log(parsedServerReply)
}

const errorJsonCallback = function (errorMsg) {
  console.log('error in json conversion', errorMsg)
}

const successfulVerification = function (serverResponseString) {
  convertJson(serverResponseString, successfulJsonCallback, errorJsonCallback)
}

const errorVerification = function (errorMsg) {
  console.log('error in verification', errorMsg)
}

const successCallback = function (serverResponse) {
  console.log(serverResponse)
  console.log('our callback was called')
  console.log('success')
  verifyResponse(serverResponse, successfulVerification, errorVerification)
}

const errorCallback = function (error) {
  console.log('error!')
  console.log(error)
}

console.log('about to talk to the server')
talkToServer(successCallback, errorCallback)

console.log('end of program')
