@echo off
setlocal
cd /d "%~dp0"
where java >nul 2>nul
if errorlevel 1 (
  echo Java was not found. Install Java 8 or newer, then run this file again.
  echo Download: https://adoptium.net/
  pause
  exit /b 1
)
echo Starting WolfTech Global at http://localhost:8080
java -jar WolfTechGlobal.jar
if errorlevel 1 pause

