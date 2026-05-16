@echo off

cd /d "C:\RP\Personal\Extracted Zip Backup\Daily Output\Comparison\DailyComparisonWebsite"

python generate_report.py

git add .

git diff --cached --quiet
IF %ERRORLEVEL% EQU 0 (
    echo No changes detected.
    exit /b
)

git commit -m "daily auto update"

git push