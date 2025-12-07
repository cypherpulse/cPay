#!/usr/bin/env node

/**
 * Setup script for cPay Frontend development environment
 * This script installs dependencies and sets up the project.
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔧 Setting up cPay Frontend development environment...');

// Check if pnpm is installed
try {
  execSync('pnpm --version', { stdio: 'pipe' });
  console.log('✅ pnpm is installed');
} catch (error) {
  console.error('❌ pnpm is not installed. Please install pnpm first: https://pnpm.io/installation');
  process.exit(1);
}

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('pnpm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Check if .env exists, if not create template
const envPath = '.env';
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env template...');
  const envTemplate = `# Environment Variables for cPay Frontend
# Copy this file to .env and fill in your values

# Reown AppKit Project ID (get from https://cloud.reown.com/)
VITE_REOWN_PROJECT_ID=your_project_id_here

# Celo RPC URLs (optional, defaults provided)
VITE_CELO_MAINNET_RPC=https://forno.celo.org
VITE_CELO_ALFAJORES_RPC=https://alfajores-forno.celo-testnet.org

# Contract Addresses (update for production)
VITE_MERCHANT_REGISTRY_ADDRESS=0x0000000000000000000000000000000000000000
VITE_CPAY_PAYMENTS_ADDRESS=0x0000000000000000000000000000000000000000
`;
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ .env template created. Please fill in your values.');
}

// Run type check
console.log('🔍 Running TypeScript check...');
try {
  execSync('pnpm check', { stdio: 'inherit' });
  console.log('✅ TypeScript check passed');
} catch (error) {
  console.warn('⚠️  TypeScript check failed. You may need to fix type errors.');
}

// Final instructions
console.log('\n🎉 Setup complete!');
console.log('Run `pnpm dev` to start the development server.');
console.log('Make sure to configure your .env file with the correct values.');