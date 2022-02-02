import { REGIONS } from "../constants/Region";
import { TIMES } from "../constants/Time";

export const getRegionName = (regionId: number) => REGIONS[regionId as number];

export const getTimeName = (timeId: string) => {
    let name = "NONE";
    TIMES.forEach( time => {
        if(time.id === timeId) {
            name = time.name;
            // return;
        }
    })
    return name;
}

export const timeSince = (date) => {

    const seconds = Math.floor((new Date().getTime() - date) / 1000);
  
    let interval = seconds / 31536000;
  
    if (interval > 1) {
      return `${Math.floor(interval)}years`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval)}months`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)}days`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `${Math.floor(interval)}hours`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)}minutes`;
    }
    return `${Math.floor(seconds)}seconds`;
  }