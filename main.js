function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    person_detector = ml5.objectDetector("cocossd",Model_loaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function Model_loaded()
{
    console.log("Model loaded");
    Status = true;
}

Status = "";
person = [];

function preload()
{
    sound = loadSound("Alert_Sound.mp3");
}

function draw()
{
    image(video,0,0,380,380);
    person_detector.detect(video,gotResult);
    if(person.length>0)
    {

        for(i = 0 ; i< person.length ; i++)
      {
        r = random(255);
        g = random(255);
        b = random(255);

        if(person[i].label == "person")
        {

        document.getElementById("status").innerHTML = "Status : Baby detected";
        document.getElementById("finding_baby").innerHTML = "Baby found";
        sound.stop();
        }
        else 
        {
            sound.play();
            document.getElementById("status").innerHTML = "Status : Baby not detected";
            document.getElementById("finding_baby").innerHTML = "Baby not found";

        }

        fill(r,g,b);
        percent = floor(person[i].confidence*100);
        text(person[i].label + " " + percent + "%" , person[i].x+15 , person[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(person[i].x,person[i].y,person[i].width,person[i].height);
      }
    }
    

    else
    {
        document.getElementById("status").innerHTML = "Status : Baby not detected";
        document.getElementById("finding_baby").innerHTML = "Baby not found"
        sound.play();

    }
}

function gotResult(error,result)
{
   if(error)
   {
       console.log(error);
   }
   else
   {
   console.log(result);
   person = result;
   }
}

