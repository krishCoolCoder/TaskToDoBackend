const CryptoJS = require('crypto-js');

function cryptoEncode( input : Object ): string {
    return CryptoJS.AES.encrypt(
        JSON.stringify(input),
        "godstylekdkd*#&@*"
      ).toString();
}
function cryptoDecode( input : Object ): any {
  console.log("The decoded data is this : ", CryptoJS.AES.decrypt(input, "godstylekdkd*#&@*").toString(CryptoJS.enc.Utf8));
    return JSON.parse(
        CryptoJS.AES.decrypt(input, "godstylekdkd*#&@*").toString(CryptoJS.enc.Utf8)
      );
}

export { cryptoEncode, cryptoDecode}