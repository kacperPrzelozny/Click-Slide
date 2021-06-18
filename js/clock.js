zegar = {
    znaki: 12,
    czy_liczyc: false,
    czas: '',
    dodaj: function () {
        document.getElementById('cyfry').innerHTML = ""
        zegar.czy_liczyc = false
        zegar.czas = ''
        for (var i = 0; i < zegar.znaki; i++) {
            cyf = document.createElement('img')
            if (i == 2 || i == 5) {
                cyf.setAttribute('src', 'zegar/colon.gif')
                cyf.setAttribute('height', '52.5px')
            } else if (i == 8) {
                cyf.setAttribute('src', 'zegar/dot.gif')
                cyf.setAttribute('height', '52.5px')
            } else {
                cyf.setAttribute('src', 'zegar/c0.gif')
                cyf.setAttribute('width', '40px')
            }
            cyf.setAttribute('id', '.' + i)
            document.getElementById('cyfry').appendChild(cyf)
        }
    },
    liczenie: function () {
        start = new Date()
        czas0 = start.getTime()
        mili = 0
        sek = 0
        min = 0
        godz = 0
        was = setInterval(function () {
            d = new Date()
            n = d.getTime()
            mili = n - czas0
            sek = Math.floor(mili / 1000)
            min = Math.floor(sek / 60)
            godz = Math.floor(min / 60)
            smili = String(mili)
            dl = smili.length
            if (dl > 3) smili = smili.slice(-3)
            for (var i = 0; i < 3 - dl; i++) {
                smili = '0' + smili
            }
            ssek = String(sek % 60)
            dl = ssek.length
            for (var i = 0; i < 2 - dl; i++) {
                ssek = '0' + ssek
            }
            smin = String(min % 60)
            dl = smin.length
            for (var i = 0; i < 2 - dl; i++) {
                smin = '0' + smin
            }
            sgodz = String(godz)
            dl = sgodz.length
            if (dl > 2) sgodz = sgodz.slice(-2)
            for (var i = 0; i < 2 - dl; i++) {
                sgodz = '0' + sgodz
            }
            zegar.czas = sgodz + ':' + smin + ':' + ssek + '.' + smili
            zegar.update()
            if (zegar.czy_liczyc == false) {
                clearInterval(was)
            }
        }, 10)
    },
    update: function () {
        for (var i = 0; i < 12; i++) {
            if (i != 2 && i != 5 && i != 8) {
                cyf = document.getElementById('.' + i)
                cyf.setAttribute('src', 'zegar/c' + zegar.czas.charAt(i) + '.gif')
            }
        }
    }
}
buttons.dodaj();
zegar.dodaj();
slider.dodaj();
records.start();