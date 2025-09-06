#!/bin/bash
# Auto-commit script for Trello Clone project

echo "🚀 Auto-commit starting..."

# Verify and set author
echo "Setting author: Ruben-Alvarez-Dev"
git config user.name "Ruben-Alvarez-Dev"
git config user.email "ruben.alvarez.dev@gmail.com"

# Check for changes
if git diff --quiet && git diff --cached --quiet; then
  echo "No changes to commit"
  exit 0
fi

# Show what will be committed
echo "Files to be committed:"
git status --porcelain

# Add all changes
git add .

# Generate smart commit message
CHANGED_FILES=$(git diff --cached --numstat | wc -l | tr -d ' ')
FIRST_FILE=$(git diff --cached --name-only | head -1)

# Determine commit type based on files changed
TYPE="feat"
if [[ $FIRST_FILE == *"test"* ]]; then 
  TYPE="test"
elif [[ $FIRST_FILE == *"fix"* ]] || [[ $FIRST_FILE == *"bug"* ]]; then 
  TYPE="fix"
elif [[ $FIRST_FILE == *.md ]]; then 
  TYPE="docs"
elif [[ $FIRST_FILE == *.css ]] || [[ $FIRST_FILE == *"style"* ]]; then 
  TYPE="style"
elif [[ $FIRST_FILE == *"component"* ]] || [[ $FIRST_FILE == *"src/"* ]]; then
  TYPE="feat"
fi

# Create descriptive message
if [ $CHANGED_FILES -eq 1 ]; then
  MESSAGE="$TYPE: update $(basename "$FIRST_FILE")"
else
  MESSAGE="$TYPE: update $CHANGED_FILES files"
fi

# Commit with proper author
echo "Committing: $MESSAGE"
git commit -m "$MESSAGE" --author="Ruben-Alvarez-Dev <ruben.alvarez.dev@gmail.com>"

# Push to main
echo "Pushing to main..."
git push origin main

echo "✅ Auto-commit completed: $MESSAGE"