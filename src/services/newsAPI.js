import { Modal } from "antd";
import Parameters from "../assets/data.json";

class NewsAPIServices {

    async Newest() {

        let baseURL = Parameters.NewsAPI.MainURL + "//v2/everything?q=today&apiKey={{NewsApiOrg_APIKEY}}"

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
            .then(json => { return json; })
            .catch(err => {
                console.log(err)
                Modal.error({
                    title: "Error Inesperado",
                    content: "Occurio un error inesperado, por favor intentelo de nuevo."
                });
            });
    }

}

export default NewsAPIServices