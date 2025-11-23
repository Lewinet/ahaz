# Ahaz - Neo-Bank Super App

A comprehensive digital economy platform combining wallet, ride-hailing, and marketplace functionality in a single super app.

## 🚀 Features

### 💰 Digital Wallet
- Send and receive money instantly
- Transaction history with search
- Real-time balance updates
- Multi-currency support

### 🚗 Ride Hailing
- Request rides with map interface
- Real-time driver tracking
- Upfront pricing
- Driver console for accepting rides

### 🛍️ Marketplace
- Browse and purchase products
- Secure checkout with wallet
- Order tracking with PIN verification
- Seller dashboard

### 👤 User Management
- Email/password authentication
- OAuth (Google & GitHub)
- Profile management
- Role-based access (user, driver, admin)
- Dark mode support

### 📊 Admin Dashboard
- Platform statistics
- User management
- Transaction monitoring
- Order and ride oversight
- Product management

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Maps**: React Leaflet
- **Icons**: Lucide React
- **Theme**: next-themes

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Lewinet/ahaz.git
cd ahaz

# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local
# Add your Supabase credentials to .env.local

# Run development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 🗄️ Database Setup

1. Run the schema in Supabase SQL Editor:
   ```sql
   -- Execute supabase/schema.sql
   ```

2. Run migrations:
   ```sql
   -- Execute supabase/migrations/001_add_products_table.sql
   ```

3. Seed demo data (optional):
   ```bash
   export $(cat .env.local | xargs) && npx tsx src/scripts/seed-products.ts
   ```

## 🔐 OAuth Setup

### Google OAuth
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add OAuth credentials from Google Cloud Console
4. Add authorized redirect URI

### GitHub OAuth
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable GitHub provider
3. Add OAuth credentials from GitHub OAuth App
4. Add authorized redirect URI

## 📱 Application Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin dashboard
│   ├── driver/rides/      # Driver console
│   ├── login/             # Authentication
│   ├── map/               # Ride hailing
│   ├── market/            # Marketplace
│   ├── orders/            # Order tracking
│   ├── settings/          # User settings
│   └── transactions/      # Transaction history
├── components/            # React components
│   ├── landing/          # Public landing page
│   ├── navigation/       # Bottom nav
│   ├── wallet/           # Wallet components
│   └── ...
├── lib/
│   ├── actions/          # Server actions
│   └── hooks/            # Custom hooks
└── scripts/              # Utility scripts
```

## 🎨 Features by Phase

- **Phase 5**: Driver ride request & accept flow
- **Phase 6**: Transaction history & settings with dark mode
- **Phase 7**: Admin dashboard with comprehensive monitoring
- **Phase 8**: Professional landing page & improved IA
- **Phase 9**: OAuth authentication (Google & GitHub)

## 🚦 Getting Started

1. **Visit the app**: http://localhost:3000
2. **Sign up**: Create an account or use OAuth
3. **Explore features**: Try wallet, rides, and market
4. **Admin access**: Navigate to `/admin` for oversight

## 📸 Screenshots

- Public landing page with hero section
- OAuth login with Google and GitHub
- Dashboard with balance and quick actions
- Transaction history with search
- Admin dashboard with stats and tables

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Supabase Auth for authentication
- Environment variables for sensitive data
- HTTPS only in production

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built by [Lewinet](https://github.com/Lewinet)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Tailwind CSS for the styling system

---

**Ready to launch! 🚀**
