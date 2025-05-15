# AI Finance Dashboard - Intelligent Financial Management Platform

![AI Finance Dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200)

A sophisticated financial management platform powered by AI that helps users track, analyze, and optimize their financial decisions. Built with modern technologies and focused on providing intelligent insights for better financial management.

## 🌟 Features

- **AI-Powered Insights**: Get intelligent recommendations and financial forecasting
- **Smart Transaction Analysis**: Automatic categorization and pattern detection
- **Interactive Dashboards**: Real-time visualization of your financial data
- **Secure Authentication**: Protected access with NextAuth.js
- **Dark/Light Mode**: Comfortable viewing experience in any lighting
- **Responsive Design**: Seamless experience across all devices
- **Financial Analytics**: Comprehensive metrics and visualizations
- **MongoDB Integration**: Robust and scalable data storage

## 🚀 Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI Components
- ShadCN UI
- Recharts (for data visualization)
- Lucide React (for icons)
- React Hook Form
- Zod (for validation)

### Backend & Database
- Next.js API Routes
- MongoDB
- Mongoose
- NextAuth.js
- bcrypt (for password hashing)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MongoDB
- npm or pnpm
- Git

## 🛠️ Installation & Setup

### 1. Fork & Clone the Repository

1. Fork the repository by visiting [https://github.com/gurleenwadhwa-13/ai-finance-dashboard](https://github.com/gurleenwadhwa-13/ai-finance-dashboard) and clicking the "Fork" button in the top right corner.

2. Clone your forked repository
```bash
git clone https://github.com/YOUR_USERNAME/ai-finance-dashboard.git
cd ai-finance-dashboard

# Add the original repository as upstream
git remote add upstream https://github.com/gurleenwadhwa-13/ai-finance-dashboard.git
```

### 2. Install Dependencies

```bash
# Install project dependencies
npm install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Additional Configuration
NODE_ENV=development
```

### 4. Start Development Server

```bash
npm run dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
ai-finance-dashboard/
├── app/                # Next.js 15 app directory
│   ├── api/           # API routes
│   ├── auth/          # Authentication pages
│   └── dashboard/     # Dashboard pages
├── components/        # Reusable UI components
│   ├── ui/           # Base UI components
│   └── dashboard/    # Dashboard-specific components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
│   ├── auth.ts       # Authentication utilities
│   └── mongodb.ts    # Database utilities
├── public/           # Static assets
└── styles/           # Global styles
```

## 🎯 Core Features

### 1. AI-Powered Financial Management
- Intelligent spending pattern analysis
- Automated budget recommendations
- Predictive financial forecasting
- Anomaly detection in transactions

### 2. Interactive Dashboard
- Real-time financial overview
- Custom date range analytics
- Transaction history visualization
- Budget tracking and management

### 3. Security & Authentication
- Secure user authentication with NextAuth.js
- Password encryption with bcrypt
- Protected API routes
- Secure session management

### 4. Data Visualization
- Interactive charts and graphs
- Financial trend analysis
- Custom filtering capabilities
- Export functionality

## 🔜 Roadmap

- [ ] Mobile application development
- [ ] Bank account integration via Plaid
- [ ] Advanced AI financial advisor
- [ ] Investment portfolio tracking
- [ ] Automated bill payment reminders
- [ ] Custom dashboard layouts
- [ ] Multi-currency support
- [ ] PDF report generation
- [ ] Email notifications
- [ ] Budget goals and milestones

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔧 Support

For support, please:
- Open an issue in the GitHub repository
- Check the documentation
- Contact the maintainers

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team
- [MongoDB](https://www.mongodb.com/) team
- [Radix UI](https://www.radix-ui.com/) for components
- [Vercel](https://vercel.com/) for hosting
- All contributors and supporters

---

Built with 🤖 using Next.js, MongoDB, and AI 