import { Modal } from "antd";
import moment from "moment";
import Parameters from "../assets/data.json";

class NewsAPIServices {

    async Search(TagName, StartDate, EndDate) {

        let baseURL = Parameters.NewsAPI.MainURL

        if (StartDate === null) {
            baseURL = baseURL + `/v2/everything?sortBy=publishedAt&pageSize=10&q=${TagName}&apiKey=${Parameters.NewsAPI.API_Key}`;
        } else {
            let srtCurrentDate = moment(StartDate).format("YYYY-MM-DD")
            let strNextDate = moment(EndDate).format('YYYY-MM-DD')
            baseURL = baseURL + `/v2/everything?sortBy=publishedAt&pageSize=10&q=${TagName}&from=${srtCurrentDate}&to=${strNextDate}&apiKey=${Parameters.NewsAPI.API_Key}`
        }
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
                let jsonFilter = json.articles.filter(item => item.urlToImage !== null)
                let parseData = jsonFilter.map((item, i) => {
                    return {
                        pubDate: item.publishedAt,
                        pubTitle: item.title,
                        pubAbstract: item.description,
                        pubURL: item.url,
                        pubImg: item.urlToImage,
                        pubSource: item.source.name,
                        pubAuthor: item.author,
                        pubTag: TagName ? TagName : item.source.name,
                        pubSourceCall: "NewsAPI"
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

export default NewsAPIServices