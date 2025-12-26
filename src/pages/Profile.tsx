import React, { useState, useEffect } from 'react';
import { User, Settings, Heart, Bookmark, Grid, List, LogOut, X, ChevronRight, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import { Post, User as UserType } from '../types';
import { mockPosts, mockUsers, mockAuthUser } from '../utils/mockData';

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls
    const fetchProfileData = async () => {
      try {
        // Get current user data
        const currentUser = {
          ...mockAuthUser,
          followers: 1234,
          following: 567,
          posts: 45
        };
        setUser(currentUser);

        // Get user's posts
        const userPosts = mockPosts.filter(post => post.user.id === '1'); // Mock data
        setPosts(userPosts);

        // Get saved posts
        const saved = mockPosts.filter(post => post.saved);
        setSavedPosts(saved);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

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
    setSavedPosts(prevPosts => 
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
    setSavedPosts(prevPosts => {
      const post = prevPosts.find(p => p.id === postId);
      if (post) {
        return post.saved 
          ? prevPosts.filter(p => p.id !== postId)
          : [...prevPosts, { ...post, saved: true }];
      }
      return prevPosts;
    });
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, saved: !post.saved } 
          : post
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('已退出登录');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header activeTab="profile" />
        <div className="pt-20 pb-16">
          <div className="animate-pulse">
            <div className="h-40 bg-gray-200"></div>
            <div className="h-16 bg-gray-200"></div>
            <div className="grid grid-cols-3 gap-1">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="aspect-square bg-gray-100"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab="profile" />
      <main className="pt-20 pb-16">
        {/* Profile Header */}
        <div className="bg-white border-b border-gray-200 pb-6">
          <div className="container mx-auto px-4">
            {/* User Info */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
                  <img
                    src={user?.avatar}
                    alt={user?.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h1 className="text-xl font-bold text-gray-900 mb-1">{user?.username}</h1>
                  <p className="text-sm text-gray-500 mb-3">小红书官方账号</p>
                  <div className="flex items-center justify-center space-x-6">
                    <div>
                      <p className="font-bold text-gray-900">{user?.posts}</p>
                      <p className="text-xs text-gray-500">笔记</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{user?.followers}</p>
                      <p className="text-xs text-gray-500">粉丝</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{user?.following}</p>
                      <p className="text-xs text-gray-500">关注</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                编辑资料
              </button>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <p className="text-gray-800 mb-2">分享生活中的美好瞬间 ✨</p>
              <p className="text-sm text-gray-500">📍 上海</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary mb-1">4.9</p>
                <p className="text-sm text-gray-500">获赞与收藏</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary mb-1">128</p>
                <p className="text-sm text-gray-500">发布笔记</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary mb-1">3年</p>
                <p className="text-sm text-gray-500">活跃天数</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white sticky top-16 z-40 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium ${
                    activeTab === 'posts' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                  <span>笔记</span>
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium ${
                    activeTab === 'saved' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                  <span>收藏</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100' : 'text-gray-500'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100' : 'text-gray-500'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-6">
          {activeTab === 'posts' ? (
            posts.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onLike={handleLike}
                      onSave={handleSave}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-card overflow-hidden">
                      <div className="flex">
                        <div className="w-1/3 min-h-[200px]">
                          <img
                            src={post.images[0]}
                            alt={post.content.substring(0, 20)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 rounded-full overflow-hidden">
                              <img
                                src={post.user.avatar}
                                alt={post.user.username}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{post.user.username}</span>
                          </div>
                          <p className="text-gray-800 text-sm mb-3 line-clamp-3">{post.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">还没有发布任何笔记</p>
                <button 
                  onClick={() => window.location.href = '/create'}
                  className="mt-4 bg-primary text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  发布第一篇笔记
                </button>
              </div>
            )
          ) : (
            savedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onSave={handleSave}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">还没有收藏任何笔记</p>
                <p className="text-gray-400 text-sm mt-2">收藏的笔记会显示在这里</p>
              </div>
            )
          )}
        </div>

        {/* Settings Modal (hidden by default) */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden" id="settingsModal">
          <div className="bg-white rounded-lg max-w-md mx-auto mt-20">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-lg">设置</h3>
              <button onClick={() => document.getElementById('settingsModal')?.classList.add('hidden')}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                <span>账号与安全</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                <span>隐私设置</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                <span>通知设置</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded text-red-500" onClick={handleLogout}>
                <span>退出登录</span>
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;