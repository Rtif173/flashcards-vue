import CryptoJS from 'crypto-js';

const backendURL = "http://memorymate.pythonanywhere.com/api/v1/"
export class API {
  session = localStorage.getItem("session")

  async isEmailRegistered(email) {
    const resp = await fetch(backendURL + "is_email_registered?email=" + email);
    const status = resp.status
    console.log(status);
    if (status == 200) {
      const t = await resp.json()
      return [t[0], null]
    }
    else {
      const t = await resp.json()
      return [t.error, status]
    }
  }
  async register(username, email, password) {
    const pwd = CryptoJS.SHA256(password).toString();
    const resp = await fetch(backendURL + `register?username=${username}&email=${email}&pwd=${pwd}`);
    const status = resp.status;
    if (status == 200) {
      const t = await resp.text()
      return [t, null]
    }
    else {
      const t = await resp.json()
      return [t.error, status]
    }
  }
  async login(email, password) {
    const pwd = CryptoJS.SHA256(password).toString();
    const resp = await fetch(backendURL + `login?email=${email}&pwd=${pwd}`);
    const status = resp.status;
    if (status == 200) {
      const t = await resp.json()
      return [t.session, null]
    }
    else {
      const t = await resp.json()
      return [t.error, status]
    }
  }
  async sendCardsToServer(name, cards, media, oldname) {
    const jsonData = { "cards": cards, "media": media };
    const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
    const formData = new FormData();
    formData.append('file', jsonBlob, `${name}.json`);

    fetch(backendURL + `upload_cardset?session=${this.session}` + (oldname ? `&oldname=${oldname}` : ''), {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }
  async loadCardsFromServer(username, cardsetname) {
    const resp = await fetch(backendURL + username + '/' + cardsetname);
    const status = resp.status;
    if (status == 200) {
      const json = await resp.json();
      if ("cards" in json && "media" in json) {
        return [json, null]
      } else {
        return "cardset has invalid properties", 500
      }
    } else {
      return [(await resp.json()).error, status]
    }
  }

  async userInfo() {
    const resp = await fetch(backendURL + `session_info?session=${this.session}`)
    const status = resp.status;
    const json = await resp.json();
    if (status == 200) {
      return [json, null]
    } else {
      return [json.error, status]
    }
  }

  async deleteCardsets(cardsetnames) {
    const resp = await fetch(backendURL + `delete_cardsets?session=${this.session}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardsetnames)
    })
    const status = resp.status;
    if (status == 200) {
      const text = await resp.text();
      return [text, null]
    } else {
      const text = await resp.text();
      return [text, status]
    }
  }
}

const api = new API();
export default api;