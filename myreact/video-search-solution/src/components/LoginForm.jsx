import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { authorise } from '../services/authService';
import { userLoggedIn, selectUser } from '../features/user/userSlice';
import { favouriteSearchesLoaded } from '../features/favouriteSearches/favouriteSearchSlice';
// import { toast } from 'react-toastify';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const LoginForm = (props) => {
  const dispatch = useDispatch();
  let user = useSelector(selectUser);

  const handleSubmit = async values => {
    try {
      user = await authorise(values);
      dispatch(userLoggedIn({ id: user.id, username: user.username }));
      dispatch(favouriteSearchesLoaded(user.favourites));
      // Redirect a user to the origin page
      const { state } = props.location;
      props.history.replace('/');
    }
    catch (error) {
      console.log(error.message);
      // toast.error(error.message);
    }
  };

  const handleFailedSubmit = errorInfo => {
    // toast.error(errorInfo);
    console.log('Failed submit');
    console.log(errorInfo);
  };

  // Redirect an authorised user to the default page
  if (user.id) return <Redirect to="/" />;

  return (

    <div className="form-flex-container">
      <div className="login-form">
        <i className="fas fa-bolt"></i>
        <h3>Вход</h3>
        <Form
          {...layout}
          name="basic"
          onFinish={handleSubmit}
          onFinishFailed={handleFailedSubmit}
        >
          <Form.Item
            label="Логин"
            name="username"
            rules={[{ required: true, message: 'Пожалуйста, введите ваш логин!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Войти
        </Button>
          </Form.Item>
        </Form>
      </div>
    </div >
  );
}

export default LoginForm;