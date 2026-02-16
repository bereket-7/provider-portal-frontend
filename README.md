# Next.js Starter Template

A production-ready Next.js 15 starter template with TypeScript, internationalization, and Docker support.

## ✨ Features

- ⚡️ **Next.js 15** - Latest version with App Router
- 🎨 **Tailwind CSS 4** - Modern utility-first CSS framework
- 📝 **TypeScript** - Type safety and better DX
- 🌍 **Internationalization** - Multi-language support with next-intl
- 🎭 **Radix UI** - Accessible component primitives
- 🔄 **Redux Toolkit** - State management
- 🔍 **React Query** - Server state management
- 🎯 **ESLint & Prettier** - Code quality and formatting
- 🐳 **Docker** - Production-ready containerization
- 🚀 **CI/CD** - Jenkins pipeline with optimized caching
- 🧪 **Testing** - Jest and Testing Library setup
- 🎨 **Husky** - Git hooks for code quality

## 🚀 Getting Started

### Local Development

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

### Docker Development

```bash
# Start development environment
make dev

# Or using docker-compose
docker-compose -f docker-compose.dev.yml up
```

### Docker Production

```bash
# Quick start
make deploy

# Or step by step
make build    # Build Docker image
make up       # Start container
make health   # Check health status
```

See [DOCKER_QUICKSTART.md](./DOCKER_QUICKSTART.md) for more Docker commands.

## 📦 Available Scripts

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn check-types` - Run TypeScript type checking
- `yarn check-format` - Check code formatting
- `yarn test-all` - Run all checks (types, format, lint, build)

## 🐳 Docker Deployment

This project includes a production-ready Docker setup with:

- **Multi-stage builds** for minimal image size (~180MB)
- **BuildKit caching** for faster builds
- **Health checks** for monitoring
- **Non-root user** for security
- **Resource limits** for stability

### Quick Deploy

```bash
# Using Make
make deploy

# Using Docker Compose
docker-compose up -d

# Check status
docker-compose ps
curl http://localhost:3000/api/health
```

### Documentation

- [📖 Full Deployment Guide](./DEPLOYMENT.md) - Comprehensive deployment documentation
- [⚡ Quick Start Guide](./DOCKER_QUICKSTART.md) - Common Docker commands
- [🔧 Jenkinsfile](./Jenkinsfile) - CI/CD pipeline configuration

## 🏗️ Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utility functions
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript types
│   └── middleware.ts     # Next.js middleware
├── public/               # Static assets
├── messages/             # i18n translations
├── Dockerfile            # Production Docker image
├── docker-compose.yml    # Docker Compose configuration
├── Jenkinsfile           # CI/CD pipeline
└── Makefile              # Convenient commands
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Configure your environment variables:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost
```

## 🚀 CI/CD Pipeline

The project includes a Jenkins pipeline with:

- ✅ Automated testing (ESLint, TypeScript, Prettier)
- 🏗️ Optimized Docker builds with BuildKit
- 🔒 Security scanning with Trivy
- 📦 Docker registry integration
- 🚀 Automated deployment

See [Jenkinsfile](./Jenkinsfile) for details.

## 📚 Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

### Docker Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [BuildKit](https://docs.docker.com/build/buildkit/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
