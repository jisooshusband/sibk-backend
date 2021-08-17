const request = require('request')

const token = 'w4isbvy7boq0oqsl'
const instanceId = '320810'

const sendText = (purpose, reciver, otp, studentName, violent, deduction, totalPoint) => {
  const otpMail = `
  OTP untuk register ke akun SIBK mu adalah ${otp}. kode ini berlaku selama 5 menit dan jangan bagikan kode ini ke siapapun
`
  const notificationMail = `
  Kepada YTH Orang tua dari saudara ${studentName}, kami selaku guru bimbingan konseling ingin menginformasikan bahwa saudara  ${studentName} telah melakukan pelanggaran ${violent} serta mendapat ${deduction} poin kedisiplinan. Total poin sekarang adalah ${totalPoint}. Demikian info yang kami berikan, terimakasih.
`
  const data = {
    phone: `${reciver}`,
    body: purpose === 'otp' ? otpMail : notificationMail
  }

  request({
    url: `https://api.chat-api.com/instance${instanceId}/message?token=${token}`,
    method: 'POST',
    json: data
  })
}

module.exports = sendText
