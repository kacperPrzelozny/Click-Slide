slider = {
    source: 'url("puzzles/pinhead.jpg")',
    dodaj: function(){
        l = document.getElementById('leftButton')
        r = document.getElementById('rightButton')
        l.children[0].addEventListener('click',slider.left,true)
        r.children[0].addEventListener('click',slider.right,true)
    },
    left: function(){
        l = document.getElementById('leftButton')
        r = document.getElementById('rightButton')
        l.children[0].removeEventListener('click',slider.left,true)
        r.children[0].removeEventListener('click',slider.right,true)
        obraz = document.getElementById('zdj')
        x = obraz.scrollLeft;
        nrZdj = (x/150) + 1
        if(nrZdj==1) obraz.scrollBy(450,0)
        px = 0
        slide = setInterval(function(){
            obraz.scrollBy(-5,0)
            px += 5
            if(px==150){
                clearInterval(slide) 
                l.children[0].addEventListener('click',slider.left,true)
                r.children[0].addEventListener('click',slider.right,true)
            } 
        },10)
        if(nrZdj==1) slider.source = 'url("puzzles/pennywise.jpg")'
        else if(nrZdj==2) slider.source = 'url("puzzles/pinhead.jpg")'
        else if(nrZdj==3) slider.source = 'url("puzzles/annabelle.jpg")'
        else slider.source = 'url("puzzles/pennywise.jpg")'
    },
    right: function(){
        l = document.getElementById('leftButton')
        r = document.getElementById('rightButton')
        l.children[0].removeEventListener('click',slider.left,true)
        r.children[0].removeEventListener('click',slider.right,true)
        obraz = document.getElementById('zdj')
        x = obraz.scrollLeft;
        nrZdj = (x/150) + 1
        if(nrZdj==4) obraz.scrollBy(-450,0)
        px = 0
        slide = setInterval(function(){
            obraz.scrollBy(5,0)
            px += 5
            if(px==150){
                clearInterval(slide)
                l.children[0].addEventListener('click',slider.left,true)
                r.children[0].addEventListener('click',slider.right,true)
            } 
        },10)
        if(nrZdj==1) slider.source = 'url("puzzles/annabelle.jpg")'
        else if(nrZdj==2) slider.source = 'url("puzzles/pennywise.jpg")'
        else if(nrZdj==3) slider.source = 'url("puzzles/pinhead.jpg")'
        else slider.source = 'url("puzzles/annabelle.jpg")'
    }
}