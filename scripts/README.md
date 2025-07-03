# Image Optimization Scripts

This directory contains scripts to optimize images in the `public/img/posts` folder.

## Scripts

### 2. `optimize-images.js` (Simple Version)
Creates only one optimized version in the original format with `-optimized` suffix.

**Usage:**
```bash
npm run optimize-images-simple
```

## Features

- ✅ **Recursive processing** - finds images in all subdirectories
- ✅ **Multiple format support** - JPG, JPEG, PNG, WebP, GIF
- ✅ **Smart resizing** - maintains aspect ratio, max 1920x1080
- ✅ **Quality optimization** - 80% quality setting (configurable)
- ✅ **Size reporting** - shows before/after sizes and savings
- ✅ **Error handling** - continues processing even if some images fail
- ✅ **Skip already optimized** - won't reprocess existing optimized images

## Configuration

You can modify these settings in the scripts:

```javascript
const QUALITY = 80; // Quality setting (1-100)
const MAX_WIDTH = 1920; // Maximum width
const MAX_HEIGHT = 1080; // Maximum height
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
```

## Output

### Full Version
For each `image.jpg`, creates:
- `image.webp` - WebP version
- `image.avif` - AVIF version  
- `image-optimized.jpg` - Optimized original format

### Simple Version
For each `image.jpg`, creates:
- `image-optimized.jpg` - Optimized version only

## Example Output

```
🚀 Starting image optimization...

📁 Processing directory: /path/to/public/img/posts
🎯 Supported formats: .jpg, .jpeg, .png, .webp, .gif
📤 Output formats: webp, avif
⚙️  Quality setting: 80%

Processing: photo.jpg (2.5 MB)
  → WEBP: 156.2 KB
    Savings: 2.34 MB (93.8%)
  → AVIF: 89.7 KB
    Savings: 2.41 MB (96.4%)
  → Optimized JPG: 445.3 KB
    Savings: 2.05 MB (82.1%)

📊 Optimization Summary:
========================
✅ Processed: 15 images
⏭️  Skipped: 3 files
❌ Errors: 0
⏱️  Duration: 12.5s
📦 Original size: 45.2 MB
📦 Optimized size: 8.7 MB
💾 Total savings: 36.5 MB (80.8%)

🎉 Image optimization completed!
```

## Requirements

- Node.js
- `sharp` package (installed as dev dependency)

## Installation

The required dependencies are already installed. If you need to reinstall:

```bash
npm install --save-dev sharp
``` 