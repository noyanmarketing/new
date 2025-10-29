# Getting Started with Seller Dashboard

This is a React/TypeScript seller dashboard application for managing products across multiple e-commerce marketplaces (Trendyol, Hepsiburada, N11).

## Prerequisites

You have **two options** to run this project:

### Option 1: Using Docker (Recommended - Easiest)
- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
- That's it! No Node.js or npm required.

### Option 2: Using Node.js Directly
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

---

## Quick Start with Docker (Recommended)

This is the **easiest way** to run the project. Docker handles all dependencies automatically.

### 1. Install Docker Desktop

Download and install Docker Desktop from: https://www.docker.com/products/docker-desktop/

### 2. Start the Application

Open your terminal in the project directory and run:

```bash
# For development mode with hot-reload
docker-compose up seller-dashboard-dev

# Or run in detached mode (background)
docker-compose up -d seller-dashboard-dev
```

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

That's it! Your seller dashboard is now running.

### Useful Docker Commands

```bash
# Stop the application
docker-compose down

# View logs
docker-compose logs -f seller-dashboard-dev

# Rebuild the container (after changing dependencies)
docker-compose up --build seller-dashboard-dev

# Run production build
docker-compose --profile production up seller-dashboard-prod
```

---

## Alternative: Running Without Docker

If you prefer not to use Docker, you can run the project directly with Node.js.

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

### Other Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
new/
├── src/
│   ├── App.tsx           # Main seller dashboard component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Tailwind CSS imports
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── Dockerfile            # Production Docker image
├── Dockerfile.dev        # Development Docker image
├── docker-compose.yml    # Docker services configuration
└── .dockerignore         # Files to exclude from Docker
```

## Features

The Seller Dashboard includes:

- **Firebase Authentication**: Secure login system with email/password
- **User Management**: Personalized account page with profile information
- **Dashboard Page**: Overview with statistics, sales charts, and activity log
- **Product Management**: List, add, edit, and delete products
- **Product Details**: Comprehensive product information forms
- **Image Upload**: Support for up to 6 product images
- **Status Management**: Mark products as Active, Trending, Hot, or New
- **Pricing & Stock**: Manage product pricing and inventory
- **Settings Page**: Dark mode toggle, notifications, language, security settings
- **My Account Page**: View and edit profile, payment methods, security options
- **Multi-marketplace Support**: Designed for Trendyol, Hepsiburada, and N11

## Demo Login Credentials

For testing purposes, use these credentials:

- **Email**: noyanmyai@gmail.com
- **Password**: Test123!
- **Company**: noyanist

The login page also has an "Auto-fill demo credentials" button for quick access.

## Technologies Used

- **React 19** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Vite 7** - Fast build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Firebase** - Authentication and hosting
- **Docker** - Containerization for easy deployment

## Troubleshooting

### Docker Issues

**Port already in use:**
```bash
# Stop all containers
docker-compose down

# Or change the port in docker-compose.yml
ports:
  - "3000:5173"  # Use port 3000 instead
```

**Container won't start:**
```bash
# Remove all containers and rebuild
docker-compose down
docker-compose up --build seller-dashboard-dev
```

**Changes not reflecting:**
```bash
# Make sure volumes are mounted correctly
# Check docker-compose.yml has:
volumes:
  - .:/app
  - /app/node_modules
```

### Non-Docker Issues

**Port already in use:**
If port 5173 is already in use, Vite will automatically try the next available port. Check your terminal for the actual URL.

**Module not found errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Tailwind styles not applying:**
Make sure:
- `./index.css` is imported in `src/main.tsx`
- Tailwind directives are in `src/index.css`
- `tailwind.config.js` includes the correct content paths

## Development Workflow

### With Docker

1. Make changes to your code
2. Save the file
3. Browser automatically refreshes (hot-reload)
4. No need to restart the container

### Without Docker

Same as above - Vite provides hot-reload by default.

## Production Deployment

### Option 1: Deploy to Firebase Hosting (Recommended)

Firebase Hosting provides fast, secure hosting for your web app.

#### Prerequisites

1. Install Firebase CLI globally:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

#### Deploy Steps

1. Build the production version:
```bash
npm run build
```

2. Deploy to Firebase Hosting:
```bash
firebase deploy --only hosting
```

3. Your site will be live at:
```
https://noyan-panel.web.app
```

#### Configuration

The project is already configured with:
- `firebase.json` - Firebase hosting configuration
- `.firebaserc` - Project settings (noyan-panel)

Firebase is configured to:
- Deploy from the `dist` folder (Vite build output)
- Handle SPA routing with rewrites to `/index.html`
- Include Firebase Analytics for tracking

### Option 2: Build Production Docker Image

```bash
# Build the production image
docker build -t seller-dashboard:latest .

