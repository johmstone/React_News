import React from 'react'
import moment from 'moment'

export const MainHeader = () => {

    const CurrentDate = new Date()

    return (
        <nav className="navbar bg-body-tertiary hide-on-print">
            <div className="container">
                <a className="mx-2 text-decoration-none text-primary-emphasis" href='/'>
                    {moment(CurrentDate).format("dddd, DD MMMM YYYY")}
                </a>
                <div>
                    <a className='mx-2 text-decoration-none text-primary-emphasis' href='https://www.facebook.com/' title='Facebook'>
                        <i className="fa-brands fa-facebook"></i>
                    </a>
                    <a className='mx-2 text-decoration-none text-primary-emphasis' href='https://twitter.com/' title='X'>
                        <i className="fa-brands fa-x-twitter"></i>
                    </a>
                    <a className='mx-2 text-decoration-none text-primary-emphasis' href='https://www.instagram.com/' title='Instagram'>
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                </div>
            </div>
        </nav>
    )
}
