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

    for (key in content) {
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

     $.each (o.panels, function() {

        if (this.tabs && this.tabs.tabs) {

            $.each (this.tabs.tabs, function () {
                if (!('tooltip' in this))
                    this.tooltip = ""
            })

        }

    })

    if (w2ui [o.name]) w2ui [o.name].destroy ()

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

    o.onRefresh = andSetRefreshButtons (o.onRefresh)

    if (o.tabs) {
        if (Array.isArray (o.tabs)) o.tabs = {tabs: o.tabs}
        o.onClick = andSetRefreshButtons (o.onClick)
    }

    if (w2ui [o.name]) w2ui [o.name].destroy ()

    return this.w2form (o)

}

$.fn.w2regrid = function (o) {

    if (w2ui [o.name]) w2ui [o.name].destroy ()

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

    return this.w2grid (o)

}

$.fn.w2uppop = function (o, done) {

    var $this = (this)

    o.width  = $this.attr ('data-popup-width')
    o.height = $this.attr ('data-popup-height')
    o.title  = $this.attr ('data-popup-title')

    o.onOpen = function (e) { e.done (function () {

        done (e)

        var pop = $('#w2ui-popup')

        pop.keyup (function (e) {

            if (e.key == 'Enter' && e.ctrlKey && !e.altKey && !e.shiftKey) {

                var b = $('button:first', pop)

                b.focus (function () {b.click ()}).focus ()

            }

        })

    })}

    return this.w2popup ('open', o);

}

function add_vocabularies (data, o) {

    for (var name in o) {

        var raw = data [name]; if (!raw) continue

        var idx = {items: raw.filter (function (r) {var f = r.fake; return !f || parseInt (f) == 0})}; $.each (raw, function () {idx [this.id] = this.text = this.label})

        data [name] = idx

    }

}

function normalizeValue (raw, type) {

    if (raw == null) return null

    if (type == 'file') return raw
    if (type == 'checkbox') return (raw ? 1 : 0)
    if (type == 'list') return raw.id
    if (type == 'enum') return raw.map (function (i) {return i.id})

    var s = String (raw).trim ()

    if (s.length == 0) return null

    if (type == 'date') s = s.replace (/^(\d\d)\.(\d\d)\.(\d\d\d\d)$/, function (_, d, m, y) {return y + '-' + m + '-' + d})
    if (type == 'datetime') {
        s = s.replace (/^(\d\d)\.(\d\d)\.(\d\d\d\d) (\d+)\:(\d\d)$/, function (_, d, m, y, hrs, mnts) {
            return y + '-' + m + '-' + d + ' ' + (hrs.length == 1 ? '0' : '') + hrs + ':' + mnts + ':00'
        })
    }
    if (type == 'int') s = s.replace (/[\D]/g, '')
    if (type.split (':') [0] == 'float') s = s.replace (/ /g, '').replace (',', '.')

    return s

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

w2obj.grid.prototype.saveAsXLS = function (fn, cb) {

    var grid = this

    grid.lock ('Экспорт данных...')

    if (!fn) fn = $('title').text ()
    fn += '.xls'

    var html = '<html><head><meta charset=utf-8><style>td{mso-number-format:"\@"} td.n{mso-number-format:General}</style></head><body><table border>'

    var cols = grid.columns.filter (function (i) {return !i.hidden})

    var trs = [[], []]

    $('#grid_' + grid.name + '_body div[class^=w2ui-col-]').each (function () {

        var $this = $(this); if (!$this.text ().trim ().length) return

        var i = $this.hasClass ('w2ui-col-group') ? 0 : $this.hasClass ('w2ui-col-header') ? 1 : -1

        if (i >= 0) trs [i].push ($this.parent ())

    })

    for (var i = 0; i < 2; i ++) {

        var tr = trs [i]; if (!tr.length) continue

        html += '<tr>'

        for (var j = 0; j < tr.length; j ++) {

            var $td = tr [j]

            html += '<th'

            if (!i) {
                function attr (name) {var v = $td.attr (name); if (v) html += ' ' + name + '=' + v}
                attr ('colspan')
                attr ('rowspan')
            }

            html += '>' + escapeHtml ($td.text ())

        }

    }

    function printRows (rows) {

        for (var i = 0; i < rows.length; i ++) {

            html += '<tr>'
            var row = rows [i]

            for (var j = 0; j < cols.length; j ++) {

                var col = cols [j]

                var v = typeof col.render === "function" ? col.render (row) : row [col.field]

                if (v == null) v = ''

                html += '<td'

                var r = col.render; if (r == 'money' || /^float/.test (r)) {
                    html += ' class=n'
                    v = String (v).replace ('.', ',')
                }

                html += '>'

                if (!/^\d+$/.test (row.recid)) html += '<b>'

                html += escapeHtml (v)

            }

        }

    }

    printRows (grid.records)

    function terminate () {
        var sum = grid.summary
        if (sum && sum.length) printRows (sum)
        html += '</table></body></html>'
        grid.unlock ()
        html.saveAs (fn)
        if (typeof cb == 'function') cb()
    }

    if (!grid.url || !grid.last.xhr_hasMore) return terminate ()

    var data = {
        cmd:         "get",
        selected:    [],
        limit:       grid.limit,
        offset:      grid.records.length,
        search:      grid.searchData,
        searchLogic: grid.last.logic,
        sort:        grid.sortData,
    }

    data = $.extend(data, grid.postData)

    var ajaxOptions = {
        type     : 'POST',
        url      : grid.url,
        dataType : 'text',
        contentType: 'application/json',
    };

    var busy = false,
        done = false

    var t = setInterval (function () {

        if (busy) return;

        if (grid.total == -1 ? done : data.offset >= grid.total) {
            clearInterval (t)
            return terminate ()
        }

        busy = true

        ajaxOptions.data = JSON.stringify (data)

        $.ajax (ajaxOptions).done (function (ddd, status, xhr) {
            var e = {xhr: xhr}
            grid.onLoad (e)
            var d = JSON.parse (e.xhr.responseText) // {total: ..., records: ...}
            if (d.records.length) {
                printRows (d.records)
                data.offset += d.records.length
            } else {
                done = true
            }

            $('div.w2ui-lock-msg').text (grid.total == -1 ? 'Обработано ' + data.offset + ' строк' : Math.round (100 * data.offset / grid.total) + '%...')
            busy = false
        })

    }, 100)

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

}

var _do_apologize = $_DO.apologize

$_DO.apologize = function (o, fail) {

    w2utils.unlockAll ()

    _do_apologize (o, fail)

}