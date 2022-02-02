// return [colos, state, message]
import axios from 'axios';
import { SummaryInterface } from '../model/Summary';
import { RegionInterface } from '../model/Region';

export const getSummary = async():Promise<[boolean, SummaryInterface|null]> => {
    const [err, data] = await getData('lastest.json');
    if(err) {
        return [false, null]
    }
    const rtn = data as SummaryInterface;
    return [true, rtn];
};
export const getRegionDetail = async(regionId: Number):Promise<[boolean, RegionInterface|null]> => {
    const [err, data] = await getData(`lastest-${regionId}.json`);
    if(err) {
        return [false, null]
    }
    const rtn = data as RegionInterface;
    return [true, rtn];
};

const getData = async(filename: string) => {
    const url = `./${filename}`;
    try {
        const res = await axios({
            url,
            method:'GET'
        });
        return [null, res.data]
        // .then(response => console.log(response))
    } catch (err) {
        console.warn(err);
        return [err, null];
    }
}