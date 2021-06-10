using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour {
	public GameObject deathpanel;
	private bool pauseGame = false;


	// Use this for initialization
	void Start () {
		deathpanel.SetActive (false);	
	}
	
	// Update is called once per frame
	void Update () {
		
	}
	public void GameOver(){
		deathpanel.SetActive (true);
		ToggleTime ();
	}
	private void ToggleTime(){
		pauseGame = pauseGame;
		if (pauseGame) {
			Time.timeScale = 0;

		} else {
			Time.timeScale = 1;

		}
	}
}
