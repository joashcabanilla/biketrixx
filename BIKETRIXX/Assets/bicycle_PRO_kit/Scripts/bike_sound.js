/// Writen by Boris Chuprin smokerr@mail.ru
#pragma strict
var linkToBike : bicycle_code;// making a link to corresponding bike's script

var lastGear : int;//we need to know what gear is now
private var skidSound : AudioSource;// makeing another audioSource for skidding sound

// creating sounds(Link it to real sound files at editor)
var skid : AudioClip;

//we need to know is any wheel skidding
var isSkidingFront : boolean = false;
var isSkidingRear : boolean = false;

private var ctrlHub : GameObject;// gameobject with script control variables 
private var outsideControls : controlHub;// making a link to corresponding bike's scriptt


function Start () {
	ctrlHub = GameObject.Find("gameScenario");//link to GameObject with script "controlHub"
	outsideControls = ctrlHub.GetComponent(controlHub);//to connect c# mobile control script to this one
	
	//assign sound to audioSource
    skidSound = gameObject.AddComponent(AudioSource);
	skidSound.loop = false;
    skidSound.playOnAwake = false;
    skidSound.clip = skid;
    skidSound.pitch = 1.0;
    skidSound.volume = 1.0;
    
	//real-time linking to current bike
 	linkToBike = this.GetComponent(bicycle_code);

}


function Update(){	

	//skids sound
	if (linkToBike.coll_rearWheel.sidewaysFriction.stiffness < 0.5 && !isSkidingRear && linkToBike.bikeSpeed >1){
			skidSound.Play();
			isSkidingRear = true;
	} else if (linkToBike.coll_rearWheel.sidewaysFriction.stiffness >= 0.5 && isSkidingRear || linkToBike.bikeSpeed <=1){
				skidSound.Stop();
				isSkidingRear = false;
	}
	if (linkToBike.coll_frontWheel.brakeTorque >= (linkToBike.frontBrakePower-10) && !isSkidingFront && linkToBike.bikeSpeed >1){
			skidSound.Play();
			isSkidingFront = true;
	} else if (linkToBike.coll_frontWheel.brakeTorque < linkToBike.frontBrakePower && isSkidingFront || linkToBike.bikeSpeed <=1){
				skidSound.Stop();
				isSkidingFront = false;
	}
}