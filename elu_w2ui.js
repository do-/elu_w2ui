w2utils.settings = {
    weekStarts       : "M",
    "dataType"       : "JSON",
    "locale"         : "ru-RU",
    "dateFormat"     : "dd.mm.yyyy",
    "timeFormat"     : "h24",
    "currency"       : "^[-+]?[0-9]*[\\,]?[0-9]+$",
    "currencyPrefix" : "",
    "currencySuffix" : " р.",
    "currencyPrecision": 2,
    "decimalSymbol"  : ",",
    "groupSymbol"    : " ",
    "float"          : "^[-]?[0-9]*[\\.]?[0-9]+$",
    "shortmonths"    : ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    "fullmonths"     : ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    "shortdays"      : ["П", "В", "С", "Ч", "П", "С","В"],
    "fulldays"       : ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
    "phrases" : {
        "Add new record": "Добавить новую запись",
        "Add New": "Добавить",
        "All Fields": "Все поля",
        "Are you sure you want to delete selected records?": "Вы действительно хотите удалить выделенные записи?",
        "Attach files by dragging and dropping or Click to Select": "Перетащите файлы сюда или нажмите чтобы выбрать",
        "begins with": "начинается с",
        "begins": "начинается",
        "before": "до (включительно)",
        "after": "начиная с",
        "between": "между",
        "buffered": "буфер",
        "Clear Search": "Очистить поиск",
        "Column": "Колонка",
        "Confirmation": "Подтверждение",
        "contains": "содержит",
        "Delete Confirmation": "Подтверждение удаления",
        "Delete selected records": "Удалить выбранные записи",
        "Delete": "Удалить",
        "Edit selected record": "Изменить выделенную запись",
        "Edit": "Изменить",
        "Empty list": "Пустой список",
        "ends with": "заканчивается на",
        "ends": "заканчивается",
        "Hide": "Скрыть",
        "in": "в списке",
        "is": "равняется",
        "Loading...": "Загрузка...",
        "Multi Fields": "Несколько полей",
        "Multiple Fields": "Несколько полей",
        "more than": "более или ровно",
        "less than": "менее или ровно",
        "Name": "Имя",
        "Size": "Размер",
        "Type": "Тип",
        "Modified": "Дата изменения",
        "No items found": "Ничего не найдено",
        "No": "Нет",
        "none": "пусто",
        "null": "пусто",
        "Not a float": "Не натуральное число",
        "Not a hex number": "Не шестнадцатеричное число",
        "Not a valid date": "Неверный формат",
        "Not a valid email": "Неверный e-mail",
        "Not alpha-numeric": "Не буквенно-цифровой текст",
        "Not an integer": "Не целое число",
        "Not in money format": "Не денежный формат",
        "not in": "не в списке",
        "Notification": "Уведомление",
        "of": "из",
        "Ok": "OK",
        "Open Search Fields": "Открыть поля поиска",
        "Record ID": "Запись",
        "Records": "Записей",
        "Refreshing...": "Обновление...",
        "Reload data in the list": "Обновить список",
        "Remove": "Удалить",
        "Required field": "Обязательное поле",
        "Reset Column Size": "Восстановить размер колонок",
        "Reset": "Очистить",
        "Return data is not in JSON format. See console for more information.": "Возвращенные данные не в формате JSON. Смотрите в консоли ошибки.",
        "Save changed records": "Сохранить измененные записи",
        "Save": "Сохранить",
        "Saving...": "Сохранение",
        "Search took": "Поиск занял",
        "Search": "Поиск",
        "Search...": "Поиск...",
        "sec": "сек",
        "Select Search Field": "Выбрать поля поиска",
        "selected": "выделено",
        "Server Response": "Ответ сервера",
        "Show": "Показать",
        "Show/hide columns": "Показать/скрыть колонки",
        "Skip": "Пропустить",
        "Sorting took": "Сортировка заняла",
        "Toggle Line Numbers": "Вкл/Выкл. номера строк",
        "Yes": "Да",
        "Yesterday": "Вчера",
        "Line #": "Номер строки #",
        "Save Grid State": "Сохранить состояние таблицы",
        "Restore Default State": "Восстановить состояние таблицы",
        "Type to search...": "Введите строку поиска...",
        "Your remote data source record count has changed, reloading from the first record.": "Данные изменены на сервере. Пожалуйста, перезагрузите страницу"
    }
}

function dia2w2uiVoc (records) {

    $.each (records, function () {

        this.text = this.label

        delete this.label

    })

    return records

}

function dia2w2uiDrop (e) {e.data = {

    status: "success",

    records: e.data.content.map (function (i) {return {id: i.id, text: i.label}})

}}

