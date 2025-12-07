# cPay Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF.svg)](https://vitejs.dev/)
[![Celo](https://img.shields.io/badge/Celo-Network-green.svg)](https://celo.org/)
[![Reown AppKit](https://img.shields.io/badge/Reown-AppKit-FF6B35.svg)](https://docs.reown.com/appkit)

A decentralized payment application frontend built on the Celo blockchain, enabling seamless peer-to-peer transactions with a modern, responsive interface.

## Table of Contents

- [cPay Frontend](#cpay-frontend)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
    - [Core Functionality](#core-functionality)
    - [Technical Features](#technical-features)
  - [Technology Stack](#technology-stack)
  - [Architecture](#architecture)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Setup](#environment-setup)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Scripts](#scripts)
  - [Contributing](#contributing)
    - [Guidelines](#guidelines)
  - [Code of Conduct](#code-of-conduct)
  - [Security](#security)
  - [Testing](#testing)
  - [Deployment](#deployment)
    - [Static Hosting](#static-hosting)
    - [Configuration for Production](#configuration-for-production)
  - [Roadmap](#roadmap)
  - [License](#license)
  - [Support](#support)
  - [Acknowledgments](#acknowledgments)

## Overview

cPay is a decentralized payment application designed for the Celo blockchain ecosystem. It provides users with a secure, user-friendly platform to manage wallets, send and receive payments, create invoices, and interact with social transaction feeds. Built with modern web technologies, cPay emphasizes accessibility, performance, and blockchain integration.

The application currently operates in mock mode for development, simulating real blockchain interactions. It can be configured for production use with live Celo networks.

## Features

### Core Functionality
- **Wallet Integration**: Seamless connection to Celo-compatible wallets via Reown AppKit.
- **Payment Operations**:
  - Send stablecoin payments (cUSD) to addresses or users.
  - Request payments through customizable invoices.
  - Real-time balance and transaction history tracking.
- **Invoice Management**: Create, edit, and track payment requests with due dates and descriptions.
- **Social Feed**: Explore a timeline of transactions and community updates.
- **Settings & Theming**: Dark/light mode toggle and user preferences.

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS.
- **Real-time Data**: Efficient state management with TanStack Query.
- **Form Validation**: Robust input handling with React Hook Form and Zod.
- **Accessibility**: WCAG-compliant components from Radix UI.
- **Animations**: Smooth transitions with Framer Motion.

## Technology Stack

| Category | Technologies |
|----------|--------------|
| **Frontend Framework** | React 19, TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS, Radix UI |
| **State Management** | TanStack Query, React Hooks |
| **Blockchain** | Celo, Reown AppKit, Ethers.js |
| **Forms & Validation** | React Hook Form, Zod |
| **Icons & Animations** | Lucide React, Framer Motion |
| **Development** | ESLint, TypeScript, pnpm |

## Architecture

The application follows a modular, component-driven architecture:

- **Client-Side Rendering**: Optimized with Vite for fast loading.
- **Component Library**: Reusable UI in `src/components/`.
- **Custom Hooks**: Encapsulated logic in `src/hooks/`.
- **Mock Layer**: Development data in `src/mocks/`.
- **Shared Types**: Centralized schemas in `shared/`.
- **Configuration**: Environment-specific settings in `src/config/`.

## Getting Started

### Prerequisites
- **Node.js**: Version 18 or higher.
- **Package Manager**: pnpm (recommended), or npm/yarn.
- **Wallet**: Celo-compatible wallet (e.g., Valora, MetaMask).

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/cypherpulse/cPay.git
   cd cPay
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Start Development Server**:
   ```bash
   pnpm dev
   ```

4. **Access the App**:
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Setup
- Copy `.env.example` to `.env` and configure variables (if any).
- For mock mode, no additional setup is needed.
- To enable live blockchain: Update `src/config/config.ts` with real RPC URLs and contract addresses.

## Usage

1. **Connect Wallet**: Authenticate with your Celo wallet.
2. **Dashboard**: Monitor balances and recent activity.
3. **Payments**: Send funds or generate payment requests.
4. **Invoices**: Manage outgoing and incoming invoices.
5. **Feed**: View transaction feeds and social interactions.
6. **Settings**: Customize appearance and preferences.

For detailed user guides, see [docs/user-guide.md](docs/user-guide.md) (planned).

## Project Structure

```
cPay-Frontend/
├── client/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities and configurations
│   │   ├── mocks/       # Mock data for development
│   │   ├── pages/       # Page components
│   │   └── config/      # App configuration
├── shared/              # Shared types and schemas
├── dist/                # Build output (generated)
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

## Scripts

Run scripts via `pnpm <script>`:

- `dev`: Start development server.
- `build`: Build for production.
- `start`: Serve production build.
- `check`: Run TypeScript checks.
- `lint`: Lint code (if configured).
- `test`: Run tests (when implemented).

### Custom Scripts
Additional utility scripts are available in the `scripts/` folder:
- `node scripts/setup.js`: Set up the development environment and create .env template.
- `node scripts/deploy.js`: Build the project and provide deployment instructions.

## Contributing

We welcome contributions from the community! To get started:

1. **Fork the Repository**: Click "Fork" on GitHub.
2. **Create a Branch**: `git checkout -b feature/your-feature-name`.
3. **Make Changes**: Follow our coding standards.
4. **Test Locally**: Ensure builds pass and features work.
5. **Commit Changes**: Use conventional commits (e.g., `feat: add new component`).
6. **Push and PR**: Push to your fork and open a Pull Request.

### Guidelines
- **Code Style**: Use TypeScript, follow ESLint rules.
- **Commits**: Write clear, descriptive messages.
- **Issues**: Use issue templates for bugs/features.
- **Reviews**: All PRs require review before merge.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this standard.

## Security

We take security seriously. If you discover a vulnerability:

- **Do Not** create public issues.
- Email security@cpay.io with details.
- We will acknowledge within 48 hours and work on a fix.

See [SECURITY.md](SECURITY.md) for our policy.

## Testing

Testing is crucial for reliability. We use Vitest for unit tests.

- Run tests: `pnpm test`
- Coverage: `pnpm test --coverage`

Contribute tests for new features. See [TESTING.md](TESTING.md) for guidelines.

## Deployment

### Static Hosting
1. Build: `pnpm build`
2. Deploy `dist/` to services like Vercel, Netlify, or GitHub Pages.

### Configuration for Production
- Disable mock mode in `src/config/config.ts`.
- Set environment variables for RPC URLs and contract addresses.
- Enable HTTPS for secure wallet connections.
- **Reown AppKit Setup**:
  1. Create a project at [Reown Cloud](https://cloud.reown.com/).
  2. Obtain your Project ID.
  3. Add to environment: `VITE_REOWN_PROJECT_ID=your_project_id`.
  4. Configure supported chains and wallets in `src/config/config.ts`.

## Roadmap

- [ ] Backend integration for real-time data.
- [ ] Multi-chain support (Ethereum, Polygon).
- [ ] Advanced analytics dashboard.
- [ ] Mobile app (React Native).
- [ ] NFT marketplace features.
- [ ] API documentation.

Track progress in [Issues](https://github.com/cypherpulse/cPay/issues).

## License

Licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/cypherpulse/cPay/issues)
- **Discussions**: [GitHub Discussions](https://github.com/cypherpulse/cPay/discussions)
- **Email**: support@cpay.io
- **Discord**: [Join our community](https://discord.gg/cpay)

## Acknowledgments

- **Celo Foundation**: For the blockchain infrastructure.
- **Open-Source Community**: For libraries like React, Vite, and Radix UI.
- **Contributors**: Thanks to all who help build cPay.

---

Built with ❤️ for the decentralized future.