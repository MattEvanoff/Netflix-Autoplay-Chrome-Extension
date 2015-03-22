
:: Lock
rundll32.exe User32.dll,LockWorkStation

:: Shutdown
::Shutdown.exe -s -t 00

:: Hibernate
::rundll32.exe PowrProf.dll,SetSuspendState

:: Sleep
::rundll32.exe powrprof.dll,SetSuspendState 0,1,0