function dia2w2uiRecords (records) {

    $.each (records, function () {

        if (this.id == undefined && this.uuid != undefined) this.id = this.uuid

        this.recid = this.id

        if (this._status) {

            if (!this.w2ui) this.w2ui = {}

            this.w2ui.class = 'status_' + this._status

            delete this._status

        }

        for (k in this) {

            var v = this [k]; if (!v) continue;

            if (typeof v === 'object') {

                for (j in v) this [k + '.' + j] = v [j] // org: {label: 'foo'} -> org_label: 'foo'

            }
            else if (k.substr (0, 2) == 'dt') {

                if (!v) continue

                if (v.length == 10) this [k] = dt_dmy (v)

                if (v.length == 19 || v.length == 26) this [k] = dt_dmyhms (v)

            }

            var kk = k.split ('.')

            if (kk.length == 2) {

                if (!this [kk[0]]) this [kk[0]] = {}

                this [kk[0]] [kk[1]] = v

            }

        }

    })

    if (records.length > 0) {

        var last = records [records.length - 1]

        if (last.is_total == '1' && last.def && last.def.name == '_root' && !last.w2ui) {

            last.recid = 'ИТОГО'

            last.w2ui = {summary: true}

        }

    }

    return records

}

function dia2w2ui (e) {

    if (e.xhr.status != 200) return $_DO.apologize ({jqXHR: e.xhr})

    var content = JSON.parse (e.xhr.responseText).content

    var data = {
        status : "success",
        total  : content.cnt
    }

    var total = content.total

    delete content.cnt
    delete content.portion
    delete content.total

    for (var key in content) {
        data.records = dia2w2uiRecords (content [key])
        if (total) data.summary = [total]
        e.xhr.responseText = JSON.stringify (data)
    }

}

function w2injectSearchValues (e) {

    $('.w2ui-grid-searches input[rel=search]').each (function () {

        if (!/id/.test (this.name)) return

        if (this.name == e.target.name) return false

        var v = $(this).data ('selected')

        if (!v || !v.length) return

        e.postData [this.name] = v.map (function (i) {return i.id})
        e.postData [this.name + '__op'] = $('#' + this.id.replace ('_field_', '_operator_')).val ()

    })

}

w2utils.unlockAll = function () {

    w2utils.unlock ($('div.w2ui-lock').parent ())

}

$.fn.w2relayout = function (o) {
    
    for (let panel of o.panels) {
    	let tabs = panel.tabs; if (!tabs) continue
    	if (tabs.tabs) tabs = tabs.tabs
    	for (let tab of tabs) if (!('tooltip' in tab)) tab.tooltip = ""
    }

    if (w2ui [o.name]) w2ui [o.name].destroy ()
    
    if (!o.onRender) o.onRender = function (e) {

    	var layout = this

	    for (let panel of layout.panels) {
	    
			let tabs = panel.tabs; if (!tabs) continue
			let key  = tabs.name

			tabs.onClick = function (e) {

				let name = e.tab.id

				layout.content (panel.type, '')
				layout.lock    (panel.type, 'Загрузка...', true)

				$_LOCAL.set (key, name) 								

				show_block (name)

			}

			e.done (function () {

				let id = $_LOCAL.get (key)

				if (!tabs.get (id)) id = tabs.tabs [0].id

				tabs.click (id)

			})
		
		}
    	
    }

    return this.w2layout (o)

}

$.fn.w2reform = function (o) {

    function refreshButtons () {
        var $box = $(this.box)
        var data = this.record
        eachAttr ($box, 'data-off', data, function (me, n, v) {if ( v) me.hide (); else me.show ()})
        eachAttr ($box, 'data-on',  data, function (me, n, v) {if (!v) me.hide (); else me.show ()})
        refill (data, $('.w2ui-buttons', $box))
    }

    function setRefreshButtons (e) {

        var r = w2ui [e.target].record
            
        if (r) $.each (o.fields, function () {
            if (this.type == 'date') {
                var v = r [this.name]
                if (!v) return
                if (v instanceof Date) v = v.toISOString ()
                r [this.name] = dt_dmy (v)
            }
            else if (this.type == 'datetime') {
                var v = r [this.name]
                if (!v) return
                if (v instanceof Date) v = v.toISOString ()
                r [this.name] = dt_dmyhm (v)
            }
        })

        e.done (refreshButtons)
        
    }

    function andSetRefreshButtons (f) {
        return !f ? setRefreshButtons : function (e) {
            f (e)
            setRefreshButtons (e)
        }
    }
    
    if (!o.actions) {

        o.onRefresh = andSetRefreshButtons (o.onRefresh)

        if (o.tabs) {
            if (Array.isArray (o.tabs)) o.tabs = {tabs: o.tabs}
            o.onClick = andSetRefreshButtons (o.onClick)
        }

    }
    
    let obsrevedFields = o.fields.filter (f => f.onChange); if (obsrevedFields.length) {
    
    	let n2h = {}; for (f of obsrevedFields) n2h [f.name] = f.onChange
    
    	let oldOnChange = o.onChange
    
    	o.onChange = function (e) {
    	
    		if (oldOnChange) oldOnChange (e)
    	
    		let h = n2h [e.target]
    		
    		if (!h) return
    		
    		var v = e.value_new
    		    		
    		h ('id' in v ? v.id : v)
    		
    	}

    }

    if (w2ui [o.name]) w2ui [o.name].destroy ()

    var f = this.w2form (o)

    f.on('refresh:after', function() {

        this.fields.forEach(function(f) {

            if (f.type == 'checkbox') $('[name="' + f.name + '"]').prop('disabled', f.disabled)

        })

    })

    return f

}

