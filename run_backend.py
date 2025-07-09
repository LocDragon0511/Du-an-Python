#!/usr/bin/env python3
"""
Main script to run the PERL & Python Learning System backend server.
"""

import sys
import os
import subprocess
from pathlib import Path

def check_requirements():
    """Check if required packages are installed."""
    try:
        import fastapi
        import uvicorn
        import sqlalchemy
        import psycopg2
        import pydantic
        print("✅ All required packages are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing required package: {e}")
        print("Please install requirements: pip install -r requirements.txt")
        return False

def check_env_file():
    """Check if .env file exists."""
    env_file = Path(".env")
    if not env_file.exists():
        print("⚠️  .env file not found")
        print("Creating .env file from .env.example...")
        
        example_file = Path(".env.example")
        if example_file.exists():
            env_file.write_text(example_file.read_text())
            print("✅ .env file created")
            print("📝 Please edit .env file with your database configuration")
        else:
            print("❌ .env.example file not found")
            return False
    else:
        print("✅ .env file found")
    return True

def run_server():
    """Run the FastAPI server."""
    print("🚀 Starting PERL & Python Learning System Backend...")
    
    try:
        # Run uvicorn server
        cmd = [
            sys.executable, "-m", "uvicorn",
            "backend.main:app",
            "--host", "0.0.0.0",
            "--port", "8000",
            "--reload"
        ]
        
        print(f"Running command: {' '.join(cmd)}")
        subprocess.run(cmd, check=True)
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Error running server: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n👋 Server stopped")

def main():
    """Main function."""
    print("PERL & Python Learning System Backend")
    print("=" * 50)
    
    # Check requirements
    if not check_requirements():
        sys.exit(1)
    
    # Check .env file
    if not check_env_file():
        sys.exit(1)
    
    # Run server
    run_server()

if __name__ == "__main__":
    main()