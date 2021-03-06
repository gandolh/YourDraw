    /*
                start of the second canvas - preview one
                */
    let parent_div = document.getElementById('sketch-holder');
    let good_width = parent_div.clientWidth;
    let good_height = parent_div.clientHeight;
    let InstructionList = [];
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id')
    id = JSON.stringify(id);


    /*
    end of the second canvas - preview one
    */
    function setup() {
        fetch('http://127.0.0.1:5000/getPreview', {
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
                // console.log(data)
                InstructionList = data.instructions;
                // console.log(data.width,data.height)
                InstructionList= JSON.parse(InstructionList)
                // console.log(InstructionList)
                canvas = createCanvas(good_width, good_height);
                canvas.parent('sketch-holder')
                noFill()
                stroke(255,255,255)
                let resizeCanvasContent=2.5;
                for(let i=1;i<InstructionList.length;i++)
                  if(InstructionList[i][2]==1)
                    line(
                    InstructionList[i-1][0]*(width/data.width),
                    InstructionList[i-1][1]*(height/data.height),
                    InstructionList[i][0]*(width/data.width),
                    InstructionList[i][1]*(height/data.height)
                    )

            });


    }