$.fn.w2regrid = function (o) {

    if (w2ui [o.name]) w2ui [o.name].destroy ()
    
    if (o.src) {
    
    	var src = Array.isArray (o.src) ? o.src : [o.src]
    	
    	o.url = $_SESSION.get ('dynamicRoot') + '/?type=' + src [0]
    	
    	if (src.length > 1) o.postData = src [1]
    
    }

    if (o.url && !o.onLoad) o.onLoad = dia2w2ui

    if (!$_REQUEST.id && !('onDblClick' in o)) o.onDblClick = function (e) {

        var r = this.get (e.recid)

        openTab ('/' + $_REQUEST.type + '/' + (r.uuid || r.id))

    }

    if (!o.show) o.show = {}

    if (!('skipRecords' in o.show)) o.show.skipRecords = false

    $.each (o.columns, function () {

        var col = this

        var fld = col.field

        var voc = col.voc; if (voc) {

            if (!this.render) this.render = function (i) {

                var v = i [fld];

                if (v == null) v = ''

                if (Array.isArray (v)) return v.map (function (id) {return voc [id]}).sort ().join (', ')

                return voc [v] || ''

            }

            if (this.editable) this.editable.items = voc.items

        }

    })

    if (o.searches) o.searches.forEach(function(item) {

        if (item.type === 'text' && !item.operator) item.operator = 'contains'

    })
    
    return this.w2grid (o)

}

$.fn.w2uppop = function (o, done) {

    var $this = (this)

    o.width  = $this.attr ('data-popup-width')
    o.height = $this.attr ('data-popup-height')
    o.title  = $this.attr ('data-popup-title')

    if (!$('button[data-hotkey="Ctrl-Enter"]').length) {
	    var $button = $('button', $this)
	    if ($button.length == 1) $button.attr ('data-hotkey', 'Ctrl-Enter')
    }    
    
	o.onOpen = function (e) {e.done (done)}

    return this.w2popup ('open', o)

}

function add_vocabularies (data, o) {

    for (var name in o) {

        var raw = data [name]; if (!raw) continue

        var idx = {items: raw.filter (function (r) {var f = r.fake; return !f || parseInt (f) == 0})}; $.each (raw, function () {idx [this.id] = this.text = this.label})

        data [name] = idx

    }

}

function normalizeScalarValue (s, type) {

    if (s == '') return null
    
    switch (type) {
    
        case 'int':      
            return s.replace (/[\D]/g, '')            
            
        case 'date':     
            return s.replace (/^(\d\d)\.(\d\d)\.(\d\d\d\d)$/, function (_, d, m, y) {return y + '-' + m + '-' + d})            
            
        case 'datetime': 
            return s.replace (/^(\d\d)\.(\d\d)\.(\d\d\d\d) (\d\d?)\:(\d\d)$/, function (_, d, m, y, hrs, mnts) {return y + '-' + m + '-' + d + ' ' + (hrs.length == 1 ? '0' : '') + hrs + ':' + mnts + ':00'})
            
        case 'float':                
        case 'money':
            return s.replace (/ /g, '').replace (',', '.')            
            
        default: 
            return s
            
    }

}

function normalizeValue (raw, type) {

    if (raw == null) return null
    
    switch (type) {    
        case 'file':     return raw           
        case 'checkbox': return (raw ? 1 : 0)            
        case 'list':     return raw.id            
        case 'enum':     return raw.map (function (i) {return i.id})            
        default:         return normalizeScalarValue (String (raw).trim (), type.split (':') [0])
    }

}

var matchHtmlRegExp = /["'&<>]/;
function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);
  if (!match) return str
  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;
  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }
    if (lastIndex !== index) html += str.substring(lastIndex, index)
    lastIndex = index + 1;
    html += escape;
  }
  return lastIndex !== index ? html + str.substring(lastIndex, index) : html
}

