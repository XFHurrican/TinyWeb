from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

# 用户相关模式
class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: Optional[EmailStr] = None
    nickname: Optional[str] = Field(None, max_length=50)

class UserCreate(UserBase):
    password: str = Field(..., min_length=6, max_length=100)

class UserUpdate(UserBase):
    password: Optional[str] = Field(None, min_length=6, max_length=100)
    avatar: Optional[str] = None

class User(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# 书籍相关模式
class BookBase(BaseModel):
    title: str = Field(..., max_length=100)
    author: str = Field(..., max_length=50)
    publisher: Optional[str] = Field(None, max_length=100)
    publish_date: Optional[datetime] = None
    isbn: Optional[str] = Field(None, max_length=20)
    cover_image: Optional[str] = None
    description: Optional[str] = None
    category_id: Optional[int] = None

class BookCreate(BookBase):
    pass

class BookUpdate(BookBase):
    pass

class Book(BookBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# 书籍分类相关模式
class CategoryBase(BaseModel):
    name: str = Field(..., max_length=50)
    description: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    class Config:
        orm_mode = True