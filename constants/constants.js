import CryptoJS from "crypto-js";

export const encrypt = (text) => {
    var secret = "test1234";
    var ciphertext = CryptoJS.AES.encrypt(text, secret).toString();
    return ciphertext;
} 

export const decrypt = (text) => {
    var secret = "test1234";
    let bytes  = CryptoJS.AES.decrypt(text, secret);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}