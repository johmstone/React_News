import React from 'react'
import PropType from 'prop-types'
import { Card, Tag } from 'antd'
import moment from 'moment'
export const MainNew = (props) => {

    const { Meta } = Card;

    return (
        <a href={props.NewData.pubURL}
            target='_blank' rel="noreferrer"
            className='text-decoration-none'
            title={props.NewData.pubTitle}>
            <Card
                hoverable
                cover={
                    <div className='img-bg-container' style={{ backgroundImage: `url(${props.NewData.pubImg})` }}>
                    </div>
                }
            >
                <Meta
                    title={
                        <div>
                            <Tag className='m-0' color={"processing"}>{props.NewData.pubTag}</Tag>
                            <br/>
                            {props.NewData.pubTitle}                            
                        </div>
                    }
                    description={
                        <div>
                            <p className='p-0'>
                                {props.NewData.pubAbstract}
                            </p>
                            <p className='m-0 p-0 float-end text-primary-emphasis'>
                                {props.NewData.pubAuthor}
                            </p>
                            <br />
                            <p className='m-0 p-0 float-end'>
                                {moment(props.NewData.pubDate).format("DD MMM, YYYY")}
                            </p>
                        </div>
                    }
                />
            </Card>
        </a>
    )
}

MainNew.propTypes = {
    NewData: PropType.object
}
