#!/bin/bash
# Deploy to S3 with proper Content-Type headers

BUCKET="s3://tech-action-working-group"
SOURCE_DIR="dist"

# Sync all files first
aws s3 sync "$SOURCE_DIR" "$BUCKET" --delete \
  --exclude "node_modules/*" \
  --exclude "sass/*" \
  --exclude ".git/*"

# Set Content-Type headers for different file types
# HTML files
find "$SOURCE_DIR" -type f -name "*.html" | while read -r file; do
  s3_path="${file#$SOURCE_DIR/}"
  aws s3 cp "$file" "$BUCKET/$s3_path" \
    --content-type "text/html; charset=utf-8" \
    --metadata-directive REPLACE \
    --quiet
done

# CSS files
find "$SOURCE_DIR" -type f -name "*.css" | while read -r file; do
  s3_path="${file#$SOURCE_DIR/}"
  aws s3 cp "$file" "$BUCKET/$s3_path" \
    --content-type "text/css; charset=utf-8" \
    --metadata-directive REPLACE \
    --quiet
done

# JavaScript files
find "$SOURCE_DIR" -type f -name "*.js" | while read -r file; do
  s3_path="${file#$SOURCE_DIR/}"
  aws s3 cp "$file" "$BUCKET/$s3_path" \
    --content-type "application/javascript; charset=utf-8" \
    --metadata-directive REPLACE \
    --quiet
done

# JSON files
find "$SOURCE_DIR" -type f -name "*.json" | while read -r file; do
  s3_path="${file#$SOURCE_DIR/}"
  aws s3 cp "$file" "$BUCKET/$s3_path" \
    --content-type "application/json; charset=utf-8" \
    --metadata-directive REPLACE \
    --quiet
done

echo "Deployment complete with proper Content-Type headers"
