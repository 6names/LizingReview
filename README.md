# Lizing Review
* [English](#project-structure)
* [Русский](#user-content-Структура-проекта)

### Project Structure
```
_blank
|-- README.md
|-- package.json
|-- gulpfile.js           # Gulp config
|-- .gitignore
|-- src                   # Contains source files
|-- |-- css               # SCSS source files
|-- |-- |-- components    # SCSS componets
|-- |-- fonts
|-- |-- html              # HTML source files
|-- |-- |-- components    # HTML componets
|-- |-- images            
|-- |-- |-- svg           # SVG source files
|-- |-- |-- touch         # Favicons
|-- |-- |-- ui            # Interface icons
|-- |-- js                # JS source files
|-- |-- |-- components    # JS componets
|-- |-- modals            # Ajax modals
|-- dist                  # Contains all compiled and minified files
```

### Start
Please make sure you have installed Node.js on your computer, then install all modules. The following shows the steps:

* Installing Gulp
```
npm install -g gulp
```

* Installing all modules inside project folder
```
npm install
```

#### Build task
Compiling and compressing all files, then copy them to the DIST folder.
```
gulp
```

#### Development task
Start local server which watching to all changed files, compile files inside SRC folder without compressing and then refresh browser tab.
```
gulp serve
```

# Структура проекта
```
_blank
|-- README.md
|-- package.json
|-- gulpfile.js           # Конфигурация Gulp
|-- .gitignore
|-- src                   # Содержит исходные файлы
|-- |-- css               # SCSS исходные файлы
|-- |-- |-- components    # SCSS компоненты
|-- |-- fonts
|-- |-- html              # HTML исходные файлы
|-- |-- |-- components    # HTML компоненты
|-- |-- images            
|-- |-- |-- svg           # SVG исходные файлы
|-- |-- |-- touch         # Favicons
|-- |-- |-- ui            # Иконки интерфейса
|-- |-- js                # JS исходные файлы
|-- |-- |-- components    # JS компоненты
|-- |-- modals            # Ajax модальные окна
|-- dist                  # Содержит собранный проект с сжатием
```

### Старт
Убедитесь, что вы установили Node.js на свой компьютер, а затем установите все модули. Ниже показаны шаги:

* Установка Gulp
```
npm install -g gulp
```

* Установка всех модулей в папке проекта
```
npm install
```

#### Команда для сборки
Сборка и сжатие всех файлов с последующим копированием в папку DIST.
```
gulp
```

#### Команда для разработки
Запускает локальный сервер, который следит за изменениями файлов, выполняет сборку внутри папки SRC без сжатия и автоматически обновляет вкладку браузера. 
```
gulp serve
```
