var Mancala = function () {
    "use strict";
    var a = function (a) {
            this.game = a,
            this.current_pits = [5, 5, 5, 5, 5],
            this.other_pits = [5, 5, 5, 5, 5],
            this.current_store = 0,
            this.other_store = 0   
    };
    

    return a.prototype.flip_board = function () {       //  BOARD FLIP LOGIC
        var a = this.current_pits;          // pit contains the stone
        this.current_pits = this.other_pits,
        this.other_pits = a;
        var b = this.current_store;                     //store contains the stone for point
        this.current_store = this.other_store,
        this.other_store = b
    },
        //not understood part
        a.prototype.get_stones = function (a) {
            return 5 === a ? this.current_store : 11 === a ? this.other_store : 5 > a ? this.current_pits[a] : a > 5 ? this.other_pits[a - 6] : NaN
        },

        a.prototype.set_stones = function (a, b) {
            5 === a ? this.current_store = b : 11 === a ? this.other_store = b : 5 > a ? this.current_pits[a] = b : a > 5 && (this.other_pits[a - 6] = b)
        },
   
        a.prototype.add_stones = function (a, b) {
            5 === a ? this.current_store += b : 11 === a ? this.other_store[a] += b : 5 > a ? this.current_pits[a] += b : a > 5 && (this.other_pits[a - 6] += b)
        },
        a
        //not understood part
    
}();


                                                   // ------------------- ||       END     || ----------------- //
        

    !function () {
        "use strict";
      
        Mancala.prototype.move_stones = function (a) {    //  MOVE STONE LOGIC  
        if (this.get_stones(a) < 1)                       //  'get_stones' shows the no.of stones contained by the recent selected pit, variable 'a' contains is the index value
            return !1;

            var b = this.get_stones(a);

            for (this.set_stones(a, 0),
                this.game.draw_stones(a);
                b > 0;
            )
                ++a,                                     //  a shows the index where last stone is placed
                a > 10 && (a = 0),
                this.add_stones(a, 1),         
                b--,
                this.game.draw_stones(a);
                var c = 4 - a;
            
                
        return 5 > a && 1 === this.current_pits[a] && this.other_pits[c] > 0 && (this.current_store += this.other_pits[c] + 1,
            this.game.draw_stones(5),
            this.current_pits[a] = 0,
            this.other_pits[c] = 0,
            this.game.draw_stones(a),
            this.game.draw_stones(10 - a)),
            5 !== a
        }
    }(),
        

                                                // ------------------- ||       END     || ----------------- //



    function () {
        "use strict";
        Mancala.prototype.check_winner = function (){                                   //  CHECK WINNER LOGIC
            var a = function (a) {
                return a.every(function (a) { return 0 === a })
            },
            b = a(this.current_pits),
            c = a(this.other_pits);
            console.log(b)
            console.log(a)
        
        if (!b && !c)
            return -1;
        var d;
            console.log(d)
        if (b && !c)
            for (d = 0; 5 > d; d++)
                this.other_store += this.other_pits[d],
                    this.other_pits[d] = 0;
            
        else if (c && !b)
            for (d = 0; 5 > d; d++)
                this.current_store += this.current_pits[d],
                    this.current_pits[d] = 0;
        
        return this.game.draw_all_stones(),
                this.current_store > this.other_store ? "two" === this.game.player ? 2 : 1 : this.other_store > this.current_store ? "two" === this.game.player ? 1 : 2 : 0
        }
        
    }();


                                                 // ------------------- ||       END     || ----------------- //



    var Game = function () {
        "use strict";
        var a = function (a, b) {
            this.mancala = new a(this),
            this.player = "two" === b ? "two" : "one"
        };

        return a.prototype.init = function () {
                this.refresh_queries(),
                this.draw_all_stones()
        },
            
        a.prototype.get_other_player = function () {
                return "one" === this.player ? "two" : "one"
        },

        a.prototype.refresh_queries = function () {
                this.current_player_pits = document.querySelectorAll(".row.player-" + this.player + " .pit p"),
                this.other_player_pits = document.querySelectorAll(".row.player-" + this.get_other_player() + " .pit p"),
                this.current_player_store = document.querySelector(".store.player-" + this.player + " p"),
                this.other_player_store = document.querySelector(".store.player-" + this.get_other_player() + " p")
        },

        a.prototype.do_player_turn = function (a) {
                var b = this.mancala.move_stones(a);
                return this.check_game_over() ? (this.reset_game(), !0) : (b && this.switch_turn(), this.save_game(), !1)
        },

        a.prototype.switch_turn = function () {
                this.player = this.get_other_player(),
                this.mancala.flip_board(), this.refresh_queries(),
                this.draw_all_stones();
                    var a = this.player;
                    setTimeout(function () { document.body.setAttribute("data-player", a), document.querySelector(".current-player").textContent = a }, 700)
        },

        a.prototype.check_game_over = function () {
                var a = this.mancala.check_winner();
                if (0 > a) return !1; document.body.classList.add("game-over");
                var b = document.querySelector(".status");
                return 1 === a ? b.textContent = "Player one wins!" : 2 === a ? b.textContent = "Player two wins!" : b.textContent = "Draw!", this.player = "", !0
        },
        a
    }();


                                                      // ------------------- ||       END     || ----------------- //



    !function (){
        "use strict";
        Game.prototype.draw_all_stones = function () {                       //  DRAW ALL STONES LOGIC
            var a = function (a) { return 0 === a ? "" : a };
            this.current_player_store.textContent = a(this.mancala.current_store),
            this.other_player_store.textContent = a(this.mancala.other_store);
            
            for (var b = 0; 5 > b; b++)
                this.current_player_pits[b].textContent = a(this.mancala.current_pits[b]),
                this.other_player_pits[b].textContent = a(this.mancala.other_pits[b])
        },
            
        Game.prototype.draw_stones = function (a) {                          //  DRAW STONES LOGIC
            var b = function (a) { return 0 === a ? "" : a };
            5 === a ? this.current_player_store.textContent = b(this.mancala.current_store) :
            11 === a ? this.other_player_store.textContent = b(this.mancala.other_store) :
            5 > a ? this.current_player_pits[a].textContent = b(this.mancala.current_pits[a]) :
            a > 5 && (a -= 6, this.other_player_pits[a].textContent = b(this.mancala.other_pits[a]))
        }
    }(),

        
        
                                                       // ------------------- ||       END     || ----------------- //
        
        
        
    function () {
        "use strict";
        Game.prototype.load_game = function () {                              //  GAME LOAD LOGIC
            localStorage.getItem("stones") &&
            (localStorage.removeItem("stones"),
            localStorage.removeItem("player")),
            localStorage.getItem("current_pits") ? (this.mancala.current_store = parseInt(localStorage.getItem("current_store")),
            this.mancala.other_store = parseInt(localStorage.getItem("other_store")),
            this.mancala.current_pits = JSON.parse(localStorage.getItem("current_pits")),
            this.mancala.other_pits = JSON.parse(localStorage.getItem("other_pits")),
            "two" === localStorage.getItem("player") && this.switch_turn()) : this.save_game()
        },
            
        Game.prototype.save_game = function () {                                    //  SAVE GAME LOGIC
                localStorage.setItem("player", this.player),
                localStorage.setItem("current_store", JSON.stringify(this.mancala.current_store)),
                localStorage.setItem("other_store", JSON.stringify(this.mancala.other_store)),
                localStorage.setItem("current_pits", JSON.stringify(this.mancala.current_pits)),
                localStorage.setItem("other_pits", JSON.stringify(this.mancala.other_pits))
            },
            
        Game.prototype.reset_game = function () {                                   //  RESET GAME LOGIC
                localStorage.removeItem("player"),
                localStorage.removeItem("current_store"),
                localStorage.removeItem("other_store"),
                localStorage.removeItem("current_pits"),
                localStorage.removeItem("other_pits")
        }
    }();
    

                                                           // ------------------- ||       END     || ----------------- //



var game = function () {
    "use strict";
    var a = new Game(Mancala);
    a.load_game(),
    a.init();
    var b = !0,
        
    c = function (c, d) {
        for (var e = function () {
            if (a.player === c && b) {
                b = !1;
                var d = parseInt(this.getAttribute("data-pit"));
                a.do_player_turn(d) || (b = !0)
            }
        },
            
            f = 0;
            f < d.length;
            f++)d[f].setAttribute("data-pit", f),
            d[f].onclick = e
    };
    
    return c("one", document.querySelectorAll(".row.player-one .pit")),
        c("two", document.querySelectorAll(".row.player-two .pit")),
        document.querySelector(".new-game").onclick = function () { a.reset_game(), window.location.reload() },
        a
}();

//# sourceMappingURL=app.js.map