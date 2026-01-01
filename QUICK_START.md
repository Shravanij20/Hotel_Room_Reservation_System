# Quick Start Guide

## 1. Install Dependencies

Open terminal in the project folder and run:
```bash
npm install
```

## 2. Run Locally

```bash
npm run dev
```

This will start the development server. Open your browser to `http://localhost:5173`

## 3. Test the Application

- **Book Rooms**: Enter a number (1-5) and click "Book"
- **Random Occupancy**: Click "Random" to generate random bookings
- **Reset**: Click "Reset" to clear all bookings

## 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 5. Deploy

Follow the instructions in `DEPLOYMENT.md` to deploy to Vercel, Netlify, or GitHub Pages.

## Project Structure

```
unstop_project/
├── src/
│   ├── components/     # UI components
│   ├── utils/          # Booking algorithm
│   └── App.jsx         # Main app
├── index.html
├── package.json
└── README.md
```

## Next Steps

1. Test the app locally
2. Deploy to get a live URL
3. Create a Google Doc with:
   - Live app URL
   - GitHub repository link
   - Solution explanation
4. Submit according to the assessment instructions

