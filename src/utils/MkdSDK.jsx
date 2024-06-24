export default function MkdSDK() {
  this._baseurl = "https://reacttask.mkdlabs.com";
  this._project_id = "reacttask";
  this._secret = "d9hedycyv6p7zw8xi34t9bmtsjsigy5t7";
  this._table = "video";
  this._custom = "";
  this._method = "";

  const raw = this._project_id + ":" + this._secret;
  let base64Encode = btoa(raw);

  this.setTable = function (table) {
    this._table = table;
  };
  
  this.login = async function (email, password, role) {
    // the login request API endpoint 
    const url = "https://reacttask.mkdlabs.com/v2/api/lambda/login";
  
    // the request headers 
    const headers = {
      "Content-Type": "application/json",
      "x-project": base64Encode
    };
  
    // the request body
    const body = {
      email: email,
      password: password,
      role: role
    };
  
    // use the try....catch block to handle async request and error
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });
  
      if (!response.ok) {
        throw new Error("Bad Request");
      }
  
      const data = await response.json();
  
      if (data.error) {
        throw new Error("An Error Occurred: Login Failed");
      }
  
      // return the required data
      return {
        error: data.error,
        role: data.role,
        token: data.token,
        expire_at: data.expire_at,
        user_id: data.user_id
      };
  
    } catch (err) {
      console.log("An Error Occurred: ", err); //log the error
      throw err;  // throw the error
    }
  };

  this.getHeader = function () {
    return {
      "Authorization": "Bearer " + localStorage.getItem("token"),
      "x-project": base64Encode,
    };
  };

  this.baseUrl = function () {
    return this._baseurl;
  };
  
  this.callRestAPI = async function (payload, method) {
    const header = {
      "Content-Type": "application/json",
      "x-project": base64Encode,
      "Authorization": "Bearer " + localStorage.getItem("token"),
    };

    switch (method) {
      case "GET":
        const getResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/GET`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload),
          }
        );
        const jsonGet = await getResult.json();

        if (getResult.status === 401) {
          throw new Error(jsonGet.message);
        }

        if (getResult.status === 403) {
          throw new Error(jsonGet.message);
        }
        return jsonGet;
      
      case "PAGINATE":
        if (!payload.page) {
          payload.page = 1;
        }
        if (!payload.limit) {
          payload.limit = 10;
        }

        const paginateResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload),
          }
        );
        const jsonPaginate = await paginateResult.json();

        if (paginateResult.status === 401) {
          throw new Error(jsonPaginate.message);
        }

        if (paginateResult.status === 403) {
          throw new Error(jsonPaginate.message);
        }
        return jsonPaginate;
      default:
        break;
    }
  };  

  this.check = async function (role, token) {
    //TODO
    // api end point to validate token
    const url = "https://reacttask.mkdlabs.com/v2/api/lambda/check";
    // request headers
    const headers = {
      "x-project": "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };
    // Request Body
    const body = {role: role}
    try { 
      const response = await fetch(url, {method: "POST", body: JSON.stringify(body), headers: headers});
      // check response status
      const data = await response.json()
      if(!data.error) {
        return true
      }
      return false
    
    }catch(err) {
      console.log("An Error Occurred", err);
      throw err;
    }
  };

  

  return this;
}
