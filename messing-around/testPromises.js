const SUCCESS_PERCENT = 0.5

console.log('\n\n\n\nstart program ------------------------------------------')

function talkToServer () {
  return new Promise((resolve, reject) => {
    const randomValue = Math.random()
    const serverResponse = (Math.random() > SUCCESS_PERCENT) ? 500 : 200
    if (randomValue > SUCCESS_PERCENT) {
      reject(new Error('server failed to respond at all'))
    } else {
      let serverStringReply = {responseCode: serverResponse, output: '[{"category":"Sporting Goods","price":49.99,"stocked":true,"name":"Football"},{"category":"Sporting Goods","price":9.99,"stocked":true,"name":"Baseball"},{"category":"Sporting Goods","price":29.99,"stocked":false,"name":"Basketball"},{"category":"Electronics","price":99.99,"stocked":true,"name":"iPod Touch"},{"category":"Electronics","price":399.99,"stocked":false,"name":"iPhone 5"},{"category":"Electronics","price":199.99,"stocked":true,"name":"Nexus 7"}]'}
      resolve(serverStringReply)
    }
  })
}

function verifyServerResponseCode (serverResponse) {
  return new Promise((resolve, reject) => {
    if (serverResponse.responseCode === 500) {
      reject(new Error('internal server failure'))
    } else {
      resolve(serverResponse.output)
    }
  })
}

function convertJsonString (serverString) {
  return new Promise((resolve, reject) => {
    if (Math.random() > SUCCESS_PERCENT) {
      reject(new Error('could not parse JSON'))
    } else {
      resolve(JSON.parse(serverString))
    }
  })
}

talkToServer()
  .then(verifyServerResponseCode)
  .then(convertJsonString)
  .then((parsedServerData) => {
    console.log(parsedServerData)
  })
  .catch((err) => {
    console.log(err)
  })

/*
 * NOTE THAT THIS IS THE BAD WAY TO DO IT:
 *

myServerPromise
  .then((serverOutput) => {
    verifyServerResponseCode(serverOutput)
      .then((serverString) => {
        console.log(serverString)
      })
      .catch((err) => {
        console.log('analyzing server response error method')
        console.log(err)
      })
  })
  .catch((err) => {
    console.log('talking to server error catch method')
    console.log(err)
  })
*/
