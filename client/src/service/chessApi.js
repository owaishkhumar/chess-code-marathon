import axios from "axios"

const url = 'http://localhost:5181/api/Chess'

const addMatchApi = async (match) => {
    let data = null;
    try{
        let response = await axios.post(url, match);
        
        if(response.status === 200 && response.data !== null){
            data = await response.data;
        }
    }
    catch(error){
        console.log(JSON.stringify(error));
    }
    return data
}

const getPlayersByCountry = async (country) => {
    let data = null;
    try{
        let response = await axios.get(`${url}?country=${country}&sortedFlied=current_world_ranking`);
        if(response.status === 200 && response.data !== null){
            data = await response.data;
        }
    }
    catch(error){
        console.log(JSON.stringify(error));
    }
    return data;
}

const getPlayersPerformance = async () => {
    let data = null;
    try{
        let response = await axios.get(`${url}/playerperformance`)
        if(response.status === 200 && response.data !== null){
            data = await response.data;
        }
    }
    catch(error){
        console.log(JSON.stringify(error));
    }
    return data;
}

const getPlayerAboveAvg = async () => {
    let data = null;
    try{
        let response = await axios.get(`${url}/playeraboveaverge`)
        if(response.status === 200 && response.data !== null){
            data = await response.data;
        }
    }
    catch(error){
        console.log(JSON.stringify(error));
    }
    return data;
}




export { addMatchApi, getPlayersByCountry, getPlayersPerformance , getPlayerAboveAvg};