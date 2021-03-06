random_galery = document.getElementsByClassName('random_galery')[0];

// fetch the numbers of elements from db
fetch('http://gandolh.pythonanywhere.com/numbersOfDraw', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        cache: 'default',
    }).then(response => response.json())
    .then(data => {
        // for (let i = 1; i <= Math.min(6,data.numberOfDraws); i++) {
        for (let i = 1; i <= data.numberOfDraws; i++) {
            fetch('http://gandolh.pythonanywhere.com/getFromDatabase',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(i),
                mode: 'cors',
                cache: 'default',
            }).then(response=>response.json())
            .then(data2=>{
            let new_card_body = document.createElement('div');
            let card_body_title = document.createElement('h1');
            let card_body_p = document.createElement('p');
            let new_div = document.createElement('div');
            let new_iframe = document.createElement('iframe')
            new_card_body.className = 'card-body'
            new_div.className = 'card'
            new_iframe.className = 'yourMagicDraw'
            card_body_title.innerHTML = data2.title;
            card_body_p.innerHTML = data2.description;
            new_iframe.src = `http://gandolh.pythonanywhere.com/static/aux_pages/homepageCanvas.html?id=${i}`
            random_galery.appendChild(new_div)
            new_div.appendChild(new_iframe)
            new_div.appendChild(new_card_body)
            new_card_body.appendChild(card_body_title);
            new_card_body.appendChild(card_body_p);
            })

        }
        // random_galery.style.gridTemplateColumns='repeat(auto-fit, minmax(250px, 1fr))'
    })