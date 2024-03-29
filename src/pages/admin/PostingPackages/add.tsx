import { Link, useNavigate } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from 'antd';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAddTypeJobPostMutation } from "../../../api/admin/postingPackage";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddPostingPackages = () => {
    const [addSalary, { isLoading }] = useAddTypeJobPostMutation();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        addSalary(values)
            .unwrap()
            .then(() => {
                message.success(`Thêm thành công`);
                navigate("/admin/posting-packages");
            });
        console.log("request", values)
    };

    return (
        <div>
            <Link to="/admin/posting-packages">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Thêm gói đăng bài</h2>
            <Form className="mx-40"
                name="basic"
                form={form}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 400 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                labelWrap={true}
                autoComplete="off"
            >
                <Form.Item
                    label="Tên gói đăng"
                    name="name"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Giá"
                    name="salary"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { pattern: /^[1-9]\d*$/, message: 'Lương phải là số và không âm !' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="desc"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                    ]}
                    className="w-[800px]"
                >
                    <CKEditor
                        editor={ClassicEditor}
                        onChange={(_event: any, editor: any) => {
                            const data = editor.getData();
                            form.setFieldsValue({
                                desc: data
                            });
                        }}
                    />
                </Form.Item>
                <Form.Item labelAlign="left">
                    <Button type="primary" htmlType="submit" className="bg-blue-500">
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Thêm"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default AddPostingPackages