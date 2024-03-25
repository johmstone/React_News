import React, { useState } from 'react'
import PropType from "prop-types"
import { useForm, Controller } from "react-hook-form"
import { FloatButton, Tooltip, Modal, DatePicker, Input, Form } from 'antd'
import moment from "moment";

export const SearchButton = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const { RangePicker } = DatePicker;

    const { handleSubmit, control, reset } = useForm({
        mode: 'onChange',
        criteriaMode: 'all'
    });

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = event => {
        setIsModalVisible(false);
        cleanFields();
    }

    const cleanFields = () => {
        reset({
            SearchText: null,
            RangeDate: null
        })
    }

    const onSubmit = data => {
        console.log(data)
        let model = {
            SearchText: data.SearchText,
            StartDate: data.RangeDate != null ? moment(data.RangeDate[0].$d) : null,
            EndDate: data.RangeDate != null ? moment(data.RangeDate[1].$d) : null
        }
        props.CallBackFunction(model)
        handleCancel()
    }

    const ContentModal = () => {
        return (
            <Form onFinish={handleSubmit(onSubmit)} className="py-1" layout={"vertical"}>
                <div className='mx-1 text-primary-emphasis'>
                    <h5 className='m-0'><i className="fa-brands fa-searchengin me-1 align-middle"></i> Search News</h5>
                </div>
                <hr className='mx-1 mt-1 mb-3' />
                <div className="row m-0 p-0">
                    <Controller
                        name="SearchText"
                        control={control}
                        defaultValue={null}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Form.Item id="SearchText" label="By Keyword" className='px-0 mb-3'>
                                <Input
                                    size='large'
                                    variant='outlined'
                                    value={value}
                                    onChange={onChange}
                                    allowClear
                                />
                            </Form.Item>
                        )}
                    />
                </div>
                <div className="row m-0 p-0">
                    <Controller name="RangeDate"
                        control={control}
                        defaultValue={null}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Form.Item id="RangeDate" label="By Range Date" className='px-0 mb-3'>
                                <RangePicker
                                    value={value}
                                    className='w-100'
                                    onChange={onChange}
                                    size='large'
                                    variant={"outlined"}
                                />
                            </Form.Item>

                        )}
                    />
                </div>
                <div className="text-center px-0 mt-2">
                    <button className="btn btn-outline-primary text-uppercase mx-0 px-5" type="submit">
                        Search
                    </button>
                </div>
            </Form>
        )
    }

    return (
        <>
            <Tooltip title="Search" color="blue" placement={"leftTop"}>
                <FloatButton type='primary' onClick={showModal} icon={<i className="fa-brands fa-searchengin" />} style={{ bottom: "4rem"}}/>
            </Tooltip>
            <Modal className="mw-90"
                title={false}
                open={isModalVisible}
                centered
                onCancel={handleCancel}
                closeIcon={false}
                footer={false}>
                <ContentModal />
            </Modal>
        </>
    )
}

SearchButton.propTypes = {
    CallBackFunction: PropType.func
}