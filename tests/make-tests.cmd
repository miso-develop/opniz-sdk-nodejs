@echo off
cd /d %~dp0

set ROOT=%~dp0

set TEMPLATE=%~dp0template.test.ts
echo %TEMPLATE%

for /f %%A in ('dir /b/s ..\src\TCPObniz') do call :make-tests %%A

pause
exit /b



:make-tests
	set SRCPATH=%1
	set TESTPATH=%SRCPATH:\src\=\tests\%
	set TESTPATH=%TESTPATH:.ts=.test.ts%
	
	echo %SRCPATH%
	echo %TESTPATH%
	
	set EXT=%~x1
	if _%EXT% equ _.ts (
		echo make .test!
		echo %TESTPATH%
		echo F | xcopy /y %TEMPLATE% %TESTPATH%
	)
	
	echo.
exit /b