w2obj.grid.prototype.toArray = function (iterator_cb, done_cb) {

    function make_rows(rows) {

        var fields_names = fields.map(function(i) { return i.name })

        return rows.map(function(row) {

            var keys   = Object.keys(row)
            var values = []

            keys.forEach(function(key) {

                var value = row[key]

                if (value === null || typeof value === 'undefined' || value.constructor.name !== 'Object') return

                Object.keys(value).forEach(function(sub_key) {

                    row[key + '.' + sub_key] = value[sub_key]

                })

            })

            fields_names.forEach(function(key) {

                var field = fields.find(function(i) { return i.name === key })
                var value = row[key]

                if (typeof field.render === 'function') value = field.render(row)

                if (/^dt/.test(key) && value) {

                    if (value.length == 10) value = dt_dmy(value)
                    if (value.length == 19 || value.length == 26) value = dt_dmyhms(value)

                }

                if (value === null || typeof value === 'undefined') value = ''

                values.push(value)

            })

            return values

        })

    }

    function iterator(offset) {

        var ajaxData = {
            selected    : [],
            offset      : offset,
            limit       : grid.limit,
            search      : grid.searchData,
            searchLogic : grid.last.logic,
            sort        : $.isEmptyObject(grid.sortData) ? undefined : grid.sortData
        }

        ajaxData = Object.assign(ajaxData, grid.postData)

        $.ajax({
            url         : grid.url,
            data        : JSON.stringify(ajaxData),
            type        : 'POST',
            dataType    : 'text',
            contentType : 'application/json',
            success     : function(text) {

                var data = JSON.parse(text)
                data = data.content

                var cnt     = data.cnt
                var portion = data.portion || grid.limit
                var total   = data.total

                delete data.cnt
                delete data.portion
                delete data.total

                var rows_key = Object.keys(data)[0]
                var _rows    = make_rows(data[rows_key])

                rows = rows.concat(_rows)

                if (typeof iterator_cb === 'function') iterator_cb({ offset: offset, total: cnt, portion: portion })

                if (_rows.length) iterator(offset + portion)
                else done(total)

            }
        })
    }

    function done(total) {

        done_cb({ head: head, fields: fields, rows: rows, total: total })

    }

    var grid = this

    var column_groups = grid.columnGroups
    var columns = grid.columns

    var head   = []
    var fields = []

    if (column_groups.length) {

        var columns_index = 0

        head = [ [], [] ]

        column_groups.forEach(function(column_group) {

            var column

            if (column_group.hidden) {

                columns_index += column_group.master ? 1 : (column_group.span || 1)
                return

            }

            if (column_group.master) {

                column = {
                    title   : columns[columns_index].caption,
                    colspan : column_group.span || 1,
                    rowspan : 2
                }

                var field = {
                    name   : columns[columns_index].field,
                    render : columns[columns_index].render
                }

                head[0].push(column)
                fields.push(field)

                columns_index++

            } else {

                var children = columns
                    .slice(columns_index, columns_index + column_group.span)
                    .filter(function(i) { return !i.hidden })

                column = {
                    title    : column_group.caption,
                    colspan  : children.length
                }

                head[0].push(column)
                head[1] = head[1].concat( children.map(function(i) { return { title: i.caption } }) )

                fields = fields.concat(
                    children.map(function(i) { return { name: i.field, render: i.render } })
                )

                columns_index += column_group.span

            }

        })

    } else {

        columns = columns.filter(function(i) { return !i.hidden })

        head   = [ null, columns.map(function(i) { return { title: i.caption } }) ]
        fields = columns.map(function(i) { return { name: i.field, render: i.render } })

    }

    var rows = make_rows(grid.records)

    if (grid.url) iterator(grid.records.length)
    else done(grid.summary[0])

}

w2obj.grid.prototype.saveAsXLS = function (fn, cb) {

    var grid = this

    grid.lock ('Экспорт данных...')

    if (!fn) fn = $('title').text ()
    fn += '.xls'

    function value(val, isNumber) {

        if (
            typeof val === 'undefined'
            || val === null
        ) return ''

        if (isNumber) val = String(val).replace ('.', ',')

        return escapeHtml(val)

    }

    grid.toArray(
        function(data) {

            var percent

            if (grid.total != -1) {

                percent = Math.round (100 * data.offset / grid.total)
                if (percent > 100) percent = 100

            }

            $('div.w2ui-lock-msg').text (grid.total == -1 ? 'Обработано ' + data.offset + ' строк' : percent + '%...')

        },
        function(data) {

            var html = '<html><head><meta charset=utf-8><style>td{mso-number-format:"\@"} td.n{mso-number-format:General}</style></head><body><table border>'

            for (var i = 0; i <= 1; i++) {

                if (!data.head[i]) continue

                html += '<tr>'

                data.head[i].forEach(function(th) {

                    var colspan = th.colspan || 1
                    var rowspan = th.rowspan || 1

                    html += '<th colspan="' + colspan + '" rowspan="' + rowspan + '">' + th.title.trim() + '</th>'

                })

                html += '</tr>'

            }

            data.rows.forEach(function(row) {

                html += '<tr>'

                row.forEach(function(val, idx) {

                    var field    = data.fields[idx]
                    var isNumber = field.render === 'money' || /^float/.test(field.render)
                    var classes  = isNumber ? ' class="n"' : ''

                    html += '<td' + classes + '>' + value(val, isNumber) + '</td>'

                })

                html += '</tr>'

            })

            if (data.total) {

                html += '<tr>'

                data.fields.forEach(function(field) {

                    var isNumber = field.render === 'money' || /^float/.test(field.render)
                    var classes  = isNumber ? ' class="n"' : ''

                    html += '<td' + classes + '><b>' + value(data.total[field.name], isNumber) + '</b></td>'

                })

                html += '</tr>'

            }

            html += '</table></body></html>'

            grid.unlock ()

            html.saveAs (fn)

            if (typeof cb === 'function') cb()

        }
    )

}

