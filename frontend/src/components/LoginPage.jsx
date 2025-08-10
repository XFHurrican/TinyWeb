import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// 手动序列化表单数据
const serializeFormData = (data) => {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
};

const LoginContainer = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 5rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f7fa;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333333;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: -1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #666666;

  a {
    color: #3498db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 调用后端API进行登录验证，使用表单格式
      const response = await axios.post(
        'http://localhost:8000/api/login/',
        serializeFormData({ username, password }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.status === 200) {
        // 登录成功，存储token并跳转到书籍列表页
        localStorage.setItem('token', response.data.token);
        navigate('/books');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('用户名或密码不正确');
      }
      console.error('Login error:', err);
    }
  };

  return (
    <LoginContainer>
      <Title>登录</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">用户名</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">密码</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>

        <Button type="submit">登录</Button>
      </Form>

      <RegisterLink>
        还没有账号？<Link to="/register">立即注册</Link>
      </RegisterLink>
    </LoginContainer>
  );
};

export default LoginPage;