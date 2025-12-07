#!/usr/bin/env node

/**
 * Deployment script for cPay Frontend
 * This script builds the project and deploys to a static hosting service.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment of cPay Frontend...');

// Build the project
console.log('📦 Building project...');
try {
  execSync('pnpm build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Check if dist folder exists
const distPath = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ Dist folder not found after build');
  process.exit(1);
}

console.log('📁 Build output ready in dist/');

// Deployment instructions
console.log('\n📋 Deployment Instructions:');
console.log('1. For Vercel: Run `vercel --prod`');
console.log('2. For Netlify: Run `netlify deploy --prod --dir=dist`');
console.log('3. For GitHub Pages: Push dist/ to gh-pages branch');
console.log('4. For manual: Upload dist/ contents to your hosting provider');

console.log('\n🎉 Ready for deployment!');