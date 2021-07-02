import axios, {AxiosResponse} from 'axios';
import {MAPBOX_TOKEN} from '../env';
import { Coords } from '../types';

export const searchPlace = async (query: string, location?: Coords) => {
  return await axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=fr&postcode&types=address&proximity=${location?.longitude},${location?.latitude}&access_token=${MAPBOX_TOKEN}`,
    )
    .then((response: AxiosResponse<any>) => {
      return response.data.features;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
