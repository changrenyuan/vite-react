import React, { useState } from 'react';
import { X, Image as ImageIcon, Smile, MapPin, Hash, Send } from 'lucide-react';
import Header from '../components/Header';

const Create: React.FC = () => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const uploadedImages = files.slice(0, 9).map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...uploadedImages].slice(0, 9));
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 10) {
      setTags(prev => [...prev, trimmedTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() && images.length === 0) {
      alert('请输入内容或上传图片');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real app, you would upload images first, then create the post
      console.log('Creating post:', { content, images, tags, location });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      setContent('');
      setImages([]);
      setTags([]);
      setLocation('');
      
      // Show success message
      alert('发布成功！');
      
      // Navigate back to home
      window.location.href = '/';
    } catch (error) {
      console.error('Error creating post:', error);
      alert('发布失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab="create" />
      <main className="pt-20 pb-16 container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-card p-6">
          {/* Form Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-900">发布笔记</h1>
            <button
              onClick={() => window.location.href = '/'}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
                alt="Current user"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-900">我的小红书</p>
              <p className="text-xs text-gray-500">公开 · 谁可以看</p>
            </div>
          </div>

          {/* Content Input */}
          <div className="mb-6">
            <textarea
              placeholder="分享你的生活..."
              className="w-full border-none outline-none resize-none text-gray-800 text-lg min-h-[120px] placeholder-gray-400"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-3">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={image}
                    alt={`Uploaded image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {images.length < 9 && (
                <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500">{images.length}/9</span>
                </label>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <Hash className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                      <span>#{tag}</span>
                      <button onClick={() => removeTag(tag)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="添加话题标签"
                    className="flex-1 border-none outline-none text-gray-800 placeholder-gray-400"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  {tagInput.trim() && (
                    <button onClick={addTag} className="text-primary text-sm font-medium">
                      添加
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="添加位置"
                className="flex-1 border-none outline-none text-gray-800 placeholder-gray-400"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-600">
                <Smile className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || (!content.trim() && images.length === 0)}
              className={`bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors ${
                (!content.trim() && images.length === 0) || isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
              }`}
            >
              {isSubmitting ? '发布中...' : '发布'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;