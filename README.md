<<<<<<< HEAD
# Gift
=======
# 💖 Valentine's Day Proposal Website

A beautiful, interactive React website for proposing on Valentine's Day with confetti effects, quiz games, and a playful "running No button"!

## ✨ Features

- 🎨 Beautiful pink gradient design with floating hearts
- 💭 Special date quiz game
- 🧩 Fun puzzle challenges
- 😏 Playful "No" button that runs away
- 🎊 **Canvas-confetti celebration** firing from both sides
- 📱 **Fully mobile responsive**
- 🎁 Easy GIF customization

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd valentine-app
npm install
```

### 2. Run the App

```bash
npm start
```

The app will open at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

## 🎨 Customization Guide

### Change GIFs

Open `src/components/ValentineProposal.js` and find the `GIFS` object at the top:

```javascript
const GIFS = {
  step1: 'YOUR_GIF_URL_HERE',
  step2Wrong: 'YOUR_GIF_URL_HERE',
  step3: 'YOUR_GIF_URL_HERE',
  step3Sad: 'YOUR_GIF_URL_HERE',
  step4: 'YOUR_GIF_URL_HERE',
  step5: 'YOUR_GIF_URL_HERE'
};
```

Replace the URLs with your own GIF links from Giphy, Tenor, or any image hosting service.

### Change the Special Date

In `src/components/ValentineProposal.js`, find the `handleDateSubmit` function:

```javascript
const correctDate = '15-08-2022'; // Change this to your special date!
```

### Customize Puzzle Questions

In `src/components/ValentineProposal.js`, find the `puzzleQuestions` array:

```javascript
const puzzleQuestions = [
  {
    question: "Your question here",
    answer: "ANSWER",
    hint: "Your hint here"
  },
  // Add more questions...
];
```

You can add, remove, or modify questions as you like!

### Change Her Name

Add `?name=Sarah` to the URL:
```
http://localhost:3000?name=Sarah
```

Or for production:
```
https://yoursite.com?name=Sarah
```

## 🎊 Confetti Details

The app uses **canvas-confetti** library (v1.9.4) to create beautiful confetti animations:

- Fires from **both sides** of the screen
- 3-second continuous burst
- Pink/red color scheme
- 50 particles per burst
- Customizable in the `fireConfetti()` function

## 📱 Mobile Features

- Touch-optimized buttons
- Responsive text sizing
- Prevents iOS zoom on inputs
- Running "No" button works on touch devices
- Optimized animations for mobile performance

## 🌐 Deployment Options

### Option 1: Netlify (Easiest)

1. Build the app: `npm run build`
2. Drag the `build` folder to [netlify.com/drop](https://app.netlify.com/drop)
3. Done! You get a free URL instantly

### Option 2: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Your site is live!

### Option 3: GitHub Pages

1. Install gh-pages: `npm install gh-pages --save-dev`
2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/repo-name",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Run: `npm run deploy`

## 📂 Project Structure

```
valentine-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ValentineProposal.js    # Main component (CUSTOMIZE HERE!)
│   │   └── ValentineProposal.css   # Styles
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎯 Key Customization Points

1. **GIFs**: Line ~8 in `ValentineProposal.js`
2. **Special Date**: Line ~35 in `ValentineProposal.js`
3. **Puzzle Questions**: Line ~21 in `ValentineProposal.js`
4. **Colors**: `ValentineProposal.css` (search for color values)
5. **Confetti Colors**: Line ~156 in `ValentineProposal.js`

## 💡 Tips

- Test on mobile devices before sending!
- Use short GIF URLs (use bit.ly if needed)
- Make puzzle questions meaningful to your relationship
- The special date accepts multiple formats (DD-MM-YYYY, DD/MM/YYYY, etc.)

## 🐛 Troubleshooting

**App won't start?**
- Make sure you ran `npm install` first
- Check Node.js version (requires v14+)

**GIFs not loading?**
- Ensure GIF URLs are direct links
- Check CORS - use Giphy/Tenor URLs

**Confetti not showing?**
- Check browser console for errors
- Canvas-confetti requires modern browsers

## ❤️ Good Luck!

Make it special, test it thoroughly, and most importantly - have fun! 💕

---

**Need help?** Check the comments in the code - everything is well documented!
>>>>>>> 5aa86f7 (Initial Valentine proposal app with all features - puzzles, date quiz, confetti, mobile responsive)
