import React, { useState, useEffect } from 'react'
import { MainNew } from './mainNew'

import NewTimesAPIServices from '../services/newTimesAPI'
import TheGuardianAPIServices from '../services/theGuardianAPI'

export const Home = () => {

    const NewTimesSVC = new NewTimesAPIServices();
    const TheGuardianSVC = new TheGuardianAPIServices();

    const [MainNewItem, setMainNewItem] = useState({})
    const [NewTimesList, setNewTimesList] = useState([])
    const [TheGuardianList, setTheGuardianList] = useState([])

    useEffect(() => {
        NewTimesSVC.Newest().then(res => {
            console.log(res);
            setNewTimesList(res);
            setMainNewItem(res[0])
        });
        TheGuardianSVC.Newest().then(res => {
            console.log(res);
            setTheGuardianList(res)
        })
    }, [])

    return (
        <div className='container'>
            <hr className='mt-0' />
            <h1 className='text-center text-font-base text-uppercase'>
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
                </div>
                <div className='col-md-4 secondary-news'>
                    dfsf
                </div>
            </div>
        </div>
    )
}
