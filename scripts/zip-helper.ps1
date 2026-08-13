
Add-Type -AssemblyName System.IO.Compression.FileSystem
if (Test-Path 'C:\\Users\\Asus\\Desktop\\kodetocareer-deploy.zip') { Remove-Item -Path 'C:\\Users\\Asus\\Desktop\\kodetocareer-deploy.zip' -Force }
if (Test-Path 'C:\\KodeToCareer\\cpanel-deploy.zip') { Remove-Item -Path 'C:\\KodeToCareer\\cpanel-deploy.zip' -Force }
[System.IO.Compression.ZipFile]::CreateFromDirectory('C:\\KodeToCareer\\cpanel-deploy', 'C:\\Users\\Asus\\Desktop\\kodetocareer-deploy.zip')
Copy-Item -Path 'C:\\Users\\Asus\\Desktop\\kodetocareer-deploy.zip' -Destination 'C:\\KodeToCareer\\cpanel-deploy.zip' -Force
