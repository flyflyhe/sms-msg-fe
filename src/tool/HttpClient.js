import axios from 'axios'

export default {
    hGet:(api) => {
        return axios.get(api).then(res => {
                return res;
            }).catch(error=>{
                return error;
            })
    },
    hPost: (api, data) => {
        return axios.post(api, data).then(res => {
            return res;
        }).catch(err => {return err; })
    },
    hPut: (api, data) => {
        return axios.put(api, data).then(res => {return res;}).catch(err => {return err;})
    },
    hDelete: (api) => {
        return axios.delete(api).then(res => {return res;}).catch(err => {return err;});
    }
};