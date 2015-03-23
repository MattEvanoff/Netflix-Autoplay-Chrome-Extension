echo Setting up Netflix Autoplay Plugin Externals
@echo off

MKDIR %LOCALAPPDATA%\Netflix-Autoplay

REG ADD "HKCU\Software\Google\Chrome\NativeMessagingHosts\com.me.netflix.autoplay" /ve /t REG_SZ /d "%LOCALAPPDATA%\Netflix-Autoplay\com.me.netflix.autoplay.json" /f

@echo { > %LOCALAPPDATA%\Netflix-Autoplay\com.me.netflix.autoplay.json
@echo   "name": "com.me.netflix.autoplay", >> %LOCALAPPDATA%\Netflix-Autoplay\com.me.netflix.autoplay.json
@echo   "description": "Netflix Autoplay Host App", >> %LOCALAPPDATA%\Netflix-Autoplay\com.me.netflix.autoplay.json
@echo   "path": "shutdown.bat", >> %LOCALAPPDATA%\Netflix-Autoplay\com.me.netflix.autoplay.json
@echo   "type": "stdio", >> %LOCALAPPDATA%\Netflix-Autoplay\com.me.netflix.autoplay.json
@echo   "allowed_origins": [ >> %LOCALAPPDATA%\Netflix-Autoplay\com.me.netflix.autoplay.json
@echo     "chrome-extension://adegickccmlojbmbmemgjakpoammfmkg/" >> %LOCALAPPDATA%\Netflix-Autoplay\com.me.netflix.autoplay.json
@echo   ] >> %LOCALAPPDATA%\Netflix-Autoplay\com.me.netflix.autoplay.json
@echo } >> %LOCALAPPDATA%\Netflix-Autoplay\com.me.netflix.autoplay.json

@echo :: Lock > %LOCALAPPDATA%\Netflix-Autoplay\shutdown.bat
@echo ::rundll32.exe User32.dll,LockWorkStation >> %LOCALAPPDATA%\Netflix-Autoplay\shutdown.bat
@echo :: Shutdown >> %LOCALAPPDATA%\Netflix-Autoplay\shutdown.bat
@echo ::Shutdown.exe -s -t 00 >> %LOCALAPPDATA%\Netflix-Autoplay\shutdown.bat
@echo :: Hibernate >> %LOCALAPPDATA%\Netflix-Autoplay\shutdown.bat
@echo ::rundll32.exe PowrProf.dll,SetSuspendState >> %LOCALAPPDATA%\Netflix-Autoplay\shutdown.bat
@echo :: Sleep >> %LOCALAPPDATA%\Netflix-Autoplay\shutdown.bat
@echo rundll32.exe powrprof.dll,SetSuspendState 0,1,0 >> %LOCALAPPDATA%\Netflix-Autoplay\shutdown.bat

echo Setup Complete


