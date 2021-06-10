import axios, {AxiosResponse} from 'axios';
import {MAPBOX_TOKEN} from '../env';

export const searchPlace = async (query: string) => {
  return await axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=fr&postcode&types=address&access_token=${MAPBOX_TOKEN}`,
    )
    .then((response: AxiosResponse<any>) => {
      return response.data.features;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