w2obj.form.prototype.values = function () {

    var result = {}
    var r = this.record

    $.each (this.fields, function () {

        var f = this
        var n = f.name
        result [n] = normalizeValue (r [n], f.type)

    })

    return result

};

(function(){

    let _do_apologize = $_DO.apologize

    $_DO.apologize = function (o, fail) {

        w2utils.unlockAll ()

        _do_apologize (o, fail)

    }
    
})();

function w2field_voc(data) {

    var $view = $('<span> \
        <div id="w2ui-field-voc-page"> \
            <div id="w2ui-field-voc-select-grid"></div> \
            <div>Выбранные элементы</div> \
            <div id="w2ui-field-voc-selected-grid"></div> \
        </div> \
        <div id="w2ui-field-voc-page-buttons"> \
            <button class="w2ui-btn">Использовать выбранные</button> \
            <button class="w2ui-btn">Очистить выбранные значения</button> \
        </div> \
    </span>');

    var _default = {
        columns: [{
            field   : 'label',
            caption : '',
            size    : '100%'
        }],
        toolbar: [],
        fieldLabelKey : 'label',
        multiselect   : true
    };

    var options  = $.extend(_default, data)
        , selected = options.fieldID ? $('#' + options.fieldID).data('selected') : options.selectedIds || []
        , size     = {
            h : $(window).height() * 0.9,
            w : $(window).width()  * 0.9
        }
        , showGridHeaders = !(options.columns.length === 1 && !options.columns[0].caption)
        , w2SelectedGrid;

    if (options.onInit) options.onInit.call(this, options);

    $view.eq(0).attr({
        'data-popup-height' : size.h,
        'data-popup-width'  : size.w,
        'data-popup-title'  : options.title
    });

    if (options.gridID) {
        $('#w2ui-overlay-' + options.gridID + '-searchOverlay')
            .data('options')
            .onHide = function() { return false; };
    }

    function returnValues (e) {

        var values
            , $field;

        if (options.multiselect) {

             values = w2SelectedGrid.records.map(function(i) {
                i.text = i[options.fieldLabelKey];
                return i;
            });

        } else {

            values = [this.get(e.recid)];
            values[0].text = values[0][options.fieldLabelKey];

        }

        if (options.fieldID) {

            $field = $('#' + options.fieldID);

            // $('.w2ui-field-helper.w2ui-list', $field.parent()).remove();

            $field.w2field(
                'voc',
                $.extend($('#' + options.fieldID).data('w2field').options, { selected: values })
            );

            if ($field.data('w2field').onAdd) $field.data('w2field').onAdd();

        }

        if (!options.fieldID && options.onAdd) options.onAdd(values);

        if (options.form) {

            w2ui[options.form].record[options.fieldID] = options.multiselect ? values : values[0].id;

            w2ui[options.form].fields.forEach(function(item) {

                if (item.field !== options.fieldID) return;
                item.options.selected = values;

            });
        }

        popup.close();

        setTimeout(function () {
            $field && $field.w2field().refresh();
        }, 500);

    }

    var selectedIds = selected.length ? selected.map(function(item) { return item.id.toString(); }) : [];

    function refreshGrids(ids, action, requestOff) {

        if (action === 'add') selectedIds = selectedIds.concat(ids);
        else selectedIds = selectedIds.filter(function(id) { return !ids.includes(id); });

        selectedIds = selectedIds.map(function(id) { return id.toString(); });

        if (options.multiselect) {
            w2ui.selectedGrid.records = w2ui.selectGrid.allRecords.filter(function(record) { return selectedIds.includes(record.id.toString()); });
            w2ui.selectedGrid.refresh();
        }

        w2ui.selectGrid.records = w2ui.selectGrid.allRecords.filter(function(record) { return !selectedIds.includes(record.id.toString()); });
        w2ui.selectGrid.refresh();

    }

    function addToolbarToSearch() {

        var types = ['check', 'radio', 'menu-check', 'menu-radio']
            , toolbar = w2ui.selectGrid_toolbar.items.filter(function(i) { return types.includes(i.type); })
            , search  = w2ui.selectGrid.postData.search.filter(function(i) { return !toolbar.find(function(ii) { return ii.id == i.field  }); });

        toolbar.forEach(function(item) {

            if (item.checked || (Array.isArray(item.selected) ? item.selected.length : item.selected)) switch(item.type) {

                case 'menu-radio':
                    search.push({
                        field    : item.id,
                        type     : 'text',
                        operator : 'is',
                        value    : item.selected
                    });
                    break;

                case 'menu-check':
                    search.push({
                        field    : item.id,
                        type     : 'enum',
                        operator : 'in',
                        value    : item.items.filter(function(i) { return item.selected.includes(i.id); }),
                        svalue   : item.selected
                    });
                    break;

                default:
                    search.push({
                        field    : item.id,
                        type     : 'text',
                        operator : 'is',
                        value    : 1
                    });

            }

        });

        w2ui.selectGrid.postData.search = search;

    }

    var popup = $view.w2uppop(
        {
            showMax   : true
        },
        function() {

            var $selectGrid   = $('#w2ui-field-voc-select-grid'),
                $selectedGrid = $('#w2ui-field-voc-selected-grid'),
                $buttons      = $('button', $selectGrid.parent().next()),
                $addbutton    = $buttons.eq(0),
                $clearButton  = $buttons.eq(1),
                gridHeight    = options.multiselect
                    ? size.h / 2 - 82
                    : size.h - 110;

            $selectGrid.css({ height: gridHeight });

            if (options.multiselect) {

                $selectedGrid.css({ height: gridHeight });

                w2SelectedGrid = $selectedGrid.w2regrid({
                    name: 'selectedGrid',
                    show: {
                        toolbar       : false,
                        columnHeaders : false
                    },
                    records: selected.map(function(item) { if (!item.recid) item.recid = item.id; return item; }),
                    columns: (function() {

                        var columns = options.columns.slice();

                        if (columns.length > 1) columns.unshift({ field : '', caption : '', size : '24px' });
                        return columns;

                    })(),
                    onDblClick: function(e) {

                        var ids = [e.recid.toString()];

                        this.selectNone();
                        refreshGrids(ids, 'remove', true);

                        if (!selectedIds.length) $clearButton.attr('disabled', true);

                    }
                });

                w2SelectedGrid.refresh();

            } else {

                $buttons.remove();
                $selectedGrid.prev().remove();

            }

            if (w2SelectedGrid && !w2SelectedGrid.records.length) $clearButton.attr('disabled', true);

            if (!options.postData) options.postData = {};
            if (!options.postData.search) options.postData.search = [];

            if (options.name)
                options.postData.search = options.postData.search.filter(function(i) { return i.field != options.name; });

            var toolbar = [];

            if (options.toolbar) toolbar = options.toolbar.reduce(function(ar, item) {

                if (['check', 'radio', 'menu-check', 'menu-radio', 'break'].includes(item.type)) {

                    if (typeof item.checked === 'function') item.checked = item.checked();

                    if (item.checked || (Array.isArray(item.selected) ? item.selected.length : item.selected)) switch(item.type) {

                        case 'menu-radio':
                            options.postData.search.push({
                                field    : item.id,
                                type     : 'text',
                                operator : 'is',
                                value    : item.selected
                            });
                            break;

                        case 'menu-check':
                            options.postData.search.push({
                                field    : item.id,
                                type     : 'enum',
                                operator : 'in',
                                value    : item.items.filter(function(i) { return item.selected.includes(i.id); }),
                                svalue   : item.selected
                            });
                            break;

                        default:
                            options.postData.search.push({
                                field    : item.id,
                                type     : 'text',
                                operator : 'is',
                                value    : 1
                            });

                    }

                    ar.push(item);

                }

                return ar;

            }, []);

            var hiddenIds = [];

            var searches = options.columns
                .filter(function(column) { return !column.sOff; })
                .map(function(column) { return { field: column.sField || column.field, type: column.type || 'text', caption : column.caption }; });

            var requestLimit;

            var w2SelectGrid,
                w2SelectGridOptions = {
                    name: 'selectGrid',
                    show: {
                        toolbar        : true,
                        selectColumn   : options.multiselect,
                        toolbarColumns : false,
                        toolbarSearch  : false,
                        columnHeaders  : showGridHeaders
                    },
                    toolbar: {
                        items: (function() {

                            if (!options.multiselect) return toolbar;

                            var items = toolbar;

                            if (items.length) items.push({ type: 'break' });

                            items.push(
                                { type: 'button', id: 'select', caption: 'Добавить выбранные' }
                            );

                            return items;

                        })(),
                        onClick: function(e) {
                            if (e.target === 'select') {
                                var ids = this.owner.getSelection();

                                refreshGrids(ids, 'add');
                                $clearButton.attr('disabled', false);

                                this.owner.selectNone();
                                this.disable('select');

                            }
                        }
                    },
                    searches    : searches,
                    columns     : options.columns,
                    multiSelect : options.multiselect,
                    postData    : options.postData,

                    onDblClick: function(e) {
                        if (options.multiselect) {
                            var ids = [e.recid.toString()];

                            this.selectNone();
                            refreshGrids(ids, 'add');

                            $clearButton.attr('disabled', false);

                        } else {
                            returnValues.call(this, e);
                        }
                    },
                    onSelect: function(e) {
                        this.toolbar.enable('select');
                    },
                    onUnselect: function(e) {
                        if (this.getSelection().length === 1 && this.getSelection()[0] == e.recid) this.toolbar.disable('select');
                    },
                    onSearch: function(e) {
                        if (this.url)
                            this.allRecords = options.multiselect ? w2ui.selectedGrid.records : [];

                        e.searchData.forEach(function(field) {
                            if (field.type === 'text') field.operator = 'contains';
                        });

                        this.postData.search = e.searchData;

                        addToolbarToSearch();

                    },
                    onRequest : function (e) {

                        requestLimit = e.postData.limit;

                        e.postData.limit = e.postData.limit + selectedIds.length;

                    },
                    onLoad: function(e) {

                        var json       = JSON.parse(e.xhr.responseText),
                            recordsKey = options.recordsKey;

                        if (!recordsKey) {
                            var excludeKeys = ['cnt', 'portion', 'total'],
                                keys = Object.keys(json.content).filter(function(i) { return !excludeKeys.includes(i) })

                            if (keys.length !== 1) throw('No records key');
                            else recordsKey = keys[0];
                        }

                        if (this.searches) {
                            this.searches = this.searches.map(function(i) {
                                if (json.content[i.dataKey]) i.options.items = i.dataCb ? i.dataCb(json.content[i.dataKey]) : json.content[i.dataKey];
                                return i;
                            })
                        }

                        var data = {
                                status : json.status,
                                total  : -1,
                                records: []
                                //json.content.cnt,
                        };

                        var records = dia2w2uiRecords(json.content[recordsKey]);

                        if (!this.allRecords) this.allRecords = [];

                        this.allRecords = this.allRecords.concat(records);
                        this.allRecords = this.allRecords.reduce(function(ar, item) {

                            var index = ar.findIndex(function(i) { return i.id == item.id; });

                            if (index < 0) ar.push(item);
                            return ar;

                        }, []);

                        var cnt = 0;

                        records = records.filter(function(i) { return !selectedIds.includes(i.id.toString()) })

                        for (var i = records.length - 1; i >= requestLimit; i --)
                            records.pop ()

                        data.records = records

                        delete this.postData.filter;

                        if (json.content.total) data.summary = json.content.total;

                        e.xhr.responseText = JSON.stringify(data);

                    }
                };

            // URL родительского элемента может динамически меняться
            if (options.url) {
                try {
                    w2SelectGridOptions.url = $('#' + options.fieldID).w2field().options.url
                } catch (e) {}
                w2SelectGridOptions.url = w2SelectGridOptions.url || options.url
            };

            if (options.records) {
                w2SelectGridOptions.records = options.records.map(function(i) {
                    i.recid = i.id;
                    return i;
                }).filter(function(i) { return !selectedIds.includes(i.id.toString()) });
            };

            w2SelectGrid = $selectGrid.w2regrid(w2SelectGridOptions);

            if (options.url) {

                w2ui.selectGrid.allRecords = options.multiselect ? w2ui.selectedGrid.records : [];

                w2ui.selectGrid_toolbar.on('click:after', function(e) {

                    addToolbarToSearch();

                    w2ui.selectGrid.allRecords = options.multiselect ? w2ui.selectedGrid.records : [];

                    w2ui.selectGrid.reload();

                });

            } else {

                if (!options.url) w2SelectGrid.refresh();

                w2ui.selectGrid.allRecords = options.multiselect ? w2SelectGridOptions.records.concat(w2ui.selectedGrid.records) : w2SelectGridOptions.records;

            }

            w2SelectGrid.toolbar.disable('select');

            $addbutton.click(function(e) {
                returnValues(e);
            });

            $clearButton.click(function() {

                selectedIds = [];
                refreshGrids();
                $clearButton.attr('disabled', true);

            });

            $('#grid_selectGrid_search_all').focus ()

        }
    );

    popup.on('close:before', function(e) {
        if (options.fieldID) $('#' + options.fieldID).data('block-next-call', 1);
        if (options.gridID) {
            setTimeout(function() {
                $('#w2ui-overlay-' + options.gridID + '-searchOverlay')
                    .data('options')
                    .onHide = null;
            }, 500);
        }
    });

}

