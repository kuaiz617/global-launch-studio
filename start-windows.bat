@echo off
if not exist node_modules (
  echo Installing dependencies...
  call npm install
)
start http://127.0.0.1:4173
call npm run demo
