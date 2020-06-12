// Made with ❤️ by Aman Sahu !
		
		var state = 0;// 0->right, 1->down, 2- left, 3 is up;

		//step 1
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "#00eeff";
		ctx.fillRect(0, 0, 520, 520);

		//step 2
		function handleKey(e) {
		    e = e || window.event;
		    var play = false;

		    if (e.keyCode == '38'&&state!=1&&state!=3) {
		        // up arrow
		        state = 3;
		        play = true;

		    }
		    else if (e.keyCode == '40'&&state!=1&&state!=3) {
		        // down arrow
		        state = 1;
		        play = true;
		    }
		    else if (e.keyCode == '37'&&state!=0&&state!=2) {
		       // left arrow
		        state = 2;
		        play = true;
		    }
		    else if (e.keyCode == '39'&&state!=0&&state!=2) {
		       // right arrow
		        state = 0;
		        play = true;
		    }

		    if(play)
		    playAudio();
		   
		}

		document.onkeydown = handleKey;

		function playAudio(){
			var audio = new Audio('https://www.soundjay.com/switch/switch-1.wav');
            audio.play();			
		}

		function playConsume(){			
			var audio = new Audio('https://www.soundjay.com/button/button-3.wav');
            audio.play();			
		}

		var N = 20;
		var size = 520;
		var cellSize = size/N;
		

		function drawCell(i,j){
			if( (i+j)%2==0 ) {
				ctx.fillStyle = ("#00eeff");
			}else{
			ctx.fillStyle = "#1acedb";
			}
			ctx.fillRect(cellSize*i, cellSize*j, cellSize, cellSize);
		}

		var matrix = new Array(N);
		for (var i = 0; i < matrix.length; i++) {
		  matrix[i] = new Array(N);
		}

		for (var i = 0; i < matrix.length; i++){
			for (var j = 0; j < matrix[i].length; j++){
				matrix[i][j]=0;
				drawCell(i,j);
			}
		}

		

		var eyeImage = new Image();
		eyeImage.src = "https://i.imgur.com/6jLbz7l.png";
		
		var foodImage = new Image();
		foodImage.src = "https://i.imgur.com/88saChB.png";

		var body = []; //snake body
		// initial body at start of game with size of 3 blocks of snake
		body.push([1+ N/2,N/2]);
		body.push([N/2,N/2]);
		body.push([-1+N/2,N/2]);

		// Generating food
		var foodX = 0; // x co-ordinate for food
		var foodY = 0; // y co-ordinate for food
		function generateFood(){
			var success = false;
			while(!success){
				foodX = parseInt(Math.random()*N);
				foodY = parseInt(Math.random()*N);

				success = true;
				for(var i=0;i<body.length;i++){
					if(body[i][0]==foodX && body[i][1]==foodY){
						success = false;
					}
				}
			}
		}

		generateFood(); //generating food randomly on canvas (Above function is for it).

		// update function is called again and again
		var counter = 0;
		function update(){
			counter++;

			var increase = false;
			if(body[0][0]==foodX&&body[0][1]==foodY){
				generateFood(); //as snake will eat food it will generate food randomly again randomly on canvas
				playConsume(); //played sound of eating food
				increase = true; 
			}

			 // at every this update function called all canvas will be drawn again
			for (var i = 0; i < matrix.length; i++){
				for (var j = 0; j < matrix[i].length; j++){
					drawCell(i,j);
				}
			}
			
			// drawing food image
			ctx.drawImage(foodImage,
						foodX*cellSize, foodY*cellSize,
						cellSize, cellSize);

			// drawing whole snake of purple color on canvas
			for(var i=0;i<body.length;i++){
				ctx.fillStyle = ("#527DF9");
				ctx.fillRect(cellSize*body[i][0], cellSize*body[i][1], cellSize, cellSize);

				// drawing an eye image starts
				if(i==0){
					var marginX = cellSize/3;
					var marginY = cellSize/3;
					
					if(state==0||state==2){
						marginX=0;
					}else if (state==1||state==3){
						marginY=0;
					}

					// basically trying to create animation from static image ..see eye image to get it correctly.
 					ctx.drawImage(eyeImage,
 						0,28*(counter%9),
 						cellSize,cellSize,
 						cellSize*body[i][0]+marginX, 
						cellSize*body[i][1]+marginY,
						cellSize, cellSize);
					ctx.drawImage(eyeImage,
						0,28*(counter%9),
						cellSize,cellSize,
						cellSize*body[i][0]-marginX, 
						cellSize*body[i][1]-marginY, 
						cellSize, cellSize);
					// drawing an eye image ends
				}
				
			}	

		    // 0->right, 1->down, 2- left, 3 is up;
		    var x = 0;
		    var y = 0;
		    if(state==0){
		    	x++;
		    }
		    else if(state==1){
		    	y++;
		    }
		    else if(state==2){
		    	x--;
		    }
		    else if(state==3){
		    	y--;
		    }
		    
		    var arr = [ body[0][0]+x , body[0][1]+y ];
		    // inserts at 0 index
		    body.splice(0,0, arr);

		    if(!increase) //if not eaten food at every frame then tail will pop and snake will move ahead and if increased then it will move head but 
		    	body.pop();	  //at that eaten frame its tail will not pop
		     				
		}

		setInterval(update,300);