$.fn.w2field('addType', 'voc', function(options) {

    function removeHandlers($el) {

        var events = $._data($el[0], 'events');

        Object.keys(events).forEach(function(e) {
            events[e].forEach(function(_e) {
                $el.unbind(e, _e.handler);
            });
        });

    }

    if (options.form) options.onRemove = function(record) {

        var id   = record.item.id;
        var name = options.fieldID;

        var field = w2ui[options.form].fields.find(function(item) { return item.field == name; });
        field.options.selected = field.options.selected.filter(function(item) { return item.id !== id; });

        if (options.multiselect) w2ui[options.form].record[name] = w2ui[options.form].record[name].filter(function(item) { return item.id !== id; })
        else w2ui[options.form].record[name] = null;

    }

    var $el    = $(this.el),
        $field = $el.w2field('enum', options),
        $input = $('input', $el.data('w2field').helpers.multi),
        params = {
            gridID   : options.gridID,
            fieldID  : $el.attr('id'),
            selected : options.selected || [],
            title    : options.title
        };

    params = $.extend(params, this.options);

    removeHandlers($input);
    removeHandlers($el);

    $input.css( 'opacity', 0 );
    $input.focus(function() {

        if ($el.data('block-next-call')) return $el.data('block-next-call', 0);
        w2field_voc(params);

    });

});

