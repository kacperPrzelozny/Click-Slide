buttons = {
    dodaj: function () {
        for (let i = 3; i <= 6; i++) {
            el = document.createElement('button')
            el.classList.add('b')
            el.innerHTML = i + 'x' + i;
            el.onclick = function () {
                plansza.stworz(i);
            }
            document.getElementById('buttons').appendChild(el)
        }
        document.getElementById('rekordy').addEventListener('click',records.tabela,true)
    }
}

plansza = {
    what: 0,
    pola: document.getElementById('plansza'),
    il: 0,
    xx: 0,
    yy: 0,
    wielkosć: 0,
    zmiana: 0,
    wygrana: false,
    ruch: function () {
        x = this.style.backgroundPositionX
        y = this.style.backgroundPositionY
        p = document.getElementById('puste')
        p.style.backgroundImage = slider.source;
        p.style.backgroundPositionX = x
        p.style.backgroundPositionY = y
        this.style.backgroundImage = ''
        this.id = 'puste'
        p.id = ''
        for (var l = 0; l < plansza.wielkosć; l++) {
            for (var m = 0; m < plansza.wielkosć; m++) {
                plansza.pola.children[l].children[m].removeEventListener('click', plansza.ruch, true)
            }
        }
        if (plansza.il == plansza.wielkosć * plansza.wielkosć * 20)
            plansza.sprawdz()
        if (plansza.wygrana == false) {
            x = parseInt(this.dataset.x)
            y = parseInt(this.dataset.y)
            w = plansza.wielkosć - 1
            if (y - 1 >= 0) {
                plansza.pola.children[y - 1].children[x].addEventListener('click', plansza.ruch, true)
            }
            if (y + 1 <= w) {
                plansza.pola.children[y + 1].children[x].addEventListener('click', plansza.ruch, true)
            }
            if (x + 1 <= w) {
                plansza.pola.children[y].children[x + 1].addEventListener('click', plansza.ruch, true)
            }
            if (x - 1 >= 0) {
                plansza.pola.children[y].children[x - 1].addEventListener('click', plansza.ruch, true)
            }
        }
    },
    stworz: function (i) {
        plansza.wielkosć = i;
        plansza.il = 0
        plansza.wygrana = false
        plansza.pola.style.border = "1px solid red"
        document.getElementById('plansza').innerHTML = ""
        x = 0;
        y = 0;
        plansza.zmiana = 600 / i;
        for (let j = 0; j < i; j++) {
            wiersz = document.createElement('div')
            wiersz.setAttribute('class', 'row')
            for (k = 0; k < i; k++) {
                pole = document.createElement('div')
                pole.style.width = plansza.zmiana + 'px'
                pole.style.height = plansza.zmiana + 'px'
                if (k == i - 1 && j == i - 1) {
                    pole.id = "puste"
                }
                else {
                    pole.style.backgroundImage = slider.source;
                    pole.style.backgroundPositionX = x + 'px';
                    pole.style.backgroundPositionY = y + 'px';
                    if ((j == i - 1 && k == i - 2) || (j == i - 2 && k == i - 1)) {
                        pole.addEventListener('click', plansza.ruch, true)
                    }
                    x -= plansza.zmiana
                }
                pole.setAttribute('data-x', k)
                pole.setAttribute('data-y', j)
                pole.setAttribute('class', 'pole')
                wiersz.appendChild(pole)
            }
            document.getElementById('plansza').appendChild(wiersz);
            x = 0
            y -= plansza.zmiana
        }
        plansza.mieszanie();
    },
    mieszanie: function () {
        l = document.getElementById('leftButton')
        r = document.getElementById('rightButton')
        l.children[0].removeEventListener('click',slider.left,true)
        r.children[0].removeEventListener('click',slider.right,true)
        zegar.czy_liczyc = false
        zegar.czas = '00:00:00.000'
        zegar.update();
        if (plansza.il == 0) {
            plansza.xx = plansza.wielkosć - 1;
            plansza.yy = plansza.wielkosć - 1;
        }
        while (true) {
            kier = Math.random()
            ile = Math.random()
            if (kier > 0.5) kier = true //x
            else kier = false //y
            if (ile > 0.5) ile = 1 //w prawo
            else ile = -1 //w lewo

            if (kier == true) {
                if (plansza.xx + ile >= 0 && plansza.xx + ile < plansza.wielkosć) {
                    plansza.pola.children[plansza.yy].children[plansza.xx + ile].click();
                    plansza.xx = plansza.xx + ile
                    break
                }
            }
            else {
                if (plansza.yy + ile >= 0 && plansza.yy + ile < plansza.wielkosć) {
                    plansza.pola.children[plansza.yy + ile].children[plansza.xx].click();
                    plansza.yy = plansza.yy + ile
                    break
                }
            }
        }
        plansza.what = setTimeout(plansza.mieszanie, 5)
        plansza.il++

        if (plansza.il == plansza.wielkosć * plansza.wielkosć * 20) {
            clearTimeout(plansza.what)
            zegar.czy_liczyc = true    
            zegar.liczenie();  
            l.children[0].addEventListener('click',slider.left,true)
            r.children[0].addEventListener('click',slider.right,true)      
        }
        if (plansza.il > plansza.wielkosć * plansza.wielkosć * 20) {
            plansza.il = 0;
        }
    },
    sprawdz: function () {
        pom = 0
        x = 0;
        y = 0;
        for (var i = 0; i < plansza.wielkosć; i++) {
            for (var j = 0; j < plansza.wielkosć; j++) {
                if (plansza.pola.children[i].children[j].style.backgroundPositionX == x + 'px' && plansza.pola.children[i].children[j].style.backgroundPositionY == y + 'px')
                    pom++
                x -= plansza.zmiana
            }
            x = 0
            y -= plansza.zmiana
        }
        if (pom == plansza.wielkosć * plansza.wielkosć - 1) {
            plansza.wygrana = true
            zegar.czy_liczyc = false
            plansza.pola.innerHTML=""
            plansza.pola.style.backgroundImage = slider.source;
            setTimeout(function () {
                nick = prompt('BIG WINNER!!!\nTwój czas: ' + zegar.czas+"\nPodaj swój nick: ")
                while(nick==""){
                    nick = prompt("Proszę podać nick: ")
                }
                records.top10(plansza.wielkosć,zegar.czas,nick)
            }, 50)
        }
    }
}