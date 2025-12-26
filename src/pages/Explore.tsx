import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import { Post } from '../types';
import { mockPosts } from '../utils/mockData';

const Explore: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  const categories = ['全部', '穿搭', '美食', '旅行', '健身', '美妆', '生活方式'];

  useEffect(() => {
    // Simulate API call with category filter
    const fetchExplorePosts = async () => {
      try {
        // In a real app, you would call an API with category filter
        let filteredPosts = mockPosts;
        if (selectedCategory !== '全部') {
          filteredPosts = mockPosts.filter(post => 
            post.tags.includes(selectedCategory)
          );
        }
        setPosts(filteredPosts);
      } catch (error) {
        console.error('Error fetching explore posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExplorePosts();
  }, [selectedCategory]);

  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes: post.liked ? post.likes - 1 : post.likes + 1,
              liked: !post.liked 
            } 
          : post
      )
    );
  };

  const handleSave = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, saved: !post.saved } 
          : post
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header activeTab="explore" />
        <div className="pt-20 pb-16 container mx-auto px-4">
          <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <div key={category} className="h-10 bg-gray-200 rounded-full px-4 flex items-center justify-center min-w-max"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-card overflow-hidden animate-pulse">
                <div className="h-20 bg-gray-200"></div>
                <div className="h-64 bg-gray-100"></div>
                <div className="h-16 bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab="explore" />
      <main className="pt-20 pb-16 container mx-auto px-4">
        {/* Category Filter */}
        <div className="flex space-x-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onSave={handleSave}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">暂无相关内容</p>
              <p className="text-gray-400 text-sm mt-2">试试其他分类吧</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Explore;