function w2uiMultiButton() {

    function onClick() {

        var $this = $(this)
        var rect  = this.getClientRects()[0]
        var id    = $this.attr('data-id')

        if (!id) {

            id = (new Date()).getTime()
            $this.attr('data-id', id)

            $('body').append(
                $('<div/>', { 'data-id': id, class: 'w2ui-multi-btn-wrapper'})
                    .append($this.data('buttons'))
            )

            $('.w2ui-multi-btn-wrapper[data-id=' + id + '] .w2ui-btn[name]').click(function(e) {

                var $this  = $(this)
                var id     = $this.closest('.w2ui-multi-btn-wrapper').attr('data-id')
                var fnName = $this.attr('name') + '_' + $_REQUEST.type

                $('.w2ui-btn.multi[data-id=' + id + ']')
                    .data('toggleOnBlur', false)
                    .trigger('click')

                if ($_DO[fnName]) $_DO[fnName].call(this, e)

            })

        }

        var $wrapper = $('.w2ui-multi-btn-wrapper[data-id=' + id + ']')

        $wrapper
            .css({ top: (rect.top + rect.height) + 'px', left: rect.x + 'px' })
            .toggleClass('show')

        $this.toggleClass('show')

    }

    function onBlur() {

        var $this = $(this)
        var id    = $this.attr('data-id')

        $this.data('toggleOnBlur', true)

        setTimeout(function() {

            if (!$this.data('toggleOnBlur')) return

            $this.removeClass('show')
            $('.w2ui-multi-btn-wrapper[data-id=' + id + ']').removeClass('show')

        }, 300)

    }

    function setHandlers() {

        $('.w2ui-btn.multi').each(function() {

            $(this)
                .off('click')
                .off('blur')
                .click(onClick)
                .blur(onBlur)

        })

    }

    function init() {

        $(window).resize(function() {

            $('.w2ui-multi-btn-wrapper.show').each(function() {
                $('.w2ui-btn.multi[data-id=' + $(this).attr('data-id') + ']').blur()
            })

        })

        $('.w2ui-multi-btn').each(function() {

            var $div     = $(this)
            var $buttons = $div.children()
            var $button  = $('<button/>', { class: 'w2ui-btn', html: $div.attr('label') })

            if (!$buttons.length) return $div.remove()
            if ($div.is(':hidden')) return

            $div.replaceWith($button)

            $button.addClass('multi')
            $button.data('buttons', $buttons)

            setHandlers()

        })

    }

    return {
        init        : init,
        setHandlers : setHandlers
    }

}

