/// Writen by Boris Chuprin smokerr@mail.ru
#pragma strict

var linkToBike : bicycle_code;// making a link to corresponding bike's script
var linkToRider : biker_logic_mecanim;//link to rider's script

var pedalLeft : GameObject;
var pedalRight : GameObject;

private var ctrlHub : GameObject;// gameobject with script control variables 
private var outsideControls : controlHub;// making a link to corresponding bike's script

private var energy : float = 0;//energy of pedaling to release after acceleration off

private var slider : float = 0;
private var sliderRight : boolean = true;

//we need it to move CoM left and right to immitate rotation of pedals
var CoM : Transform; //CoM object

//to move pelvis of rider
var veloMan : Transform;

//BIKE for stunts
var stuntBike : Transform;

//special temp status "on stunt" to prevent fall after maximus angle exceed
public var stuntIsOn : boolean = false;

//tmp "true" during "in stunt" 
private var inStunt : boolean = false;


function Start () {

	ctrlHub = GameObject.Find("gameScenario");//link to GameObject with script "controlHub"
	outsideControls = ctrlHub.GetComponent(controlHub);//to connect c# mobile control script to this one

	linkToBike = this.GetComponent(bicycle_code);
	linkToRider = GameObject.Find("char_anim").GetComponent(biker_logic_mecanim);
	
}

function Update(){
	//Pressing "Space" starts bunnyhop stunt
	if (Input.GetKeyDown ("space")){
		StuntBunnyHope();
	}
	
	if (Input.GetKeyDown(KeyCode.N)){
		StuntBackFlip360();
	}
	
	if (Input.GetKeyDown(KeyCode.M)){
		StuntTurnLeft180();
	}
	
	if (Input.GetKeyDown(KeyCode.B)){
		StuntBunnyShiftRight();
	}
	
	if (Input.GetKeyDown(KeyCode.Slash)){
		StuntHoldForOneSecond();
	}
	//"2" for manual
	if (Input.GetKeyDown(KeyCode.Alpha2)){
		StuntManual();
	}
	
}

function FixedUpdate () {
	
	//pedals rotation part
	if(outsideControls.Vertical >0){
		this.transform.rotation = this.transform.rotation * Quaternion.Euler (linkToBike.bikeSpeed/4, 0, 0);
		pedalRight.transform.rotation = pedalRight.transform.rotation * Quaternion.Euler (-linkToBike.bikeSpeed/-4, 0, 0);
		pedalLeft.transform.rotation = pedalLeft.transform.rotation * Quaternion.Euler (-linkToBike.bikeSpeed/4, 0, 0);
		if (energy < 10){
			energy = energy + 0.01;
		}
		
		if (Mathf.Abs(CoM.transform.localPosition.x) < 0.1){
			veloMan.transform.localEulerAngles.z = CoM.transform.localPosition.x*200;//rider leaning for imitation of pedaling
			//(sometimes looks strange on bicycles with high seat. So, you might just disable it when needed)
		}
		CoM.transform.localPosition.x = -0.02 + (Mathf.Abs(this.transform.localRotation.x)/25);//leaning bicycle when pedaling
		
	} else EnergyWaste();//need to move pedals some time after stop acceleration
	
	//movement body of rider's pelvis when cornering(sometimes looks strange on bicycles with high seat. So, you might just disable it when needed)
	veloMan.transform.localPosition.x = outsideControls.Horizontal/10;//body lean when cornering
	

}

//function when player stop accelerating and rider still slowly rotating pedals
function EnergyWaste(){
	if (energy >0){
		var tmpEnergy = 10 - energy;
		this.transform.rotation = this.transform.rotation * Quaternion.Euler ((linkToBike.bikeSpeed-tmpEnergy)/4, 0, 0);
		pedalRight.transform.rotation = pedalRight.transform.rotation * Quaternion.Euler (-(linkToBike.bikeSpeed-tmpEnergy)/-4, 0, 0);
		pedalLeft.transform.rotation = pedalLeft.transform.rotation * Quaternion.Euler (-(linkToBike.bikeSpeed-tmpEnergy)/4, 0, 0);
		energy = energy - 0.1;

	}
}

//trick to do not crash for one second. You need that for riding ramps
function StuntHoldForOneSecond(){
			stuntIsOn = true;
			yield WaitForSeconds (0.5f);//1 second seems too long :) now it's half of second 0.5f. Make 1 for actually 1 second
			if (!inStunt){
				stuntIsOn = false;
			}
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// applying physical forces to immitate stunts///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function StuntBunnyHope(){
		linkToRider.PlayA("bannyhope");//animation is optional. You may delete this string with no bad aftermath
		
		stuntBike.GetComponent.<Rigidbody>().AddForce (Vector3.up * 40000);//push bike up
		
		yield WaitForSeconds (0.1);//a little pause between applying force
		stuntBike.GetComponent.<Rigidbody>().AddTorque(transform.right * -14000);//pull front wheel(turn bike around CoM)
		yield WaitForSeconds (0.2);//a little pause between applying force
		stuntBike.GetComponent.<Rigidbody>().AddTorque(transform.right * 20000);//push front down and pull rear up
}

function StuntManual(){
	linkToRider.PlayA("manual");
}

//here is stunts
function StuntBackFlip360(){
		linkToRider.PlayA("backflip360");
		stuntIsOn = true;
		inStunt = true;
		CoM.transform.localPosition.y = 0;
		stuntBike.GetComponent.<Rigidbody>().AddTorque(transform.right * -2500000);
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddTorque(transform.right * -2500000);
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddTorque(transform.right * -2500000);
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddTorque(transform.right * -2500000);
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddTorque(transform.right * -2500000);
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddTorque(transform.right * -2500000);
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddTorque(transform.right * -2500000);
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddTorque(transform.right * -2500000);
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddTorque(transform.right * -2500000);
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddTorque(transform.right * -2500000);
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddTorque(transform.right * -2500000);
		yield WaitForSeconds (0.7);
		inStunt = false;
		stuntIsOn = false;
}

function StuntTurnLeft180(){
		linkToRider.PlayA("rightflip180");
		stuntIsOn = true;
		inStunt = true;
		CoM.transform.localPosition.y = 0;
		stuntBike.GetComponent.<Rigidbody>().AddRelativeTorque(Vector3.up * 10000);
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddRelativeTorque(Vector3.up * 10000);
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddRelativeTorque(Vector3.up * 10000);
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddRelativeTorque(Vector3.up * 10000);
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddRelativeTorque(Vector3.up * 10000);
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddRelativeTorque(Vector3.up * 10000);
		yield WaitForSeconds (0.7);
		inStunt = false;
		stuntIsOn = false;
}

function StuntBunnyShiftRight(){
		linkToRider.PlayA("bannyhope");
	
		stuntBike.GetComponent.<Rigidbody>().AddForce (Vector3.up * 45000);//push bike up
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddRelativeTorque(Vector3.right * -4000);//pull front wheel(turn bike around CoM)
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddRelativeTorque(Vector3.up * 1000);//turn bike right
		yield WaitForSeconds (0.1);
		stuntBike.GetComponent.<Rigidbody>().AddRelativeForce (Vector3.right * 24000);//push bike right
		yield WaitForSeconds (0.2);
		stuntBike.GetComponent.<Rigidbody>().AddRelativeTorque(Vector3.up * -3000);//turn bike left
		

}