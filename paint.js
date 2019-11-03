var canvas = $('#myCanvas');
var ctx = canvas[0].getContext("2d");
var mousedown;
var tools = {
    "crayon": false,
    "gomme": false,
    "line": false,
    "rect": false,
    "circle": false,
    "circleFill": false,
    "rectFill": false,
    "clear": false,
};

function switchOption(option){
    var color = $("#color-picker").val();
    var size = $("#size").val();

    for (key in tools) {
        tools[key] = false;
    }

    switch(option){
        case "crayon":
            tools['crayon'] = true;
            crayon(color, size, 1, 1);
            break;
        
        case "gomme":
            tools['gomme'] = true;
            gomme(size, 10, 10);
            break;
        
        case "line":
            tools['line'] = true;
            line(color, size);
            break;
        
        case "rect":
            tools['rect'] = true;
            rect(color, size, false);
            break;

        case "rectFill":
            tools['rectFill'] = true;
            rectFill(color, size);
            break;

        case "circle":
            tools['circle'] = true;
            circle(color, size);
            break;

        case "circleFill":
            tools['circleFill'] = true;
            circleFill(color, size);
            break;

        case "clear":
            tools['clear'] = true;
            clear();
            break;
    }
}

function crayon(color, size){
    ctx.strokeStyle = color; 
    ctx.lineWidth = size;
   
    $('#myCanvas').mousedown(function(e){
        posX = e.offsetX;
        posY = e.offsetY;
        mousedown = true;
        ctx.beginPath();
        ctx.lineTo(posX, posY);
        ctx.stroke();
    });
    $('#myCanvas').mousemove(function(e){
        if(tools["crayon"] == true && mousedown){
                posX = e.offsetX;
                posY = e.offsetY;
                ctx.lineTo(posX, posY);
                ctx.stroke();
        }
    });
    $('#myCanvas').mouseup(function(e){
        mousedown = false;
        ctx.closePath();
    });
}

function gomme(size) {
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = size;

    $('#myCanvas').mousedown(function(e){
        posX = e.offsetX;
        posY = e.offsetY;
        mousedown = true;
        ctx.beginPath();
        ctx.lineTo(posX, posY);
        ctx.stroke();
    });
    $('#myCanvas').mousemove(function(e){
        if (tools['gomme'] == true && mousedown) {
                posX = e.offsetX;
                posY = e.offsetY;
                ctx.lineTo(posX, posY);
                ctx.stroke();
        }
    });
    $('#myCanvas').mouseup(function(e){
        mousedown = false;
        ctx.closePath();
    });
}

function line(color, size) {
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    $('#myCanvas').mousedown(function(e){
            if (tools['line'] == true) {
                posX = e.offsetX;
                posY = e.offsetY;
                ctx.beginPath();
                ctx.lineTo(posX, posY);
            }
        });
        $('#myCanvas').mouseup(function(e){
            if (tools['line'] == true) {
                posX = e.offsetX;
                posY = e.offsetY;
                ctx.lineTo(posX, posY);
                ctx.stroke();
                ctx.closePath();
            }
        });
}

function rect(color, size) {
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    $('#myCanvas').mousedown(function(e){
            if (tools['rect'] == true) {
                pos1_x1 = e.offsetX;
                pos1_y1 = e.offsetY;
                ctx.beginPath();
            }
        });
        $('#myCanvas').mouseup(function(e){
            if (tools['rect'] == true) {
                pos_x2 = e.offsetX - pos1_x1;
                pos_y2 = e.offsetY - pos1_y1;
                ctx.strokeRect(pos1_x1, pos1_y1, pos_x2, pos_y2);
                ctx.closePath();
                }
        });
}

function rectFill(color, size) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = size;

    $('#myCanvas').mousedown(function(e){
            if (tools['rectFill'] == true) {
                pos1_x1 = e.offsetX;
                pos1_y1 = e.offsetY;
                ctx.beginPath();
            }
        });
        $('#myCanvas').mouseup(function(e){
            if (tools['rectFill'] == true) {
                pos_x2 = e.offsetX - pos1_x1;
                pos_y2 = e.offsetY - pos1_y1;
    
                ctx.fillRect(pos1_x1, pos1_y1, pos_x2, pos_y2);
                ctx.strokeRect(pos1_x1, pos1_y1, pos_x2, pos_y2);
                ctx.closePath();
            }
        });
}

function circle(color, size) {
    ctx.strokeStyle = color;
    ctx.lineWidth = size;

    $('#myCanvas').mousedown(function(e){
            if (tools['circle'] == true) {
                pos1_x1 = e.offsetX;
                pos1_y1 = e.offsetY;
                ctx.beginPath();
            }
        });
        $('#myCanvas').mouseup(function(e){
            if (tools['circle'] == true) {
                pos_x2 = e.offsetX - pos1_x1;
                ctx.arc(pos1_x1, pos1_y1, pos_x2, 0, 2 * Math.PI);
                
                ctx.stroke();
                ctx.closePath();
            }
        });
}

function circleFill(color, size) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = size;

    $('#myCanvas').mousedown(function(e){
            if (tools['circleFill'] == true) {
                pos1_x1 = e.offsetX;
                pos1_y1 = e.offsetY;
                ctx.beginPath();
            }
        });
        $('#myCanvas').mouseup(function(e){
            if (tools['circleFill'] == true) {
                pos_x2 = e.offsetX - pos1_x1;
                ctx.arc(pos1_x1, pos1_y1, pos_x2, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
        });
}

function saveImg(){
    $("#save").attr('download', 'image.png');
    $("#save").attr('href', $("#myCanvas")[0].toDataURL());
}

$('#imageLoader').change(function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
});

function clear(){
    ctx.clearRect(0, 0, 1010, 400);
}