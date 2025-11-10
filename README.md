# CareAI Dashboard

A React-based dental practice management dashboard application.

## Features

- Patient appointment management
- Practice selection dropdown
- Care AI Product FAQ chat panel
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd CareAI
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will run on `http://localhost:3002`

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Deployment to Netlify

### Automatic Deployment via GitHub Actions

This project is configured for automatic deployment to Netlify using GitHub Actions.

#### Setup Instructions:

1. **Create a Netlify account** (if you don't have one):
   - Go to [netlify.com](https://www.netlify.com)
   - Sign up/login

2. **Get your Netlify credentials**:
   - Go to Netlify Dashboard → User Settings → Applications → New access token
   - Create a new access token and copy it
   - Go to your site settings → Site details → Site ID (copy this)

3. **Add GitHub Secrets**:
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `NETLIFY_AUTH_TOKEN`: Your Netlify access token
     - `NETLIFY_SITE_ID`: Your Netlify site ID

4. **Push to GitHub**:
   - Push your code to the `main` or `master` branch
   - GitHub Actions will automatically build and deploy to Netlify

### Manual Deployment

You can also deploy manually using Netlify CLI:

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=build
```

## Project Structure

```
CareAI/
├── public/
│   └── index.html
├── src/
│   ├── assets/          # Images and SVG files
│   ├── components/      # React components
│   ├── App.js          # Main app component
│   └── index.js        # Entry point
├── .github/
│   └── workflows/      # GitHub Actions workflows
├── netlify.toml        # Netlify configuration
└── package.json        # Dependencies and scripts
```

## Technologies Used

- React 18
- React Scripts
- CSS3

## License

Private

