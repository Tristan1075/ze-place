import {MAPBOX_TOKEN} from '@env';
import axios, {AxiosResponse} from 'axios';

export const searchPlace = async (query: string) => {
  return await axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=fr&postcode&types=address,postcode,country&access_token=${MAPBOX_TOKEN}`,
    )
    .then((response: AxiosResponse<any>) => {
      console.log(response.data);
      return response.data.features;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
