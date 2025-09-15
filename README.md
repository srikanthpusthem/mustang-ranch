# Mustang Ranch - Western Investment Platform

A modern Next.js 14 application showcasing investment opportunities in the American West, featuring mustangs, barndominiums, and community gardens. Built with TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

## 🏗️ Project Structure

```
mustang-ranch/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (routes)/          # Page routes
│   │   ├── api/               # API routes
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── AgentDock.tsx     # AI chat interface
│   │   ├── Hero.tsx          # Homepage hero
│   │   ├── Navbar.tsx        # Navigation
│   │   └── ...               # Other components
│   ├── data/                 # Static data
│   │   └── opportunities.json # Investment data
│   └── lib/                  # Utilities
├── public/                   # Static assets
├── .github/workflows/        # CI/CD
└── staticwebapp.config.json  # Azure config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mustang-ranch

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:ui      # Run tests with UI

# Linting
npm run lint         # Run ESLint
```

## 🎨 Design System

### Color Palette
- **Mustang**: `#7A3E1D` - Primary brand color
- **Sage**: `#8A9A5B` - Secondary/accent color  
- **Sand**: `#E7D7BD` - Light background
- **Sky**: `#CBE3F8` - Light accent
- **Charcoal**: `#1F2937` - Dark text

### Typography
- **Headings**: Fraunces (serif)
- **Body**: Inter (sans-serif)

### Components
Built with shadcn/ui components and custom Western-themed styling.

## 🛣️ Route Map

| Route | Description | Component |
|-------|-------------|-----------|
| `/` | Homepage with hero and pillars | `page.tsx` |
| `/invest` | Investment opportunities grid | `invest/page.tsx` |
| `/invest/[slug]` | Individual opportunity details | `invest/[slug]/page.tsx` |
| `/community` | Community signup form | `community/page.tsx` |
| `/about` | About page with company story | `about/page.tsx` |
| `/contact` | Contact form | `contact/page.tsx` |
| `/admin` | Admin dashboard (password: admin123) | `admin/page.tsx` |
| `/api/agent` | AI agent API endpoint | `api/agent/route.ts` |
| `/api/contact` | Contact form API | `api/contact/route.ts` |

## 🤖 AI Agent Features

The AI Wrangler provides contextual responses based on:
- Current page/route
- User message content
- Investment type keywords (mustang, barndominium, garden)
- Risk and return inquiries

### Agent API Response Format
```json
{
  "response": "Contextual response text",
  "questions": ["Suggested questions..."],
  "suggestions": ["Investment suggestions..."],
  "intros": ["Welcome messages..."],
  "riskCallout": "Risk disclaimer"
}
```

## 🧪 Testing

The project includes comprehensive tests for:
- Component rendering and interactions
- API endpoint functionality
- Agent chat functionality

```bash
# Run all tests
npm run test

# Run specific test file
npm run test AgentDock.test.tsx

# Run tests with coverage
npm run test:run -- --coverage
```

## 🚀 Azure Static Web Apps Deployment

### Prerequisites
- Azure account
- GitHub repository

### Setup Steps

1. **Create Azure Static Web App**
   ```bash
   # Install Azure CLI
   az login
   az staticwebapp create \
     --name mustang-ranch \
     --resource-group myResourceGroup \
     --source https://github.com/yourusername/mustang-ranch \
     --location "Central US" \
     --branch main
   ```

2. **Get Deployment Token**
   - Go to Azure Portal → Static Web Apps → mustang-ranch
   - Copy the deployment token from "Manage deployment token"

3. **Add GitHub Secret**
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Add new secret: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Paste the deployment token

4. **Deploy**
   - Push to main branch
   - GitHub Actions will automatically build and deploy
   - Check Actions tab for deployment status

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | Azure deployment token | Yes (for CI/CD) |

### Custom Domain Setup

1. **Add Custom Domain in Azure**
   - Azure Portal → Static Web Apps → mustang-ranch
   - Custom domains → Add
   - Enter your domain name

2. **Configure DNS**
   - Add CNAME record pointing to your Azure Static Web App URL
   - Wait for SSL certificate provisioning

3. **Update robots.txt and sitemap**
   - Update `public/robots.txt` with your domain
   - Update `src/app/sitemap.ts` with your domain

## 📊 Performance & SEO

- **Lighthouse Score**: 90+ (mobile/desktop)
- **Core Web Vitals**: Optimized
- **SEO**: Meta tags, Open Graph, Twitter Cards
- **Accessibility**: WCAG 2.1 AA compliant
- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots**: Configured at `/robots.txt`

## 🔧 Development

### Adding New Investment Opportunities

1. Edit `src/data/opportunities.json`
2. Add new opportunity object with required fields:
   ```json
   {
     "slug": "unique-slug",
     "title": "Opportunity Title",
     "type": "mustang|barndominium|garden",
     "region": "State/Region",
     "minBuyIn": 1000,
     "estAPR": 8.5,
     "risk": "Low|Medium|High",
     "summary": "Brief description",
     "heroImage": "/images/hero.jpg",
     "highlights": ["Feature 1", "Feature 2", "Feature 3"]
   }
   ```

### Adding New Components

1. Create component in `src/components/`
2. Export from component file
3. Import and use in pages
4. Add tests in `src/__tests__/`

### Styling Guidelines

- Use Tailwind CSS classes
- Follow the Western color palette
- Use `font-serif` for headings, `font-sans` for body
- Apply `rounded-2xl` for modern Western aesthetic
- Use `grain-overlay` class for subtle texture

## 🎯 TODO: Part 2 & Part 3

### PART-2: Investment Platform Integration
- [ ] Real investment processing
- [ ] Payment integration (Stripe/PayPal)
- [ ] User authentication & accounts
- [ ] Portfolio management
- [ ] Real-time investment tracking
- [ ] Document management
- [ ] Compliance & legal framework

### PART-3: AI Agent Enhancement
- [ ] Real AI integration (OpenAI/Anthropic)
- [ ] Natural language processing
- [ ] Investment recommendation engine
- [ ] Risk assessment algorithms
- [ ] Personalized investment advice
- [ ] Multi-language support
- [ ] Voice interface integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email hello@mustangranch.com or join our community at `/community`.

---

**Built with ❤️ for the American West**