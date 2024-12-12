import axios from 'axios';
import {useRecoilState} from 'recoil';

export const AxiosRequest = async (apiKey, url) => {
  let headers = {
    'Content-Type': 'multipart/form-data',
    Accept: '*/*',
  };

  console.log(apiKey);
  console.log(url + 'url');
  return await axios({
    method: 'post',
    url: url,
    data: apiKey,
    headers: headers,
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};
