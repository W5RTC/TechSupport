// JavaScript Document
function forLocalGui(){
	document.querySelector('.media-container').style.width='100%';
	document.querySelector('.small-video').style.maxHeight='200px';
	document.querySelector('.small-video').style.maxWidth='400px';
	document.querySelector('.media-controls').style.marginLeft='-175px';
	document.querySelector('.media-controls').style.width='130px';
	document.querySelector('.media-controls').style.height='30px';
	document.querySelector('.media-controls').style.marginTop='3px';
	document.querySelector('.volume-slider').style.marginTop='-1px';
	document.querySelector('.volume-slider').style.marginLeft='3px';
	document.querySelector('.volume-slider').style.height ='20px';
	document.querySelector('.volume-slider').style.display ='none';
	document.querySelector('.mute-audio').style.marginLeft='67px';
	document.querySelector('.mute-audio').style.marginTop='-10px'; 
	document.querySelector('.mute-video').style.marginLeft='97px';
	document.querySelector('.mute-video').style.marginTop='-35px';
}
function forRemoteGui(){
	document.querySelector('.media-container').style.position='relative';
	document.querySelector('.media-container').style.width='101.8%';
	document.querySelector('.media-controls').style.marginTop='10px';
	document.querySelector('.media-controls').style.height='20px';
	document.querySelector('.volume-control').style.display='none';
}