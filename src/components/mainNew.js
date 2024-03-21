import React from 'react'
import PropType from 'prop-types'
import { Card } from 'antd'

export const MainNew = (props) => {

    const { Meta } = Card;

    return (
        <a href={props.NewData.pubURL}
            target='_blank' rel="noreferrer"
            className='text-decoration-none'
            title={props.NewData.pubTitle}>
            <Card
                hoverable
                cover={<img alt="example" src={props.NewData.pubImg} />}
            >
                <Meta
                    title={props.NewData.pubTitle}
                    description={
                        <div>
                            <p className='p-0'>
                                {props.NewData.pubAbstract}
                            </p>
                            <p className='m-0 p-0 float-end text-primary-emphasis'>
                                {props.NewData.pubAuthor}
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
