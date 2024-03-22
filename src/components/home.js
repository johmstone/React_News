/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { List, Button, Tag } from 'antd'
import moment from 'moment'

import { MainNew } from './mainNew'

import NewsAPIServices from '../services/newsAPI'
import NewTimesAPIServices from '../services/newTimesAPI'
import TheGuardianAPIServices from '../services/theGuardianAPI'

export const Home = () => {

    const NewsAPISVC = new NewsAPIServices();
    const NewTimesSVC = new NewTimesAPIServices();
    const TheGuardianSVC = new TheGuardianAPIServices();

    const [MainNewItem, setMainNewItem] = useState({})
    const [NewsList, setNewsList] = useState([])
    const [RelevantNewsList, setRelevantNewsList] = useState([])
    const [TagList, setTagList] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const newTimesRes = await NewTimesSVC.Newest();
            const mainNewItem = newTimesRes[0];
            setMainNewItem(mainNewItem);

            const restOfNewTimesRes = newTimesRes.slice(1);
            const theGuardianRes = await TheGuardianSVC.Newest();
            const newsList = restOfNewTimesRes.concat(theGuardianRes);
            setNewsList(newsList);

            const newTimesRelevantsRes = await NewTimesSVC.Relevants();
            const theGuardianRelevantsRes = await TheGuardianSVC.Relevants();
            const relevantNewsList = newTimesRelevantsRes.concat(theGuardianRelevantsRes);
            setRelevantNewsList(relevantNewsList);

            setTagList([])
            const uniqueTags = new Set();
            newsList.forEach(element => {
                uniqueTags.add(element.pubTag);
            });
            relevantNewsList.forEach(element => {
                uniqueTags.add(element.pubTag);
            });
            const newTags = TagList.concat(Array.from(uniqueTags));
            setTagList(newTags.sort());

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const SearchDataByTag = async (TagName) => {
        try {
            const newTimesRes = await NewTimesSVC.ByTagOrDate(TagName, null, null);
            const theNewsAPIRes = await NewsAPISVC.Search(TagName, null, null);


            if (newTimesRes.lenght > 0) {
                const mainNewItem = newTimesRes[0];
                setMainNewItem(mainNewItem);
                const restOfNewTimesRes = newTimesRes.slice(1);
                const newsList = restOfNewTimesRes.concat(theNewsAPIRes);
                setNewsList(newsList);

                setTagList([])
                const uniqueTags = new Set();
                newsList.forEach(element => {
                    uniqueTags.add(element.pubTag);
                });
                const newTags = TagList.concat(Array.from(uniqueTags));
                setTagList(newTags.sort());

            } else {
                const mainNewItem = theNewsAPIRes[0];
                setMainNewItem(mainNewItem);
                const restOfNewTimesRes = theNewsAPIRes.slice(1);
                setNewsList(restOfNewTimesRes);
                setTagList([])
                const uniqueTags = new Set();
                restOfNewTimesRes.forEach(element => {
                    uniqueTags.add(element.pubTag);
                });
                const newTags = TagList.concat(Array.from(uniqueTags));
                setTagList(newTags.sort());
            }


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const SearchByTag = (data) => {
        console.log(data);
        SearchDataByTag(data);
    }

    return (
        <div className='container'>
            <hr className='mt-0' />
            <h1 className='text-center text-font-base text-uppercase mainTitle'>
                Hello World News
            </h1>
            <p className='text-center fst-italic'>
                <i className="fa-solid fa-caret-right me-3"></i>
                Newspaper / Magazine
                <i className="fa-solid fa-caret-left ms-3"></i>
            </p>
            <hr />
            <div className='row m-0 p-0'>
                <div className='col-md-8 main-news'>
                    <MainNew NewData={MainNewItem} />
                    <hr />
                    <div>
                        <h3 className='text-center fst-italic text-uppercase'>
                            <i className="fa-solid fa-caret-right me-3"></i>
                            Recent News
                            <i className="fa-solid fa-caret-left ms-3"></i>
                        </h3>
                        <List
                            dataSource={NewsList}
                            renderItem={(item, i) => (
                                <List.Item key={i}
                                    extra={
                                        <div className='img-bg-container-small' style={{ backgroundImage: `url(${item.pubImg})` }}>
                                        </div>
                                    }
                                >
                                    <List.Item.Meta
                                        title={
                                            <div className='m-0 p-0'>
                                                <Tag className='me-2' color={"processing"}>{item.pubTag}</Tag>
                                                <a href={item.pubURL} target='_blank' rel="noreferrer" className='text-decoration-none text-primary-emphasis'>
                                                    <h5 className='m-0 p-0'>
                                                        {item.pubTitle}
                                                    </h5>
                                                </a>
                                            </div>
                                        }
                                        description={
                                            <div className='row m-0 p-0'>
                                                <div className='col-sm-7 ps-0'>
                                                    {item.pubAuthor}
                                                </div>
                                                <div className='col-sm-5'>
                                                    <p className='float-end m-0 p-0'>
                                                        {moment(item.pubDate).format("DD MMM, YYYY")}
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='secondary-news'>
                        <h5 className='text-center fst-italic text-uppercase'>
                            <i className="fa-solid fa-caret-right me-3"></i>
                            Popular News
                            <i className="fa-solid fa-caret-left ms-3"></i>
                        </h5>
                        <List
                            dataSource={RelevantNewsList}
                            renderItem={(item, i) => (
                                <List.Item key={i}>
                                    <List.Item.Meta
                                        // avatar={<Avatar src={item.picture.large} />}
                                        title={
                                            <div>
                                                <Tag className='m-0' color={"processing"}>{item.pubTag}</Tag>
                                                <br />
                                                <a href={item.pubURL} target='_blank' rel="noreferrer" className='text-decoration-none text-primary-emphasis'>{item.pubTitle}</a>

                                            </div>
                                        }
                                        description={
                                            <div>
                                                <p className='m-0 p-0'>
                                                    {moment(item.pubDate).format("DD MMM, YYYY")}
                                                </p>

                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                    <hr />
                    <div>
                        <h5 className='text-center fst-italic text-uppercase'>
                            <i className="fa-solid fa-caret-right me-3"></i>
                            Tags
                            <i className="fa-solid fa-caret-left ms-3"></i>
                        </h5>
                        {
                            TagList.map((item, i) => (
                                <Button key={i}
                                    type="dashed"
                                    className='m-1'
                                    onClick={() => SearchByTag(item)}
                                >
                                    {item}
                                </Button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
