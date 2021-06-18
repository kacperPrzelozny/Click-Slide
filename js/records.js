records = {
    start: function(){
        x = document.cookie
        d = new Date()
        d.setTime(d.getTime()+365*24*60*60*1000)
        if(x == ""){
            for(i=3;i<7;i++){
                for(j=1;j<=10;j++){
                    document.cookie = i+'x'+i+"top"+j+'=00:00.00.000;'+" Expires="+d.toUTCString()+'; path=/';
                    document.cookie = i+'x'+i+"nick"+j+'=;'+"Expires="+d.toUTCString()+'; path=/';
                    
                }
            }
        }
    },
    dodajCookie: function(w,top10,nick10){
        d = new Date()
        d.setTime(d.getTime()+365*24*60*60*1000)
        dl = top10.length
        for(i=0;i<dl;i++){
            document.cookie = document.cookie = w+'x'+w+"top"+String(i+1)+'='+top10[i]+"; Expires="+d.toUTCString()+'; path=/';
            document.cookie = document.cookie = w+'x'+w+"nick"+String(i+1)+'='+nick10[i]+"; Expires="+d.toUTCString()+'; path=/';
        }

    },
    top10: function(w,czas,nick){
        x = document.cookie
        tab = x.split(';')
        top10 = ['','','','','','','','','','','']
        nick10 = []
        //przygotowanie top10 z danej kategorii
        for(i=0;i<10;i++){
            for(j=0;j<tab.length;j++){
                if(i<9){
                    if(tab[j].slice(0,8)==w+'x'+w+'top'+String(i+1)+'='||tab[j].slice(1,9)==w+'x'+w+'top'+String(i+1)+'='){
                        top10[i] = tab[j]
                    } 
                }
                else{
                    if(tab[j].slice(0,9)==w+'x'+w+'top'+String(i+1)+'='||tab[j].slice(1,10)==w+'x'+w+'top'+String(i+1)+'='){
                        top10[i] = tab[j]
                    }
                }
            }
        }
        for(i=0;i<10;i++){
            if(i==9) top10[i]=top10[i].slice(10)
            else top10[i]=top10[i].slice(9)
        }
        top10 = top10.slice(0,top10.indexOf('00:00.00.000'))
        top10.push(czas)
        console.log(top10)
        top10.sort()
        if(top10.length>10) top10 = top10.slice(0,10)
        console.log(top10)
        for(i=0;i<10;i++){
            for(j=0;j<tab.length;j++){
                if(i<9){
                    if(tab[j].slice(0,9)==w+'x'+w+'nick'+String(i+1)+'='||tab[j].slice(1,10)==w+'x'+w+'nick'+String(i+1)+'='){
                        nick10[i] = tab[j]
                    } 
                }
                else{
                    if(tab[j].slice(0,10)==w+'x'+w+'nick'+String(i+1)+'='||tab[j].slice(1,11)==w+'x'+w+'nick'+String(i+1)+'='){
                        nick10[i] = tab[j]
                    }
                }
            }
        }
        for(i=0;i<10;i++){
            if(i==9) nick10[i]=nick10[i].slice(11)
            else nick10[i]=nick10[i].slice(10)
        }
        miejsce = top10.indexOf(czas)
        console.log(miejsce)
        if(miejsce!=-1)
            nick10.splice(miejsce,0,nick)
        if(nick10.length>10) nick10 = nick10.slice(0,10)
        records.dodajCookie(w,top10,nick10);
    },
    tabela: function(){
        wyniki = document.getElementById('plansza')
        wyniki.innerHTML = ''
        wyniki.style.border = "none"
        zegar.czy_liczyc = false
        clearTimeout(plansza.what)
        setTimeout(function(){
            zegar.czas = '00:00.00.000'
            zegar.update()
        },10)
        k = 3
        for(var i=1;i<=2;i++){
            row = document.createElement('div')
            row.classList.add('row')
            for(var j=1;j<=2;j++){
                field = document.createElement('div')
                field.classList.add('wynik')
                field.style.width = '300px'
                field.style.height = '300px'
                field.id = 'records'+k
                row.appendChild(field)
                k++
            }
            document.getElementById('plansza').appendChild(row)
        }
        records.wypisz(3)
        records.wypisz(4)
        records.wypisz(5)
        records.wypisz(6)
    },
    wypisz: function(w){
        x = document.cookie
        tab = x.split(';')
        top10 = []
        nick10 = []
        //przygotowanie top10 z danej kategorii
        for(i=0;i<10;i++){
            for(j=0;j<tab.length;j++){
                if(i<9){
                    if(tab[j].slice(0,8)==w+'x'+w+'top'+String(i+1)+'='||tab[j].slice(1,9)==w+'x'+w+'top'+String(i+1)+'='){
                        top10[i] = tab[j]
                    } 
                }
                else{
                    if(tab[j].slice(0,9)==w+'x'+w+'top'+String(i+1)+'='||tab[j].slice(1,10)==w+'x'+w+'top'+String(i+1)+'='){
                        top10[i] = tab[j]
                    }
                }
            }
        }
        for(i=0;i<10;i++){
            if(i==9) top10[i]=top10[i].slice(10)
            else top10[i]=top10[i].slice(9)
        }
        for(i=0;i<10;i++){
            for(j=0;j<tab.length;j++){
                if(i<9){
                    if(tab[j].slice(0,9)==w+'x'+w+'nick'+String(i+1)+'='||tab[j].slice(1,10)==w+'x'+w+'nick'+String(i+1)+'='){
                        nick10[i] = tab[j]
                    } 
                }
                else{
                    if(tab[j].slice(0,10)==w+'x'+w+'nick'+String(i+1)+'='||tab[j].slice(1,11)==w+'x'+w+'nick'+String(i+1)+'='){
                        nick10[i] = tab[j]
                    }
                }
            }
        }
        for(i=0;i<10;i++){
            if(i==9) nick10[i]=nick10[i].slice(11)
            else nick10[i]=nick10[i].slice(10)
        }
        miejsce = document.getElementById('records'+w)
        miejsce.innerHTML = "<h2>"+w+'x'+w+"</h2>"
        for(var i=0;i<10;i++){
            if(nick10[i]!=''&&top10[i]!='00:00.00.000')
                miejsce.innerHTML+="<p>"+nick10[i] + ' - ' + top10[i] +"</p>"
        }
    }
}