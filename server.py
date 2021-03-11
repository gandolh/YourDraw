from flask import Flask, request, render_template
import json

app = Flask(__name__,template_folder='.')


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/',methods=['GET','POST'])
def hi():
	return render_template('index.html')

def get_last_id(filename):
    with open(filename, 'r') as fl:
        line = fl.readline()
        l_id = 0
        while line:
            l_id = line.split(';')[0]
            line = fl.readline()
        return int(l_id)+1


def add_to_temp_img(info):
    with open('/home/gandolh/YourDraw/database/saveImageForForm.txt', 'a+') as fl:
        fl.write('{};{};{};{}\n'.format(
            get_last_id('/home/gandolh/YourDraw/database/saveImageForForm.txt'),
            info['instructions'],
            info['width'],
            info['height']
            )
        )


def getPreviewDataWithId(filename, id):
    with open(filename) as fl:
        line = fl.readline()
        while line:
            l_id = line.split(';')[0]
            if l_id == id:
                return {
                'instructions':line.split(';')[1],
                'width':line.split(';')[2],
                'height':line.split(';')[3]
                }
            line = fl.readline()
    return {
    'instructions':[],
    'width': 0,
    'height':0
    }
def getDataFromDatabase(filename, id):
    with open(filename) as fl:
        line = fl.readline()
        while line:
            l_id = line.split(';')[0]
            if l_id == id:
                return {
                'title':line.split(';')[1],
                'description':line.split(';')[2],
                'instructions':line.split(';')[3],
                'width':line.split(';')[4],
                'height':line.split(';')[5]
                }
            line = fl.readline()
    return {
    'title': '',
    'description': '',
    'instructions':[],
    'width': 0,
    'height':0
    }

def add_to_db(data):
    with open('/home/gandolh/YourDraw/database/post_db.txt','a+') as fl:
        fl.write('{};{};{};{};{};{}'.format(
        #without enter cause height has \n from temp save
            get_last_id('/home/gandolh/YourDraw/database/post_db.txt'),
            data['draw_name'],
            data['draw_description'],
            data['instructions'],
            data['width'],
            data['height']
            ))



@app.route('/saveImageForForm', methods=['POST'])
def hello():

    info = request.get_json()
    add_to_temp_img(info)
    return {'1':info}
    return {'Succes': 'yes'}


@app.route('/getLastId', methods=['GET'])
def getLastId():
    return{
        'id': get_last_id('/home/gandolh/YourDraw/database/saveImageForForm.txt')
    }


@app.route('/getPreview', methods=['POST'])
def getInstructions():
    info = request.get_json()
    returning_data= \
    getPreviewDataWithId('/home/gandolh/YourDraw/database/saveImageForForm.txt', info)
    return returning_data;

@app.route('/save_data_to_db', methods=['POST'])
def save_data_to_db():
    data=request.get_json()
    add_to_db(data)
    return {
    'Succes':'yes'
    }
@app.route('/delete_temp_save',methods=['POST'])
def delete_temp_save():
    id=request.get_json();
    data='';
    with open('/home/gandolh/YourDraw/database/saveImageForForm.txt','r') as fl:
        line=fl.readline()
        while line:
            if line.split(';')[0]!=id:
                data+=line;
            line=fl.readline()
    with open('/home/gandolh/YourDraw/database/saveImageForForm.txt', 'w') as fl:
        fl.write(data)
    return {
    'Succes': data
    }


@app.route('/getFromDatabase', methods=['POST'])
def getFromDatabase():
    info = request.get_json()
    info=str(info)
    returning_data= \
    getDataFromDatabase('/home/gandolh/YourDraw/database/post_db.txt', info)
    return returning_data;

@app.route('/numbersOfDraw', methods=['GET'])
def getNumbersOfDraws():
    return{
    'numberOfDraws': get_last_id('/home/gandolh/YourDraw/database/post_db.txt') -1
    }
if __name__ == '__main__':
    pass
    app.run(debug=True, port=5000)
    # print(get_last_id('database/saveImageForForm.txt'))
