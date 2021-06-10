using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public class for_respawn : MonoBehaviour {

	public GameManager manager;
	public Slider healthbar;
	public float health = 100f;
	// private float startingHealth = 100f;


	// Use this for initialization
	private void Start () {
		healthbar.maxValue = health;
		healthbar.value = health;
	}
	
	// Update is called once per frame
	private void Update () {
		if (Input.GetKeyDown (KeyCode.F)) {
			TakeDamage (1f);
		}	
	}

	public void TakeDamage(float amnt){
		health -= amnt;
		if (health <= 0f) {
			manager.GameOver();
		}
		float _h = Mathf.Clamp(health,0,100f);
		healthbar.value = _h;
	}
}
