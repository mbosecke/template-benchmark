# Fest [![Build Status](https://travis-ci.org/mailru/fest.png?branch=0.8)](https://travis-ci.org/mailru/fest)

Fest — это шаблонизатор общего назначения, компилирующий XML шаблоны в самодостаточные JavaScript функции. Для установки требуется Node.js >= 0.8.

## Установка

```
npm install fest
```

## Введение

Шаблоны представляют собой XML документы, содержащие HTML, текстовые данные и управляющие конструкции. Шаблон задается парным элементом `<fest:template>` (с указанием пространства имен `http://fest.mail.ru`). Например:

```xml
<fest:template xmlns:fest="http://fest.mail.ru">
    Hello!
</fest:template>
```

Данные передаваемые в шаблон, доступны через переменную с именем, указанным в атрибуте `context_name` элемента `fest:template`:

```xml
<fest:template xmlns:fest="http://fest.mail.ru" context_name="json">
    Hello, <fest:value>json.name</fest:value>!
</fest:template>
```

Чтобы посмотреть результат работы, приведенных выше шаблонов, необходимо воспользоваться встроенной утилитой fest-render или API библиотеки.

### fest-render

Утилита `fest-render` используется для компиляции и последующего запуска скомпилированного шаблона из командной строки. В таком случае, для передачи данных в шаблон используется JSON-файл.

hello.json
```json
{"name": "John"}
```

hello.xml
```xml
<fest:template xmlns:fest="http://fest.mail.ru" context_name="json">
  Hello, <fest:value>json.name</fest:value>!
</fest:template>
```

```
$ ./node_modules/.bin/fest-render --json=hello.json hello.xml
Hello,John!
```

_Замечание: начальные и конечные пробелы в текстовых узлах удаляются при компиляции. Если необходимо вывести символ пробела, можно вопспользоваться `fest:space`._

### render()

Функция `render()` API компилирует и исполняет шаблон с заданными параметрами.

hello.js
```javascript
var fest = require('fest');
console.log(fest.render('hello.xml'), {name: 'John'});
```

```
$ node ./hello.js
Hello,John!
```
## Данные и вывод

### fest:value

Служит для вывода значения JavaScript выражения. Поддерживаем 4 режима вывода: html (по умолчанию), text, js и json.

```xml
<fest:script><![CDATA[
    var value = '"<script/>"';
]]></fest:script>
<fest:value>value</fest:value><!-- &quot;&lt;script/&gt;&quot; -->
<fest:value output="text">value</fest:value><!-- "<script/>" -->
<fest:value output="js">value</fest:value><!-- \"\u003Cscript\/\u003E\" -->
<fest:value output="json">value</fest:value><!-- "\"\u003Cscript/\u003E\"" -->
```

### fest:var

Устаналивает локальную JavaScript переменную.

```xml
<fest:var name="question">Ultimate Question of Life, The Universe, and Everything</fest:var>
<fest:value>question</fest:value><!-- Ultimate Question of Life, The Universe, and Everything -->
<fest:var name="answer" select="question.length - 13" />
<fest:value>answer</fest:value><!-- 42  -->
```

### fest:text

Выводит неформатированный текст.

```xml
<fest:text>"Hello"</fest:text><!-- "Hello" -->
```

### fest:space

Служит для вывода пробела. Необходим в тех случаях, когда пробел в тектовом узле удаляется при компиляции, например:

```xml
Hello,<fest:space/><fest:value>json.name</fest:value>!<!-- Hello, John! -->
```

### fest:set

Объявляет именованный подшаблон. Содержимое `fest:set` не будет выполнено до тех пор, пока не будет вызван блок с таким же имененем с помощью `fest:get`.

```xml
<fest:set name="name">John</fest:set>
```

```xml
<fest:set name="full_name">
    <fest:get name="name"/><fest:space/>F. Kennedy
</fest:set>
```

Для `fest:set` можно использовать атрибут `test`. Операция выполнится, если его значение (JavaScript выражение) истинно.

```xml
<fest:set name="name" test="false">should not be set</fest:set>
```

