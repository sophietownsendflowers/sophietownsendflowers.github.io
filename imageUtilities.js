var imageIndex;
var maxImages;

function setOpacity(object,opacityPct)
{
  // IE.
  object.style.filter = 'alpha(opacity=' + opacityPct + ')';
  // Old mozilla and firefox
  object.style.MozOpacity = opacityPct/100;
  // Everything else.
  object.style.opacity = opacityPct/100;
}

function changeOpacity(id,msDuration,msStart,fromO,toO)
{
  var element=document.getElementById(id);
  var opacity = element.style.opacity * 100;
  var msNow = (new Date()).getTime();
  opacity = fromO + (toO - fromO) * (msNow - msStart) / msDuration;
  if (opacity<0) 
    setOpacity(element,0)
  else if (opacity>100)
    setOpacity(element,100)
  else
  {
    setOpacity(element,opacity);
    element.timer = window.setTimeout("changeOpacity('" + id + "'," + msDuration + "," + msStart + "," + fromO + "," + toO + ")",1);
  }
}

function fadeIn(id)
{
  var element=document.getElementById(id);
  if (element.timer) window.clearTimeout(element.timer); 
  var startMS = (new Date()).getTime();
  element.timer = window.setTimeout("changeOpacity('" + id + "',1000," + startMS + ",0,100)",1);
}

function fadeOut(id)
{
  var element=document.getElementById(id);
  if (element.timer) window.clearTimeout(element.timer); 
  var startMS = (new Date()).getTime();
  element.timer = window.setTimeout("changeOpacity('" + id + "',1000," + startMS + ",100,0)",1);
}

function FadeInImage(foregroundID,newImage,backgroundID)
{
  var foreground=document.getElementById(foregroundID);
  if (backgroundID)
  {
    var background=document.getElementById(backgroundID);
    if (background)
    {
      background.style.backgroundImage = 'url(' + foreground.src + ')';
      background.style.backgroundRepeat = 'no-repeat';
    }
  }
  setOpacity(foreground,0);
  foreground.src = newImage;
  if (foreground.timer)
  {
	window.clearTimeout(foreground.timer); 
  }
  var startMS = (new Date()).getTime();
  foreground.timer = window.setTimeout("changeOpacity('" + foregroundID + "',1000," + startMS + ",0,100)",10);
}

/* TODO: add crossfade duration and image name */
function initCrossfade(foregroundID,numImages,backgroundID)
{
	imageIndex = 0;
	maxImages = numImages;

	setTimeout("crossfadeImage('" + foregroundID + "','" + backgroundID +"')", 5000);
}

function crossfadeImage(foregroundID,backgroundID)
{
	/* Increment image index */
	imageIndex = (imageIndex + 1) %maxImages;

	var img = 'images/slideshow/image' + imageIndex + '.jpg';
	FadeInImage(foregroundID,img,backgroundID);

	setTimeout("crossfadeImage('" + foregroundID + "','" + backgroundID +"')", 5000);
}

