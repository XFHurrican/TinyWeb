import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const BookDetailContainer = styled.div`
  width: 100%;
  padding: 2rem;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1rem;
  color: #3498db;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const BookInfoSection = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BookImage = styled.div`
  width: 300px;
  height: 400px;
  background-color: #2d2d2d;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaaaaa;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const BookDetails = styled.div`
  flex: 1;
`;

const BookTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const BookAuthor = styled.p`
  font-size: 1.2rem;
  color: #aaaaaa;
  margin-bottom: 1rem;
`;

const BookCategory = styled.span`
  display: inline-block;
  background-color: #1e3a5f;
  color: #3498db;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

const BookDescription = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  color: #e0e0e0;
  margin-bottom: 2rem;
`;

const ReviewsSection = styled.section`
  margin-top: 3rem;
`;

const ReviewsTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ReviewCard = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background-color: #1e1e1e;
`;

const ReviewUser = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

const ReviewContent = styled.div`
  color: #aaaaaa;
`;

const ReviewForm = styled.form`
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background-color: #1e1e1e;
`;

const ReviewFormTitle = styled.h3`
  margin-bottom: 1rem;
  color: #ffffff;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid #333;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  margin-bottom: 1rem;
  background-color: #2d2d2d;
  color: #ffffff;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.5rem;
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

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewContent, setReviewContent] = useState('');
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

    // 获取书籍详情
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/books/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (err) {
        setError('获取书籍详情失败');
        setLoading(false);
        console.error('Fetch book details error:', err);
      }
    };

    // 获取评论列表
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/books/${id}/reviews`);
        setReviews(response.data);
      } catch (err) {
        console.error('Fetch reviews error:', err);
      }
    };

    fetchBookDetails();
    fetchReviews();
  }, [id, navigate]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewContent.trim()) {
      alert('评论内容不能为空');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/books/${id}/reviews`, {
        content: reviewContent,
      });

      // 添加新评论到评论列表
      setReviews([...reviews, response.data]);
      // 清空评论输入框
      setReviewContent('');
    } catch (err) {
      alert('提交评论失败，请稍后再试');
      console.error('Submit review error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error || !book) {
    return <div>错误: {error || '未找到该书籍'}</div>;
  }

  return (
    <BookDetailContainer>
      <LogoutButton onClick={handleLogout}>退出登录</LogoutButton>
      <BackLink to="/books">返回书籍列表</BackLink>

      <BookInfoSection>
        <BookImage>书籍封面</BookImage>
        <BookDetails>
          <BookTitle>{book.title}</BookTitle>
          <BookAuthor>作者: {book.author}</BookAuthor>
          <BookCategory>{book.category.name}</BookCategory>
          <BookDescription>{book.description}</BookDescription>
        </BookDetails>
      </BookInfoSection>

      <ReviewsSection>
        <ReviewsTitle>评论 ({reviews.length})</ReviewsTitle>
        <ReviewList>
          {reviews.map((review) => (
            <ReviewCard key={review.id}>
              <ReviewUser>{review.user.username}</ReviewUser>
              <ReviewContent>{review.content}</ReviewContent>
            </ReviewCard>
          ))}
        </ReviewList>

        <ReviewForm onSubmit={handleReviewSubmit}>
          <ReviewFormTitle>发表评论</ReviewFormTitle>
          <TextArea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="分享你的阅读心得..."
            required
          />
          <SubmitButton type="submit">提交评论</SubmitButton>
        </ReviewForm>
      </ReviewsSection>
    </BookDetailContainer>
  );
};

export default BookDetailPage;