Внутри `fest:set` доступен контекст `params`, передаваемый через `fest:get`.

```xml
<fest:set name="line">
    Hello,<fest:space/><fest:value>params.username</fest:value>!
</fest:set>
<fest:get name="line">{username: "John"}</fest:get><!-- Hello, John! -->
```

### fest:get

Выводит содержимое блока, объявленного через `fest:set`.

```xml
<fest:get name="name"/>
```

```xml
<fest:get name="name">{'some': 'data'}</fest:get>
```

С помощью `fest:param` можно передавать в блок XML-данные.

```xml
<fest:get name="page">
    <fest:param name="doctype">html</fest:param>
    <fest:params>
        {
            title: json.title
        }
    </fest:params>
    <fest:param name="content">
        <article>
            <fest:if test="json.title">
                <h1><fest:value>json.title</fest:value></h1>
            </fest:if>
        </article>
    </fest:param>
</fest:get>
<fest:set name="page">
    <fest:doctype><fest:value>params.doctype</fest:value></fest:doctype>
    <title><fest:value>params.title</fest:value></title>
    <body>
        <fest:value output="text">params.content</fest:value>
    </body>
</fest:set>
```

Внутри атрибута `name` можно использовать JavaScript выражения для вычисления имени блока во время выполнения. Значения выражений, заключенных в фигурные скобки, объединяются с примыкающим текстом. Помимо этого, можно использовать атрибут `select`.

```xml
<fest:script>
    var name = 'foo'
</fest:script>
<fest:get select="name"/><!-- foo -->
<fest:set name="foo">foo</fest:set>
<fest:set name="bar">bar</fest:set>
<fest:get name="b{true?'a':''}r"/><!-- bar -->
```

### fest:element

Выводит HTML элемент с переменным именем.

```xml
<fest:element name="div" />
<fest:script>
    var variable = 'table';
</fest:script>
<fest:element select="variable">
    fest code
</fest:element>
<fest:element name="{variable2}">
    fest code
</fest:element>
```

Результат:

```xml
<div></div><table>fest code</table><div>fest code</div>
```

### fest:attributes, fest:attribute

Добавляет атрибуты к родительскому элементы. Все `fest:attribute` должны быть внутри блока `fest:attributes`, который должен идти первым внутри элемента.

```xml
<a>
    <fest:attributes>
        <fest:attribute name="href"><fest:value>json.href</fest:value></fest:attribute>
    </fest:attributes>
    Some link
</a>
```

Существует быстрый способ вывести значение в атрибут:

```xml
<a href="{json.href}">Some link</a>
```

Имена атрибутов можно вычислять в момент исполнения шаблона:

```xml
<div>
    <fest:attributes>
        <fest:attribute name="data-{json.name}" value="{json.value}" />
    </fest:attributes>
</div>
```

## Управляющие конструкции

### fest:each

Предоставляет механизм итерации по объекту.

```xml
<fest:script>var obj = {"foo": "bar"}</fest:script>
<fest:each iterate="obj" index="i">
    <fest:value>i</fest:value>=<fest:value>obj[i]</fest:value><!-- foo=bar -->
</fest:each>
<fest:each iterate="obj" index="i" value="v">
    <fest:value>i</fest:value>=<fest:value>v</fest:value><!-- foo=bar -->
</fest:each>
```

### fest:for

Выполняет итерацию по массиву или числовому ряду.

```xml
<fest:script>json.items = ['a', 'b', 'c']</fest:script>
<fest:for iterate="json.items" index="i">
    <fest:value>json.items[i]</fest:value><!-- abc -->
</fest:for>
<fest:for iterate="json.items" index="i" value="v">
    <fest:value>v</fest:value><!-- abc -->
</fest:for>
<fest:for from="1" to="5" index="i">
    <fest:value>i</fest:value><!-- 12345 -->
</fest:for>
```

### fest:if

Условный оператор.

```xml
<fest:if test="true">
    It's true!
</fest:if>
```

### fest:choose, fest:when, fest:otherwise

