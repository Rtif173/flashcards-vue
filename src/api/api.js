import CryptoJS from 'crypto-js';

const backendURL = "http://memorymate.pythonanywhere.com/api/v1/"
export class API{
  async isEmailRegistered(email){
    const resp = await fetch(backendURL+"is_email_registered?email="+email);
    const status = resp.status
    console.log(status);
    if(status == 200){
      const t = await resp.json()
      return [t[0], null]
    }
    else{
      const t = await resp.json()
      return [t.error, status]
    }
  }
  async register(username, email, password){
    const pwd = CryptoJS.SHA256(password).toString();
    const resp = await fetch(backendURL+`register?username=${username}&email=${email}&pwd=${pwd}`);
    const status = resp.status;
    if(status == 200){
      const t = await resp.text()
      return [t, null]
    }
    else{
      const t = await resp.json()
      return [t.error, status]
    }
  }
  async login(email, password){
    const pwd = CryptoJS.SHA256(password).toString();
    const resp = await fetch(backendURL+`login?email=${email}&pwd=${pwd}`);
    const status = resp.status;
    if(status == 200){
      const t = await resp.json()
      return [t.session, null]
    }
    else{
      const t = await resp.json()
      return [t.error, status]
    }
  }
}

const api = new API();
export default api;