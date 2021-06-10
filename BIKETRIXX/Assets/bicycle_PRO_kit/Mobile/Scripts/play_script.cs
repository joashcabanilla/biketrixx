using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class play_script : MonoBehaviour {

	public void playgame(string scenename){

		Application.LoadLevel (scenename);
	

	}
}