function w2_popup_form () {
	return w2ui [$('.w2ui-popup .w2ui-form').attr ('name')]
}

function w2_panel_form () {
	return w2ui [$('.w2ui-panel-content.w2ui-form').attr ('name')]
}

function w2_first_grid () {
	return w2ui [$('.w2ui-grid').attr ('name')]
}

function w2_close_popup_reload_grid () {

	w2popup.close () 
	
	let g = w2_first_grid (); g.reload (g.refresh)
	
}

function w2_confirm_open_tab (msg, url) {
	w2confirm (msg).yes (() => openTab (url))
}

function w2_waiting_panel () {
	let [ln, pn] = $('.w2ui-lock').closest ('.w2ui-panel').attr ('id').split ('_panel_')
	let l = w2ui [ln.substr (7)]
	l.unlock (pn)
	return l.el (pn)
}

async function w2_upload_files_from_popup (o) {

	let f = w2_popup_form ()
	let r = f.record
	
    let files = (r [f.fields.filter (i => i.type == 'file') [0].name] || []).map (f => f.file)
    
    let n = files.length; if (!n) return

    var sum_size = 0
        
    for (let file of files) {    
        if (!file.type) file.type = "application/octet-stream"        
        sum_size += file.size
    }    
    
    let portion = 128 * 1024;
    let sum = 0;
   
    $('#w2ui-popup button').hide ()
    let $progress = $('#w2ui-popup progress')        
    $progress.prop ({max: sum_size, value: 0}).show ()
    w2utils.lock ($('#w2ui-popup .w2ui-page'))

    o.onloadend  =    ()  => n --
    o.onprogress = (x, y) => {sum += portion; $progress.val (sum)}	

    return new Promise (function (resolve, reject) {    

		let check = setInterval (function () {
			if (n) return
			clearInterval (check)
			resolve ()
		}, 100)

		for (let file of files) Base64file.upload (file, o)    

    })

}
