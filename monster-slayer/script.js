new Vue({
  el: "#app",
  data: {
    powers: ['sneak', 'aggressive', 'defense'],
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    playerAttack: "",
    monsterAttack: "",
		isActive: false,
		playerWinActive: false,
		monsterWinActive: false
  },
  created: function() {
    window.addEventListener('keyup', this.keyBinding);
  },
  destroyed: function() {
    window.removeEventListener('keyup', this.keyBinding);
  },
  methods: {
    keyBinding: function(e) {
      switch (e.which) {
        case 65:
          this.aggressive();
          break;
        case 83:
          this.sneaky();
          break;
        case 68:
          this.defense();
          break;
        case 78:
          if (!this.gameIsRunning)
            this.startGame();
          break;

      }
    },
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    endGame: function() {
      this.gameIsRunning = false;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    sneaky: function() {
      this.fight("sneaky");
    },
    aggressive: function() {
      this.fight("aggressive");
    },
    defense: function() {
      this.fight("defense");
    },
    monsterAttackGenerator: function() {
      var random = Math.floor(Math.random() * 3);
      switch (random) {
        case 0:
          return "sneaky";
        case 1:
          return "aggressive";
        case 2:
          return "defense";
      }
    },
    compareAttacks: function(attack) {
      const monsterAttackGenerated = this.monsterAttackGenerator();
      this.showAttack(attack,monsterAttackGenerated);
      switch (attack) {
        case "sneaky":
          switch (monsterAttackGenerated) {
            case "sneaky":
              return "tie";
            case "defense":
              return "won-3";
            case "aggressive":
              return "lost-7";
          }
          break;
        case "aggressive":
          switch (monsterAttackGenerated) {
            case "sneaky":
              return "won-7";
            case "defense":
              return "lost-5";
            case "aggressive":
              return "tie";
          }
          break;
        case "defense":
          switch (monsterAttackGenerated) {
            case "sneaky":
              return "lost-3";
            case "defense":
              return "tie";
            case "aggressive":
              return "won-7";
          }
      }
    },
    fight: function(attack) {
      if (!this.gameIsRunning)
        return;
      const result = this.compareAttacks(attack);
      switch (result.split("-")[0]) {
        case "tie":
				this.playerWinActive = true;
				this.monsterWinActive = true;
          break;
        case "lost":
          this.playerHealth -= result.split("-")[1];
					this.playerWinActive = false;
					this.monsterWinActive = true;
          break;
        case "won":
          this.monsterHealth -= result.split("-")[1];
					this.playerWinActive = true;
					this.monsterWinActive = false;
          break;
      }
			this.checkHealth();
    },
    checkHealth: function() {
      if (this.monsterHealth <= 0) {
        alert('You Won!!!');
        this.gameIsRunning = false;
        return;
      } else if (this.playerHealth <= 0) {
        alert("You Lost :'(");
        this.gameIsRunning = false;
        return;
      }
    },
		showAttack: function(attackName,monsterAttackName){
			var self = this;
			self.playerAttack = attackName;
      self.monsterAttack = monsterAttackName;
			self.isActive = true;
			setTimeout(function(){
				self.isActive = false;
			},500)
		}
  }
})
