import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, Field } from '@formily/react'
import {
    FormItem,
    FormLayout,
    Input,
    FormButtonGroup,
    Submit,
    Reset
} from '@formily/antd'

const form = createForm()

export default () => {
    const handlerSubmitClick = (values) => {
        console.log('handlerSubmitClick', values);
    }

    const handlerResetClick = (e) => {
        console.log('handlerResetClick', e);
    }

    return (
        <FormProvider form={form}>
            <FormLayout layout="vertical">
                <Field
                    name="input"
                    title="输入框"
                    required
                    initialValue="Hello world"
                    decorator={[FormItem]}
                    component={[Input]}
                />
            </FormLayout>
            <FormConsumer>
                {() => (
                    <div
                        style={{
                            marginBottom: 20,
                            padding: 5,
                            border: '1px dashed #666',
                        }}
                    >
                        实时响应：{form.values.input}
                    </div>
                )}
            </FormConsumer>
            <FormButtonGroup>
                <Submit onSubmit={handlerSubmitClick}>提交</Submit>
                <Reset onClick={handlerResetClick}>Reset</Reset>
            </FormButtonGroup>
        </FormProvider>
    )
}