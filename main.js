
LeftWrist_X=0;
LeftWrist_Y=0;
RightWrist_X=0;
RightWrist_Y=0;
Score_of_RightWrist=0;
Score_of_LeftWrist=0;
Status=""

Song_Noddy="Make Way For Noddy Single- Full Theme.mp3";
Song_Sheldon="Mighty Little Man Lyrics (Young Sheldon Theme Song).mp3";

 function preload(){
    Song_Noddy =loadSound("Make Way For Noddy Single- Full Theme.mp3");    
    Song_Sheldon=loadSound("Mighty Little Man Lyrics (Young Sheldon Theme Song).mp3");
 }

 function setup(){
   canvas = createCanvas(500, 500);
   canvas.position(10, 300);
   video = createCapture(VIDEO);
   video.hide();
   poseNet = ml5.poseNet(video, model_loaded);
   poseNet.on("pose", got_results);
 }

 function model_loaded(){
  console.log("IT'S LOADED");  
 }

 function got_results(results){
   if (results.length > 0) {
      console.log(results);
      LeftWristX = results[0].pose.leftWrist.x;
      LeftWristY = results[0].pose.leftWrist.y;
      RightWristX = results[0].pose.rightWrist.x;
      RightWristY = results[0].pose.rightWrist.y;
      Score_of_LeftWrist=results[0].pose.keypoints[9].score;
   }
 }

 function draw(){
  image(video, 0, 0, 500, 500);
  song1_status=Song_Noddy.isPlaying();
  song2_status=Song_Sheldon.isPlaying();
  fill("blue");
  stroke("red");
  if(Score_of_LeftWrist>0.2){
    circle(LeftWristX, LeftWristY, 40); 
    Song_Noddy.stop();
  if(song2_status==false){
    Song_Sheldon.play()
    document.getElementById("SONG_NAME").innerHTML="Playing Mighty Little Man";
  }
  }
}