import { Modal } from "antd"
import moment from "moment"
import Parameters from "../assets/data.json"

class TheGuardianAPIServices {

    async Newest() {
        let currentdate = new Date()
        let srtCurrentDate = moment(currentdate).format("YYYY-MM-DD")
        let strNextDate = moment(currentdate).add(1,'day').format('YYYY-MM-DD')

        let baseURL = Parameters.TheGuardianAPI.MainURL + "/search?from-date=" + srtCurrentDate + "&to-date=" + strNextDate + "&api-key=" + Parameters.TheGuardianAPI.API_Key

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        return fetch(baseURL, requestOptions)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then(json => { 
                let parseData = json.response.results.map((item,i) => {
                    return {
                        pubDate: item.webPublicationDate,
                        pubTitle: item.webTitle,
                        pubAbstract: null,
                        pubURL: item.webUrl,
                        pubImg: null,
                        pubSource: null,
                        pubAuthor: null
                    }
                })
                return parseData; 
            })
            .catch(err => {
                console.log(err)
                Modal.error({
                    title: "Error Inesperado",
                    content: "Occurio un error inesperado, por favor intentelo de nuevo."
                });
            });
    }

}

export default TheGuardianAPIServices