# Run the production container
docker run -p 4173:4173 seller-dashboard:latest
```

### Or use Docker Compose

```bash
docker-compose --profile production up seller-dashboard-prod
```

### Option 3: Deploy to Other Cloud Platforms

The Docker image can be deployed to:
- **AWS ECS/Fargate**
- **Google Cloud Run**
- **Azure Container Instances**
- **DigitalOcean App Platform**
- **Heroku Container Registry**
- **Vercel**
- **Netlify**

## Firebase Authentication Setup

The project is pre-configured with Firebase Authentication. The configuration is in `src/firebase.ts`.

### Current Setup

- **Project ID**: noyan-panel
- **Auth Domain**: noyan-panel.firebaseapp.com
- **Analytics**: Enabled with measurementId

### Adding Users

To add users to Firebase Authentication:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **noyan-panel**
3. Navigate to **Build** > **Authentication**
4. Go to **Sign-in method** tab and enable **Email/Password**
5. Go to **Users** tab and click **Add User**
6. Enter email and password

**IMPORTANT**: You must create the demo user in Firebase Console first:
- Email: noyanmyai@gmail.com
- Password: Test123!

See `FIREBASE_SETUP.md` for detailed step-by-step instructions.

### Updating Firebase Config

If you need to use your own Firebase project:

1. Create a new project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication > Email/Password
3. Update `src/firebase.ts` with your config values
4. Update `.firebaserc` with your project ID
5. Update `firebase.json` hosting.site with your site name

## Environment Variables

The Firebase configuration is currently hardcoded in `src/firebase.ts`. For production, you may want to use environment variables:

1. Create a `.env` file in the root directory
2. Add your variables:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_API_URL=https://api.example.com
   ```
3. Access them in code:
   ```typescript
   const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
   const apiUrl = import.meta.env.VITE_API_URL
   ```
4. Update `src/firebase.ts` to use environment variables

## Next Steps

- [x] Add authentication and user management (Firebase Auth implemented)
- [x] Create Settings page with dark mode
- [x] Create My Account page
- [ ] Add backend integration for product management
- [ ] Implement actual image upload functionality (Firebase Storage)
- [ ] Connect to marketplace APIs (Trendyol, Hepsiburada, N11)
- [ ] Implement data persistence (Firestore database integration)
- [ ] Add unit and integration tests
- [ ] Set up CI/CD pipeline with Firebase/GitHub Actions

## Need Help?

### Check Your Setup

```bash
# Verify Docker is installed
docker --version
docker-compose --version

# Verify Node.js (if not using Docker)
node --version  # Should be 18+
npm --version
```

### Common Issues

1. **"Cannot find module"** - Run `npm install` or rebuild Docker container
2. **"Port already in use"** - Stop other services or change port
3. **"Permission denied"** - On Linux, add your user to docker group: `sudo usermod -aG docker $USER`

### Getting Support

- Check the project README.md
- Review Docker logs: `docker-compose logs -f`
- Check browser console for JavaScript errors

---

## Quick Reference

### Docker Commands

| Command | Description |
|---------|-------------|
| `docker-compose up seller-dashboard-dev` | Start development server |
| `docker-compose up -d` | Start in background |
| `docker-compose down` | Stop all services |
| `docker-compose logs -f` | View live logs |
| `docker-compose ps` | List running containers |
| `docker-compose restart` | Restart services |

### npm Commands (without Docker)

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

### Firebase Commands

| Command | Description |
|---------|-------------|
| `firebase login` | Login to Firebase |
| `firebase init` | Initialize Firebase in project |
| `firebase deploy` | Deploy all Firebase services |
| `firebase deploy --only hosting` | Deploy only hosting |
| `firebase serve` | Test hosting locally |
| `firebase projects:list` | List all Firebase projects |

---

**Enjoy building with the Seller Dashboard!**
