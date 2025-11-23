@echo off
:: Открываем браузер
start "" "http://localhost:8000"

:: Запускаем сервер в скрытом окне
start "" /min cmd /c "python -m http.server 8000"

:: Закрываем текущее окно батника
exit