Ветвление. Если ни у одного `fest:when` условие не выполнено, будет выбрана ветвь `fest:otherwise`.

```xml
<fest:choose>
    <fest:when test="1">
        <fest:text>one</fest:text>
    </fest:when>

    <fest:when test="2">
        <fest:text>two</fest:text>
    </fest:when>

    <fest:otherwise>
        <fest:text>More than 2</fest:text>
    </fest:otherwise>
</fest:choose>
```

## Остальные конструкции

### fest:cdata

Служит для вывода блока CDATA.

```xml
<script>
    <fest:cdata>
        <![CDATA[alert ("2" < 3);]]>
    </fest:cdata>
</script>
```

### fest:comment

Выводит HTML комментарий.

```xml
<fest:comment>comment</fest:comment>
```

### fest:doctype

Задает DOCTYPE генерируемой страницы.

```xml
<fest:doctype>html</fest:doctype>
```

### fest:script

Служит для выполнения произвольного JavaScript.

```xml
<fest:script>
    <![CDATA[
        json.script = 2 < 3;
    ]]>
</fest:script>
```

Содержимое `fest:script` можно загрузить из файла, указав в атрибуте `src` путь к нему.

```xml
<fest:script src="script.js"/>
```

### fest:include

Вставляет содержимое другого шаблона с заданным контекстом.

```xml
<fest:script>json.list = ['a', 'b', 'c'];</fest:script>
<fest:include context="json.list" src="./include_foreach.xml"/>
```

### fest:insert

Выводит содержимое файла:

```xml
<style type="text/css">
    <fest:insert src="style.css"/>
<style>
```

# Примеры

## Использование

Компиляция с помощью compile():
```javascript
var fest = require('fest');

var data = {name: 'Jack "The Ripper"'},
    template = './templates/basic.xml';

var compiled = fest.compile(template, {beautify: false}),
    template = (new Function('return ' + compiled))();

console.log(template(data));
```

Компиляция с последующей отрисовкой с помощью render():
```javascript
var fest = require('fest');

var data = {name: 'Jack "The Ripper"'},
    template = './templates/basic.xml';

console.log(fest.render(template, data, {beautify: false}));
```

basic.xml
```xml
<?xml version="1.0"?>
<fest:template xmlns:fest="http://fest.mail.ru" context_name="json">
    <h1>Hello,<fest:space/><fest:value output="text">json.name</fest:value></h1>
    <!-- По умолчанию все значения fest:value экранируются -->
    <!--
        Необходимо использовать fest:space или
        fest:text для явного указания строк с пробелами
    -->
</fest:template>
```

Результат:

```html
<h1>Hello, Jack "The Ripper"</h1>
```

## Вложенные шаблоны

Данные на вход:
```javascript
var data = {
    people: [
        {name: 'John', age: 20},
        {name: 'Mary', age: 21},
        {name: 'Gary', age: 55}
    ],
    append: '>>'
}
```

foreach.xml (основной шаблон):
```xml
<?xml version="1.0"?>
<fest:template xmlns:fest="http://fest.mail.ru" context_name="json">

    <!-- Контекст можно передавать во вложенные шаблоны -->
    <fest:include context_name="json" src="./person.xml"/>

    <!-- Значением iterate может быть любое js-выражение -->
    <fest:for iterate="json.people.reverse()" index="i">
        <!-- Передаваемые значения будут доступны в контексте params -->
        <fest:get name="person">json.people[i]</fest:get>
    </fest:for>
</fest:template>
```

person.xml:
```xml
<?xml version="1.0"?>
<fest:template xmlns:fest="http://fest.mail.ru" context_name="json">

    <!--
        Используем set для объявления блока,
        который используем в родительском шаблоне
    -->
    <fest:set name="person">
        <p>
            <fest:script><![CDATA[
                var first = params.name[0],
                    other = params.name.slice(1);
            ]]></fest:script>
            <fest:value>json.append</fest:value>
            <strong>
                <fest:value>first</fest:value>
            </strong>
            <fest:value>other</fest:value>
        </p>
    </fest:set>
</fest:template>
```

