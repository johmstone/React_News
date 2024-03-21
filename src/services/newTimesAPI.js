import { Modal } from "antd"
import moment from "moment";
import Parameters from '../assets/data.json'

class NewTimesAPIServices {

    async Newest() {
        let currentdate = new Date()
        let srtCurrentDate = moment(currentdate).format("YYYYMMDD")
        let strNextDate = moment(currentdate).add(1,'day').format('YYYYMMDD')

        let baseURL = Parameters.NewTimesAPI.MainURL + "/svc/search/v2/articlesearch.json?begin_date=" + srtCurrentDate + "&end_date=" + strNextDate + "&api-key=" + Parameters.NewTimesAPI.API_Key;
        console.log(baseURL)
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
                let parseData = json.response.docs.map((item,i) => {
                    return {
                        pubDate: item.pub_date,
                        pubTitle: item.headline.main,
                        pubAbstract: item.abstract,
                        pubURL: item.web_url,
                        pubImg: item.multimedia[0] !== undefined ? "https://static01.nyt.com/" + item.multimedia[0].url : null,
                        pubSource: item.source,
                        pubAuthor: item.byline.original.replace("By ",""),
                        pubTag: item.section_name,
                        pubSourceCall: "NewTimes"
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

    async ByTag(TagName) {
        let baseURL = Parameters.NewTimesAPI.MainURL + "/svc/search/v2/articlesearch.json?&fq=section_name:(\"" + TagName + "\")&sort=newest&api-key=" + Parameters.NewTimesAPI.API_Key;
        // console.log(baseURL)
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
                let parseData = json.response.docs.map((item,i) => {
                    // console.log(item.byline.original)
                    return {
                        pubDate: item.pub_date,
                        pubTitle: item.headline.main,
                        pubAbstract: item.abstract,
                        pubURL: item.web_url,
                        pubImg: item.multimedia[0] !== undefined ? "https://static01.nyt.com/" + item.multimedia[0].url : null,
                        pubSource: item.source,
                        pubAuthor: item.byline.original !== null ? item.byline.original.replace("By ","") : null,
                        pubTag: item.section_name,
                        pubSourceCall: "NewTimes"
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

export default NewTimesAPIServices