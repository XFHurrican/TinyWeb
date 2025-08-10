import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const RegisterContainer = styled.div`
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
    border-color: #2ecc71;
  }
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #27ae60;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: -1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  color: #2ecc71;
  margin-top: -1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const LoginLink = styled.div`
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

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 表单验证
    if (username.length < 3) {
      setError('用户名长度不能少于3位');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (password.length < 6) {
      setError('密码长度不能少于6位');
      return;
    }

    try {
      // 调用后端API进行注册
      const response = await axios.post('http://localhost:8000/api/users/', {
        username,
        password,
      });

      if (response.status === 201) {
        setSuccess('注册成功，请登录');
        // 3秒后跳转到登录页面
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('注册失败，请稍后再试');
      }
      console.error('Register error:', err);
    }
  };

  return (
    <RegisterContainer>
      <Title>注册</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
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

        <FormGroup>
          <Label htmlFor="confirmPassword">确认密码</Label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </FormGroup>

        <Button type="submit">注册</Button>
      </Form>

      <LoginLink>
        已有账号？<Link to="/login">立即登录</Link>
      </LoginLink>
    </RegisterContainer>
  );
};

export default RegisterPage;