Результат:
```html
<p>&gt;&gt;<strong>G</strong>ary</p>
<p>&gt;&gt;<strong>M</strong>ary</p>
<p>&gt;&gt;<strong>J</strong>ohn</p>
```

## Использование set и get

```xml
<?xml version="1.0"?>
<fest:template xmlns:fest="http://fest.mail.ru" context_name="json">
    <fest:set name="host">http://e.mail.ru</fest:set>
    <fest:set name="all">msglist</fest:set>
    <fest:set name="new">sentmsg?compose</fest:set>

    <fest:set name="all_link">
        <fest:get name="host"/>/<fest:get name="all"/>
    </fest:set>

    <fest:set name="new_link">
        <fest:get name="host"/>/<fest:get name="new"/>
    </fest:set>

    <ul>
        <!-- fest:attribute добавляет параметр к родительскому тегу -->
        <li><a>
            <fest:attributes>
                <fest:attribute name="href"><fest:get name="all_link"/></fest:attribute>
            </fest:attributes>
            Все сообщения
        </a></li>

        <li><a>
            <fest:attributes>
                <fest:attribute name="href"><fest:get name="new_link"/></fest:attribute>
            </fest:attributes>
            Написать письмо
        </a></li>
    </ul>
</fest:template>
```

Результат:

```html
<ul>
    <li><a href="http://e.mail.ru/msglist">Все сообщения</a></li>
    <li><a href="http://e.mail.ru/sentmsg?compose">Написать письмо</a></li>
</ul>
```

## Интернационализация

### fest:plural

По умолчанию доступна поддержка плюрализации для русского и английского языка. В параметрах `fest.compile` можно передать любую другую функцию плюрализации.

```xml
<fest:plural select="json.n">один рубль|%s рубля|%s рублей</fest:plural>
```
Или англоязычный вариант:

```xml
<fest:plural select="json.n">one ruble|%s rubles</fest:plural>
```

Чтобы вывести символ “%” внутри тега `fest:plural` используйте “%%”:

```xml
<fest:plural select="json.n">…1%%…|…%s%%…|…%s%%…</fest:plural>
```

### fest:message и fest:msg

Позволяет указать границы фразы для перевода и контекст для снятия многозначности. Например,

```xml
<fest:message context="растение">Лук</fest:message>
<fest:message context="оружие">Лук</fest:message>
```

Для каждого `fest:message`, `fest:msg`, обычного текста, заключенного между XML тегами (опция `auto_message`), или текстового значения некоторых атрибутов компилятор вызывает функцию `events.message` (если такая была указана в параметрах). Данный механизм используется в `fest-build` утилите для построения оригинального PO-файла.

Пример вызова `fest-build` для создания PO-файла:

```
$ fest-build --dir=fest --po=ru_RU.po --compile.auto_message=true
```

Пример компиляции локализованных шаблонов:

```
$ fest-build --dir=fest --translate=en_US.po
```

Пример компиляции одного шаблона:

```
$ fest-compile path/to/template.xml
$ fest-compile --out=path/to/compiled.js path/to/template.xml
$ fest-compile --out=path/to/compiled.js --translate=path/to/en_US.po path/to/template.xml
```

## Contribution

Необходимо установить [Grunt](http://gruntjs.com):

```
$ git clone git@github.com:mailru/fest.git
$ cd fest
$ sudo npm install -g grunt-cli
$ npm install
$ grunt
```

Grunt используется для валидации JS (тестов) и запуска тестов. Перед отправкой пулл-риквеста убедись, что успешно выполнены `git rebase master` и `grunt`.

Если необходимо пересобрать шаблоны spec/expected, то выполните:

```
$ ./bin/fest-build --dir=spec/templates --exclude='*error*' --compile.beautify=true --out=spec/expected/build/initial
$ ./bin/fest-build --dir=spec/templates --exclude='*error*' --compile.beautify=true --out=spec/expected/build/translated --translate=spec/templates/en_US.po
```
