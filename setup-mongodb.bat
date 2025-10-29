@echo off
echo Installing MongoDB Community Edition...

:: Download MongoDB Community Edition
echo Downloading MongoDB...
powershell -Command "Invoke-WebRequest -Uri 'https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.5-signed.msi' -OutFile 'mongodb-installer.msi'"

:: Install MongoDB
echo Installing MongoDB...
msiexec /i mongodb-installer.msi /quiet /norestart

:: Create data directory
echo Creating data directory...
mkdir C:\data\db

:: Start MongoDB service
echo Starting MongoDB service...
net start MongoDB

echo MongoDB installation complete!
echo Database will be available at: mongodb://localhost:27017
pause