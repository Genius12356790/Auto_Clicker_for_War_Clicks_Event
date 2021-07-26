function simulateMouseClick(name, i) {targetNode = 
document.getElementsByClassName(name)[i];    function triggerMouseEvent(targetNode, eventType) {
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent(eventType, true, true);
        targetNode.dispatchEvent(clickEvent);
    }
    ["mouseover", "mousedown", "mouseup", "click"].forEach(function(eventType) { 
        triggerMouseEvent(targetNode, eventType);
    });
}

	
function ffac(mode){//true=init or reset


    function sortbd(a, b){
        return a[2] - b[2]
    };
	
	
	function mode0(){
		simulateMouseClick("upgrades hover-glow-soft", 0);
		simulateMouseClick("buy-all-available button factories semi_11_white hover-glow-soft", 0);
		simulateMouseClick("buy-all-available button army semi_11_white hover-glow-soft", 0);
	    simulateMouseClick("organization hover-glow-soft", 0);
		simulateMouseClick("buy-all hover-glow-soft", 1);
		simulateMouseClick("buy-all hover-glow-soft", 0);
	};

    function mode1(){
		    for(i=0; i<11; i++){
            // factories
            let fdatai = factorydata[i];
            let fprodinc = fdatai["cash_sec_increase"];
            let fcost = fdatai["current_cost"];
            let famount = fdatai["amount"];
            let fcashs = fdatai["cash_sec"];
            let foneunitprod = fcashs / famount;
            let fmilestoneid = fdatai["milestone_id"];
            // buy factory
            if (famount < 25){
	    		if (fcost < cash*0.1){
	        		buydata.push([fcost, fprodinc, 0, ["1", i + 11, "button buy hover-glow-soft"]]);
	    	    }
		        else{
                    buydata.push([fcost, fprodinc, sqrt(fcost) * fcost/fprodinc, ["1", i + 11, "button buy hover-glow-soft"]]);
		        };
            }
            else{
                events.game.buyAmount = "OCD";
                let ocdunit = events.game.getUnitCostAmount("factories", i);
                events.game.buyAmount = 1;
    	        let addproddata = foneunitprod * ((famount + ocdunit[0]) * fmilestone[i][fmilestoneid]["mx"] - famount);
	            if (ocdunit[1] < cash*0.1){
	        		buydata.push([ocdunit[1], addproddata, 0, ["OCD", i + 11, "button buy hover-glow-soft"]]);
	    	    }
	    	    else{
                    buydata.push([ocdunit[1], addproddata, sqrt(cash) * ocdunit[1] / addproddata, ["OCD", i + 11, "button buy hover-glow-soft"]]);
	        	};
            };
        };
		let upgindex = 0;
        for(i=0; i<202; i++){
            if (!fupgradedata[i]["bought"]){
                let gains = (fupgradedata[i]["mx"] - 1) * factorydata[fupgradedata[i]["unit_id"]]["cash_sec"];
                let cost = fupgradedata[i]["cost"];
	            if (cost < cash*0.1){
	    		    buydata.push([cost, gains, 0, ["UPG", upgindex + 10, "button buy semi_11_white hover-glow-soft"]]);
	    	    }
	    	    else{
                    buydata.push([cost, gains, sqrt(cash) * cost / gains, ["UPG", upgindex + 10, "button buy semi_11_white hover-glow-soft"]]);
	            };
                upgindex += 1;
            };
            if (upgindex == 10){
            break;
            };
        };
	};
	
    function mode2(){
		    for(i=0; i<11; i++){
            // army
            let adatai = armydata[i];
            let aprodinc = adatai["dps_increase"];
            let acost = adatai["current_cost"];
            let aamount = adatai["amount"];
            let acashs = adatai["dps"];
            let aoneunitprod = acashs / aamount;
            let amilestoneid = adatai["milestone_id"];
            // buy army
            if (aamount < 25){
	    		if (acost < cash*0.1){
	        		buydata.push([acost, aprodinc, 0, ["1", i, "button buy hover-glow-soft"]]);
	    	    }
		        else{
                    buydata.push([acost, aprodinc, sqrt(acost) * acost/aprodinc, ["1", i, "button buy hover-glow-soft"]]);
		        };
            }
            else{
                events.game.buyAmount = "OCD";
                let ocdunit = events.game.getUnitCostAmount("army", i);
                events.game.buyAmount = 1;
    	        let addproddata = aoneunitprod * ((aamount + ocdunit[0]) * amilestone[i][amilestoneid]["mx"] - aamount);
	            if (ocdunit[1] < cash*0.1){
	        		buydata.push([ocdunit[1], addproddata, 0, ["OCD", i, "button buy hover-glow-soft"]]);
	    	    }
	    	    else{
                    buydata.push([ocdunit[1], addproddata, sqrt(cash) * ocdunit[1] / addproddata, ["OCD", i, "button buy hover-glow-soft"]]);
	        	};
            };
        };
		let upgindex = 0;
        for(i=0; i<172; i++){
            if (!aupgradedata[i]["bought"]){
                let gains = (aupgradedata[i]["mx"] - 1) * armydata[aupgradedata[i]["unit_id"]]["dps"];
                let cost = aupgradedata[i]["cost"];
	            if (cost < cash*0.1){
	    		    buydata.push([cost, gains, 0, ["UPG", upgindex, "button buy semi_11_white hover-glow-soft"]]);
	    	    }
	    	    else{
                    buydata.push([cost, gains, sqrt(cash) * cost / gains, ["UPG", upgindex, "button buy semi_11_white hover-glow-soft"]]);
	            };
                upgindex += 1;
            };
            if (upgindex == 10){
            break;
            };
        };
	};
	
	if (mode){
		this.mode = 0;
		this.cycle = 0;
		this.pppspeak = 0;
		this.cashpeak = 0;
		simulateMouseClick("buy-amount semi_14_white hover-glow-soft",0);
		simulateMouseClick("buy-amount semi_14_white hover-glow-soft",0);
		simulateMouseClick("buy-amount semi_14_white hover-glow-soft",0);
	};
    
    var amilestone = events.game.const.milestones["army"];
    var fmilestone = events.game.const.milestones["factories"];
    var factorydata = events.game.db.organization["factories"];
    var armydata = events.game.db.organization["army"];
    var buydata = [[Infinity, 0, Infinity]];// [cost,+gain,cof,func];
    var oneunitprod = 0;
    var cash = events.game.db.cash;
    var fupgradedata = events.game.const.upgrades["factories"];
    var aupgradedata = events.game.const.upgrades["army"];
	
	switch(this.mode){
		case 0:
		mode0();
		this.cycle = this.cycle + 1;
		if (this.cycle > 150){
            if (this.cashpeak * 1.4 > events.game.total_cash_sec){
				this.cashpeak = events.game.total_cash_sec;
				this.cycle = 0;
			}
			else{
			    this.cycle = 0;
			    this.mode += 1;
				simulateMouseClick("buy-amount semi_14_white hover-glow-soft",0);
				simulateMouseClick("buy-amount semi_14_white hover-glow-soft",0);
				simulateMouseClick("buy-amount semi_14_white hover-glow-soft",0);
			};
		};
		break;
		case 1:
		mode1();
		this.cycle = this.cycle + 1;
		if (this.cycle > 300){
            if (this.cashpeak * 1.25 > events.game.total_cash_sec){
				this.cashpeak = events.game.total_cash_sec;
				this.cycle = 0;
			}
			else{
			    this.cycle = 0;
			    this.mode += 1;
			};
		};
		break;
		case 2:
		if (this.cycle % 2){
		    mode1();
		}
		else{
		    mode2();
		};
		console.log(buydata);
	    this.cycle = this.cycle + 1;
		if (this.cycle > 150){
            if (this.pppspeak < events.game.db.territory_points_pending){
				this.pppspeak = events.game.db.territory_points_pending;
				this.cycle = 0;
			}
			else{
			    this.mode = 0;
		        this.cycle = 0;
	        	this.pppspeak = 0;
		        this.cashpeak = 0;
				simulateMouseClick("buy-amount semi_14_white hover-glow-soft",0);
				simulateMouseClick("buy-amount semi_14_white hover-glow-soft",0);
				simulateMouseClick("buy-amount semi_14_white hover-glow-soft",0);
				simulateMouseClick("tactical-retreat hover-glow-soft", 0);
				simulateMouseClick("tactical-retreat bold_12_white  hover-glow-soft", 0);
				simulateMouseClick("yes", 0);
			};
		};
		break;
	};
    buydata.sort(sortbd);
    if (cash >= buydata[0][0]){
        switch (buydata[0][3][0]){
            case "OCD":
	        simulateMouseClick("organization hover-glow-soft", 0);
            simulateMouseClick("buy-amount semi_14_white hover-glow-soft",0);
            simulateMouseClick("buy-amount semi_14_white hover-glow-soft",0);
            simulateMouseClick("buy-amount semi_14_white hover-glow-soft",0);
            simulateMouseClick("buy-amount semi_14_white hover-glow-soft",0);
            simulateMouseClick(buydata[0][3][2], buydata[0][3][1]);
            simulateMouseClick("buy-amount semi_14_white hover-glow-soft",0);
            simulateMouseClick("buy-amount semi_14_white hover-glow-soft",0);
            break;
            case "1": 
		    simulateMouseClick("organization hover-glow-soft", 0);
            simulateMouseClick(buydata[0][3][2], buydata[0][3][1]);
            break;
		    case "UPG":
		    simulateMouseClick("upgrades hover-glow-soft", 0);
		    simulateMouseClick(buydata[0][3][2], buydata[0][3][1]);
            break;
        };
    };
};
ffac(true);
setInterval(ffac, 100);