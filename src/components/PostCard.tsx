import React, { useState } from 'react';
import { Heart, MessageSquare, Bookmark, Share2, MoreHorizontal, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onSave?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onSave }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    onLike?.(post.id);
  };

  const handleSave = () => {
    onSave?.(post.id);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      console.log('Comment:', commentText);
      setCommentText('');
      // Here you would typically call an API to post the comment
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return '刚刚';
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return new Date(date).toLocaleDateString('zh-CN');
  };

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden animate-fade-in">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <Link to={`/user/${post.user.id}`} className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={post.user.avatar}
              alt={post.user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-gray-900">{post.user.username}</p>
            <p className="text-xs text-gray-500">{formatTime(post.timestamp)}</p>
          </div>
        </Link>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-2">
        <p className="text-gray-800 mb-3 leading-relaxed">{post.content}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag, index) => (
            <Link key={index} to={`/search?q=${encodeURIComponent(tag)}`} className="text-primary text-sm">
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Post Images */}
      {post.images.length > 0 && (
        <div className={`relative ${post.images.length > 1 ? 'grid grid-cols-2 gap-1' : ''}`}>
          {post.images.map((image, index) => (
            <div key={index} className="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <img
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {post.images.length > 1 && index === post.images.length - 1 && post.images.length > 2 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-xl">
                  +{post.images.length - 2}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 ${post.liked ? 'text-primary' : 'text-gray-600'}`}
          >
            <Heart className={`w-5 h-5 ${post.liked ? 'fill-primary' : ''}`} />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-600"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
          <button className="text-gray-600">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={handleSave}
          className={`${post.saved ? 'text-primary' : 'text-gray-600'}`}
        >
          <Bookmark className={`w-5 h-5 ${post.saved ? 'fill-primary' : ''}`} />
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 animate-slide-up">
          <div className="max-h-40 overflow-y-auto mb-3">
            {/* Sample comments - in a real app, these would come from the API */}
            <div className="flex items-start space-x-2 mb-3">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-lg p-2 flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">旅行爱好者</p>
                <p className="text-sm text-gray-700">太美了！请问这是在哪里拍的？</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={post.user.avatar}
                  alt={post.user.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-lg p-2 flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">{post.user.username}</p>
                <p className="text-sm text-gray-700">谢谢喜欢！这是在丽江古城拍的～</p>
              </div>
            </div>
          </div>
          
          {/* Comment Form */}
          <form onSubmit={handleComment} className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
                alt="Current user"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="text"
              placeholder="添加评论..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
              disabled={!commentText.trim()}
            >
              发送
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostCard;