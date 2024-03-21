/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { List, Button, Tag } from 'antd'
import moment from 'moment'

import { MainNew } from './mainNew'

import NewTimesAPIServices from '../services/newTimesAPI'
import TheGuardianAPIServices from '../services/theGuardianAPI'

export const Home = () => {

    const NewTimesSVC = new NewTimesAPIServices();
    const TheGuardianSVC = new TheGuardianAPIServices();
    const UniqueTags = new Set();

    const [MainNewItem, setMainNewItem] = useState({})
    const [NewsList, setNewsList] = useState([])
    const [TagList, setTagList] = useState([]);

    useEffect(() => {
        NewTimesSVC.Newest().then(res => {
            // console.log(res);
            setMainNewItem(res[0])
            UniqueTags.clear();
            return res.slice(1);
        }).then((data) => {
            TheGuardianSVC.Newest().then(res => {
                // console.log(res);
                let newNews = data.concat(res)
                setNewsList(newNews);
                return newNews
            }).then((data) => {
                console.log(data);
                data.forEach(element => {
                    UniqueTags.add(element.pubTag)
                });
                let newtags = TagList.concat(Array.from(UniqueTags))
                setTagList(newtags)
            });
        });

    }, [])

    const SearchByTag = (data) => {
        console.log(data);
        NewTimesSVC.ByTag(data).then(res => {
            console.log(res);
        })
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
                            dataSource={NewsList.filter(x => x.pubSourceCall === "NewTimes")}
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
                <div className='col-md-4 secondary-news'>
                    <div>
                        <h5 className='text-center fst-italic text-uppercase'>
                            <i className="fa-solid fa-caret-right me-3"></i>
                            Popular News
                            <i className="fa-solid fa-caret-left ms-3"></i>
                        </h5>
                        <List
                            dataSource={NewsList.filter(x => x.pubSourceCall === "TheGuardian")}
                            renderItem={(item, i) => (
                                <List.Item key={i}>
                                    <List.Item.Meta
                                        // avatar={<Avatar src={item.picture.large} />}
                                        title={
                                            <a href={item.pubURL} target='_blank' rel="noreferrer" className='text-decoration-none'>{item.pubTitle}</a>
                                        }
                                        description={
                                            <div>
                                                <p className='m-0 p-0'>
                                                    {moment(item.pubDate).format("DD MMM, YYYY")}
                                                    <Tag className='ms-2 float-end' color={"processing"}>{item.pubTag}</Tag>
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
