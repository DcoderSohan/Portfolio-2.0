#!/bin/bash

echo "Starting Backend Server..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "WARNING: .env file not found!"
    echo "Please create a .env file with your configuration."
    echo "See START_SERVER.md for details."
    echo ""
    exit 1
fi

echo "Starting server..."
echo ""
npm start

