#!/bin/bash

# Остановить скрипт при ошибке
set -e

# Сборка проекта
npm run build

# Переход в директорию сборки
cd dist

# Инициализация нового репозитория Git
git init
git add -A
git commit -m 'deploy'

# Пуш в ветку gh-pages
git push -f git@github.com:Rubikorp/user-table.git master:gh-pages

# Возврат в корневую директорию проекта
cd -