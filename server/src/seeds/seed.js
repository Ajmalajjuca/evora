const mongoose = require('mongoose');
const dotenv = require('dotenv');
import { connectDB } from '../config/database';
import User from '../models/User';
import Post from '../models/Post';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Post.deleteMany({});
    
    console.log('👤 Creating users...');
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
      },
      {
        name: 'Test User',
        email: 'user@example.com',
        password: 'password123',
        role: 'user'
      }
    ]);
    
    console.log('📝 Creating posts...');
    await Post.create([
      {
        title: 'First Post',
        content: 'This is the first post',
        author: users[0]._id,
        published: true,
        tags: ['introduction', 'welcome']
      },
      {
        title: 'Second Post',
        content: 'This is the second post',
        author: users[1]._id,
        published: false,
        tags: ['draft']
      }
    ]);
    
    console.log('✅ Seed data created successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
