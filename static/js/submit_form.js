submit_button = document.getElementById('post');
const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id')
id = JSON.stringify(id);


submit_button.addEventListener('click', (event) => {
    event.preventDefault();
    fetch('http://gandolh.pythonanywhere.com/getPreview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: id,
            mode: 'cors',
            cache: 'default',
        })
        .then(response => response.json())
        .then(data => {
            ins = data.instructions;
            height = data.height;
            width = data.width;
            //datele din form
            draw_name = document.getElementById('draw_name').value;
            draw_description = document.getElementById('draw_description').value;
            //send them to real db
            data.draw_name = draw_name;
            data.draw_description = draw_description;
            data = JSON.stringify(data)
            fetch('http://gandolh.pythonanywhere.com/save_data_to_db', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: data,
                    mode: 'cors',
                    cache: 'default',
                }).then(response => response.json())
                .then(data => {
                    act_id=urlParams.get('id');
                    fetch('http://gandolh.pythonanywhere.com/delete_temp_save', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(act_id),
                        mode: 'cors',
                        cache: 'default',
                    }).then(response => response.json())
                    .then(data=>{
                        // console.log(data)
                        window.location = `../..`;
                    })
                })
        });
})