# Hotel Room Reservation System

A web-based hotel room reservation system that optimally books rooms based on travel time minimization.

## Features

- **Room Booking**: Book 1-5 rooms at a time with optimal travel time calculation
- **Visualization**: Interactive grid showing all 97 rooms across 10 floors
- **Random Occupancy**: Generate random room bookings to test the system
- **Reset**: Clear all bookings with one click
- **Travel Time Calculation**: 
  - Horizontal: 1 minute per room
  - Vertical: 2 minutes per floor

## Hotel Structure

- **Floors 1-9**: 10 rooms each (101-110, 201-210, ..., 901-910)
- **Floor 10**: 7 rooms (1001-1007)
- **Total**: 97 rooms
- Stairs/Lift located on the left side of the building

## Booking Algorithm

1. **Priority 1**: Book rooms on the same floor (minimizes vertical travel)
2. **Priority 2**: If same-floor booking not possible, minimize total travel time across floors
3. **Travel Time**: Calculated as the sum of distances between consecutive rooms in the booking

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd unstop_project
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Vercel will auto-detect Vite and configure the build
5. Click "Deploy" - your app will be live in seconds!

### Option 2: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" > "Import an existing project"
4. Connect your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 3: GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
3. Run: `npm run deploy`
4. Enable GitHub Pages in repository settings

## Project Structure

```
unstop_project/
├── src/
│   ├── components/
│   │   ├── ControlPanel.jsx      # Input and buttons
│   │   ├── ControlPanel.css
│   │   ├── RoomGrid.jsx          # Room visualization
│   │   └── RoomGrid.css
│   ├── utils/
│   │   └── roomUtils.js          # Booking algorithm & utilities
│   ├── App.jsx                   # Main application
│   ├── App.css
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## How to Use

1. **Book Rooms**: 
   - Enter the number of rooms (1-5) in the input field
   - Click "Book" to automatically select optimal rooms
   - The system will show the total travel time

2. **Random Occupancy**: 
   - Click "Random" to generate random bookings (~40% occupancy)
   - Useful for testing the booking algorithm

3. **Reset**: 
   - Click "Reset" to clear all bookings and start fresh

## Notes

- Maximum 5 rooms can be booked per transaction
- The algorithm prioritizes same-floor bookings
- Travel time is calculated between consecutive rooms in the booking
- Rooms are color-coded: White = Available, Red = Booked

## Submission Checklist

- [x] Working application with all required features
- [x] Live URL (deploy to Vercel/Netlify)
- [x] Code repository (GitHub)
- [x] Documentation (this README)

## Author

YourName - Assessment Submission

