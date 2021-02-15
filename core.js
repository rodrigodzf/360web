
var date = new Date();
var iterationStartTime;
var currentStep;
var nextBulk;

function deactivateStartPanel()
{
     document.getElementById("startPanel").style.display = "none";
}







//var newArry = interpolateArray([1,5,3],5);



/////////////// json stuff
//var jsontext = '{"virtualCameraman":true, "timeline":[' + '{"timeStamp":1, "rotX":0, "rotY":10, "rotZ":0 }]}';
var jsontext = '{"virtualCameraman":true, "timeLine":[' + '{"timeStamps":[1,2,3,4,5,6,7],"Xrot":[1,2,3,4,5,6,7],"Yrot":[1,2,3,4,5,6,7],"Zrot":[1,2,3,4,5,6,7]}]}';

var isInteracting = false;

var timeline;
var times;
var rotXs;
var rotYs;
var rotZs;
function getTimeline()
{
     obj = JSON.parse(jsontext);
     var virtualCameraman = obj.virtualCameraman;
     timeline = obj.timeLine[0];
     times = timeline.timeStamps;
     rotXs = timeline.Xrot;
     rotYs = timeline.Yot;
     rotZs = timeline.Zrot;



     console.log("cuRRENT:", times[0], times[1], times[2], times[3]);
    // interPolateRotation(rotXs,10);


}
getTimeline();

///////////// interpolate
function interpolateArray(data, fitCount) {

     var linearInterpolate = function (before, after, atPoint) {
         return before + (after - before) * atPoint;
     };
 
     var newData = new Array();
     var springFactor = new Number((data.length - 1) / (fitCount - 1));
     newData[0] = data[0]; // for new allocation
     for ( var i = 1; i < fitCount - 1; i++) {
         var tmp = i * springFactor;
         var before = new Number(Math.floor(tmp)).toFixed();
         var after = new Number(Math.ceil(tmp)).toFixed();
         var atPoint = tmp - before;
         newData[i] = linearInterpolate(data[before], data[after], atPoint);
     }
     newData[fitCount - 1] = data[data.length - 1]; // for new allocation
     nextBulk = newData;
     return newData;
 };

 function interPolateRotation(data, fitCount) {


     var linearInterpolate = function (before, after, atPoint) {
         return before + (after - before) * atPoint;
     };
 
     var newData = new Array();
     var springFactor = new Number((data.length - 1) / (fitCount - 1));
     newData[0] = data[0]; // for new allocation
     for ( var i = 1; i < fitCount - 1; i++) {
          if(!isInteracting)
          {
         var tmp = i * springFactor;
         var before = new Number(Math.floor(tmp)).toFixed();
         var after = new Number(Math.ceil(tmp)).toFixed();
         var atPoint = tmp - before;
         newData[i] = linearInterpolate(data[before], data[after], atPoint);

         rotateCamera(newData[i]);
          } else 
          break;
     }
     newData[fitCount - 1] = data[data.length - 1]; // for new allocation
     return newData;
 };


 function rotateCamera(value)
 {
     console.log("rotating",value);
 }

 function virtualCameraRotate(beginValue, endValuem, beginTime, endTime)
 {
      console.log("HAAALO");
     var timeDuration = endTime - beginTime;
     interpolateArray(rotXs,10);      
     console.log("leeenght", nextBulk.length, timeDuration);

     var timePerStep = timeDuration / nextBulk.length // timeduration of each step (we are taking the new array including interpolation steps)
     iterationStartTime = date.getTime();
     
     currentStep = 0;
     setInterval(loopThrough(nextBulk, timePerStep), timePerStep);

         
 }
 function loopThrough(data, timeperstep)
 {
      console.log("looope", iterationStartTime ,timeperstep, date.getTime(), iterationStartTime + timeperstep - date.getTime());
    if(iterationStartTime + timeperstep > date.getTime())
     {
          rotateCamera(data[currentStep]);
          setInterval(loopThrough(nextBulk, timeperstep), timeperstep);
          currentStep + 1;
          

     } else {
          rotateCamera(data[currentStep]);   
     }


 }
 


 function userInteraction()
 {
      isInteracting = true;
   //   rotXs[0] = 12;
   if(video.currentTime)
     interPolateRotation(rotXs,10);


 }


 virtualCameraRotate(null,null,20,10)

