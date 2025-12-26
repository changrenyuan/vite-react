import { Post, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: '时尚达人',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    bio: '分享穿搭灵感和生活方式',
    followers: 12500,
    following: 345,
    posts: 128
  },
  {
    id: '2',
    username: '美食博主',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: '用美食记录生活的美好',
    followers: 8900,
    following: 230,
    posts: 89
  },
  {
    id: '3',
    username: '旅行摄影师',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    bio: '探索世界的每一个角落',
    followers: 15600,
    following: 450,
    posts: 203
  },
  {
    id: '4',
    username: '健身达人',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&crop=face',
    bio: '自律让我更自由',
    followers: 9800,
    following: 189,
    posts: 156
  },
  {
    id: '5',
    username: '美妆博主',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: '分享美妆技巧和产品推荐',
    followers: 11200,
    following: 278,
    posts: 142
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    user: mockUsers[0],
    content: '今日份穿搭分享～这件毛衣真的超级舒服，颜色也很适合秋冬季节！搭配牛仔裤和短靴，简单又时尚 #穿搭 #秋冬穿搭 #ootd',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop'
    ],
    tags: ['穿搭', '秋冬穿搭', 'ootd'],
    likes: 1234,
    comments: 89,
    timestamp: new Date('2024-01-15T10:30:00'),
    liked: false,
    saved: false
  },
  {
    id: '2',
    user: mockUsers[1],
    content: '自制的提拉米苏，第一次尝试居然成功了！配方超级简单，口感丰富，咖啡味浓郁～ #美食 #烘焙 #提拉米苏',
    images: [
      'https://images.unsplash.com/photo-1511188219899-d3e1877f5161?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=500&fit=crop'
    ],
    tags: ['美食', '烘焙', '提拉米苏'],
    likes: 2341,
    comments: 156,
    timestamp: new Date('2024-01-15T08:15:00'),
    liked: true,
    saved: true
  },
  {
    id: '3',
    user: mockUsers[2],
    content: '丽江古城的早晨，阳光洒在青石板路上，一切都那么宁静美好。旅行的意义就是遇见不同的风景和自己 #旅行 #丽江 #风景',
    images: [
      'https://images.unsplash.com/photo-1596231938696-c9d0683ac852?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596232287933-81358863d9ca?w=400&h=600&fit=crop'
    ],
    tags: ['旅行', '丽江', '风景'],
    likes: 3456,
    comments: 203,
    timestamp: new Date('2024-01-14T16:45:00'),
    liked: false,
    saved: true
  },
  {
    id: '4',
    user: mockUsers[3],
    content: '今天的训练完成！坚持健身三个月，体能明显提升。运动真的会让人变得更自信 #健身 #运动 #自律',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=500&fit=crop'
    ],
    tags: ['健身', '运动', '自律'],
    likes: 1890,
    comments: 124,
    timestamp: new Date('2024-01-15T18:20:00'),
    liked: true,
    saved: false
  },
  {
    id: '5',
    user: mockUsers[4],
    content: '分享一个超好用的底妆教程！这款粉底液持久度真的惊艳，一天都不脱妆，而且很滋润 #美妆 #底妆 #教程',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1599733589046-8ed6ee2b0736?w=400&h=500&fit=crop'
    ],
    tags: ['美妆', '底妆', '教程'],
    likes: 2678,
    comments: 178,
    timestamp: new Date('2024-01-15T12:10:00'),
    liked: false,
    saved: false
  },
  {
    id: '6',
    user: mockUsers[0],
    content: '周末探店这家咖啡馆，环境超级棒！咖啡也很好喝，拍照很出片 #咖啡 #探店 #周末',
    images: [
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=500&fit=crop'
    ],
    tags: ['咖啡', '探店', '周末'],
    likes: 1567,
    comments: 92,
    timestamp: new Date('2024-01-14T14:30:00'),
    liked: true,
    saved: true
  }
];

export const mockAuthUser: any = {
  id: 'current-user',
  username: '我的小红书',
  email: 'user@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  token: 'mock-jwt-token'
};