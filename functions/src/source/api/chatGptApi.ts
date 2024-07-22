const axios = require('axios');

export async function documentValidation (documentInput : string){
let data = JSON.stringify({
  "model": "gpt-3.5-turbo-instruct",
  "prompt": documentInput,
  "max_tokens": 3000,
  "temperature": 0
});
let secretKey = atob("c2stcHJvai1nUnlnSmNWUmpRdndVOEdWWDhDTVQzQmxia0ZKNTlDbkFNdlpQOEp0emY0YngwQ0M=");
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.openai.com/v1/completions',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer '+secretKey, 
    'Cookie': '__cf_bm=vv3kRmbIZbpaRMTgTNePPdEs5S_oAuIvncKvj5OaYxI-1721673342-1.0.1.1-m3X2SzQ9.lrmy.Aec62J5wmXq5DNLFCA3I4aV_0g5u5eO5gF_yK9G6yL4C_6xxXvUhKdHrn18EPhJg9sJx_1Dw; _cfuvid=gOaXCKQmFWt7G7E6xu7OcQMsZiTfoEsf7xk02BAa3j0-1721673342054-0.0.1.1-604800000'
  },
  data : data
};

return await axios.request(config)
.then((response: any) => {
    console.log(JSON.stringify(response.data));
    return JSON.parse(response.data.choices[0].text);
})
.catch((error: any) => {
  console.log(error);
  return error;
});
}