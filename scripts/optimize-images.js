#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Configuration
const POSTS_IMG_DIR = path.join(__dirname, "../public/img/posts");
const SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const QUALITY = 80; // Quality setting for optimization
const MAX_WIDTH = 1920; // Maximum width for resizing
const MAX_HEIGHT = 1080; // Maximum height for resizing

// Stats tracking
let stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  totalSizeBefore: 0,
  totalSizeAfter: 0,
};

/**
 * Get file size in bytes
 */
function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch (error) {
    return 0;
  }
}

/**
 * Format bytes to human readable format
 */
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Check if file is an image
 */
function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return SUPPORTED_FORMATS.includes(ext);
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath) {
  try {
    const filename = path.basename(inputPath);
    const dirPath = path.dirname(inputPath);
    const nameWithoutExt = path.parse(filename).name;
    const ext = path.extname(filename).toLowerCase();
    const originalSize = getFileSize(inputPath);

    console.log(`Processing: ${filename} (${formatBytes(originalSize)})`);

    // Create optimized version with -optimized suffix
    const outputPath = path.join(dirPath, `${nameWithoutExt}-optimized${ext}`);

    await sharp(inputPath)
      .resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFormat(ext.slice(1), { quality: QUALITY })
      .toFile(outputPath);

    const optimizedSize = getFileSize(outputPath);
    const savings = originalSize - optimizedSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

    console.log(`  → Optimized: ${formatBytes(optimizedSize)}`);
    console.log(`    Savings: ${formatBytes(savings)} (${savingsPercent}%)`);

    stats.processed++;
    stats.totalSizeBefore += originalSize;
    stats.totalSizeAfter += optimizedSize;
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
    stats.errors++;
  }
}

/**
 * Process all images in a directory recursively
 */
async function processDirectory(dirPath) {
  try {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(fullPath);
      } else if (stat.isFile() && isImageFile(item)) {
        // Skip files that are already optimized
        if (!item.includes("-optimized")) {
          await optimizeImage(fullPath);
        } else {
          console.log(`Skipping already optimized: ${item}`);
          stats.skipped++;
        }
      } else {
        stats.skipped++;
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
    stats.errors++;
  }
}

/**
 * Main function
 */
async function main() {
  console.log("🚀 Starting image optimization (simple mode)...\n");
  console.log(`📁 Processing directory: ${POSTS_IMG_DIR}`);
  console.log(`🎯 Supported formats: ${SUPPORTED_FORMATS.join(", ")}`);
  console.log(`⚙️  Quality setting: ${QUALITY}%`);
  console.log(`📐 Max dimensions: ${MAX_WIDTH}x${MAX_HEIGHT}\n`);

  // Check if directory exists
  if (!fs.existsSync(POSTS_IMG_DIR)) {
    console.error(`❌ Directory not found: ${POSTS_IMG_DIR}`);
    process.exit(1);
  }

  const startTime = Date.now();

  try {
    await processDirectory(POSTS_IMG_DIR);
  } catch (error) {
    console.error("❌ Fatal error:", error.message);
    process.exit(1);
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Print summary
  console.log("\n📊 Optimization Summary:");
  console.log("========================");
  console.log(`✅ Processed: ${stats.processed} images`);
  console.log(`⏭️  Skipped: ${stats.skipped} files`);
  console.log(`❌ Errors: ${stats.errors}`);
  console.log(`⏱️  Duration: ${duration}s`);
  console.log(`📦 Original size: ${formatBytes(stats.totalSizeBefore)}`);
  console.log(`📦 Optimized size: ${formatBytes(stats.totalSizeAfter)}`);

  if (stats.totalSizeBefore > 0) {
    const totalSavings = stats.totalSizeBefore - stats.totalSizeAfter;
    const totalSavingsPercent = (
      (totalSavings / stats.totalSizeBefore) *
      100
    ).toFixed(1);
    console.log(
      `💾 Total savings: ${formatBytes(totalSavings)} (${totalSavingsPercent}%)`
    );
  }

  console.log("\n🎉 Image optimization completed!");
  console.log('💡 Optimized images have "-optimized" suffix');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { optimizeImage, processDirectory };
