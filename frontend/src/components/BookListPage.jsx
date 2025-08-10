import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const BookListContainer = styled.div`
  width: 100%;
  padding: 2rem;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  color: #ffffff;
`;

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const BookCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BookImage = styled.div`
  height: 200px;
  background-color: #2d2d2d;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaaaaa;
`;

const BookInfo = styled.div`
  padding: 1rem;
`;

const BookTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

const BookAuthor = styled.p`
  font-size: 0.9rem;
  color: #aaaaaa;
  margin-bottom: 0.5rem;
`;

const BookCategory = styled.span`
  display: inline-block;
  background-color: #e1f5fe;
  color: #0288d1;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

const ViewDetailsButton = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 检查用户是否已登录
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // 获取书籍列表
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/books/');
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError('获取书籍列表失败');
        setLoading(false);
        console.error('Fetch books error:', err);
      }
    };

    fetchBooks();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>错误: {error}</div>;
  }

  return (
    <BookListContainer>
      <LogoutButton onClick={handleLogout}>退出登录</LogoutButton>
      <Title>书籍列表</Title>
      <BookGrid>
        {books.map((book) => (
          <BookCard key={book.id}>
            <BookImage>书籍封面</BookImage>
            <BookInfo>
              <BookTitle>{book.title}</BookTitle>
              <BookAuthor>作者: {book.author}</BookAuthor>
              <BookCategory>{book.category.name}</BookCategory>
              <ViewDetailsButton to={`/books/${book.id}`}>
                查看详情
              </ViewDetailsButton>
            </BookInfo>
          </BookCard>
        ))}
      </BookGrid>
    </BookListContainer>
  );
};

export default BookListPage;