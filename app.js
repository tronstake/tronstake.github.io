function getFormattedDate(date,type)
{
    
//alert(date);

 if(type==1)
 {
	let hour=('0'+date.getUTCHours()).slice(-2);      
	let minute=('0'+date.getUTCMinutes()).slice(-2);  
	let second=('0'+date.getUTCSeconds()).slice(-2);  
	return hour+':'+minute+':'+second;
 }
 else if(type==3)
 {
 	let day=('0'+date.getUTCDate()).slice(-2);      
	let month=('0'+(date.getUTCMonth()+1)).slice(-2);      
	let year=date.getUTCFullYear();      
	return day+'-'+month+'-'+year;
 }
 else if(type==4)
 {
 	let day=('0'+date.getUTCDate()).slice(-2);      
	let month=('0'+(date.getUTCMonth()+1)).slice(-2);      
	let year=date.getUTCFullYear();      
	return day;
 }
 else
 {
    let hour=('0'+date.getUTCHours()).slice(-2);      
	let minute=('0'+date.getUTCMinutes()).slice(-2);  
	let second=('0'+date.getUTCSeconds()).slice(-2);  
 	let day=('0'+date.getUTCDate()).slice(-2);      
	let month=('0'+(date.getUTCMonth()+1)).slice(-2);      
	let year=date.getUTCFullYear();      
	return day+'-'+month+'-'+year+':'+hour+':'+minute;
 }
}



var U_ID=0;

var app = new Vue({
    el: '#app',
    methods : {
        invest(amount,planId){
            //alert(amount);
            //alert(planId);
            var self = this;
           // alert(self.ref);
            self.contract.invest(self.ref,planId).send({
                callValue:window.tronWeb.toSun(amount),
                feeLimit:500000000
            });
        },
        withdraw(){
            //alert();
            var self = this;
            self.contract.withdraw().send({
                
            });
        },
        getPlanPercent(investement){
            return (investement.interest/10 ).toString() + '%';
        }
    },
    data(){
        return { 
          CONTRACT_ADDRESS : 'TPUe35qTJMfo8yni4nTh35pP7bHz4iAioa',
          wallet : null,
          investements : [],
          totalInvested : 0,
           balance : 0,
           trxForPlan0 : 0,
           trxForPlan1 : 0,
           trxForPlan2 : 0,
           trxForPlan3 : 0,
           refEarnings : 0,
           availableRefEarnings : 0,
           newDivs : 0,
           myTotalInvestement :0,
           totalDivs:0,
           refLink : '',
           ref1Count : 0,
           ref2Count : 0,
           ref3Count : 0
        }
    },
    created(){
        var self = this;
        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        if(params.get("ref")){
            localStorage.setItem('ref', params.get("ref"));
            var html="";
        }
      
        this.ref = localStorage.getItem('ref');
        if(!this.ref)  this.ref = 1;
        



        this.interval = setInterval(function(){
            if(window.tronWeb && !self.contract){
                window.tronWeb.contract().at(self.CONTRACT_ADDRESS).then(function(c){
                    self.contract = c;
                });
            }
var U_ID = 0;
            if(self.contract){
                self.wallet = window.tronWeb.defaultAddress.base58;
                // self.contract.getTotalInvestments().call().then(function(r){
                //     self.totalInvested = (r/1e6).toFixed(2);
                // });

                window.tronWeb.trx.getUnconfirmedBalance().then(function(r){ 
                    self.balance = (r/1e6).toFixed(2);
                })
                    
// For REFFRAL LINK 
                    
                self.contract.getUIDByAddress( self.wallet).call().then(function(r){
                    self.uid = r;
                    
                    if(r > 0)
                    {
                        self.refLink = 'https://' + window.location.host  + '/?ref=' + r;
                    //    self.use_refLink = 'https://' + window.location.host  + '/?ref=' + self.wallet;
                        
                    }
                });
                
// END REF LINK 

                self.contract.getUIDByAddress(self.wallet).call().then(function(r){
                    self.uid = r;
                });


                self.contract.getInvestmentPlanByUID(self.uid).call().then(function(r){
                                
                    //console.log(r);
                    r[0].forEach(function(o,i){
                                
                    //alert(r[i]);
                                
                var dt = getFormattedDate(new Date(r[1][i] * 1000),3)
                var plan_id = r[0][i];
                //alert(plan_id);
                if(plan_id==0)
                add_day = 15;
                if(plan_id==1)
                add_day = 20;
                if(plan_id==2)
                add_day = 30;


var today = new Date();
var tomorrow = new Date();
var next=(r[1][i]*1000)+(86400000*add_day);
 var g_only_dt = getFormattedDate(new Date(r[1][i] * 1000),3);

//alert(today.getDate());
//alert(g_only_dt);
//alert(add_day);
var d = new Date();
var f_dt = d.setDate(g_only_dt+add_day);
 
    //alert(f_dt);
    var ldt = getFormattedDate(new Date(next),3);
    
    //alert(ldt);
        
                html+='<div data-v-ae493f60="" class="content active-content"><p data-v-ae493f60="" class="mb-0"><small data-v-ae493f60="" class="fz-12">' +dt+ ' / '+ldt+'</small></p><p data-v-ae493f60="" class="mb-0 fz-16">'+r[3][i]/1e6+' / '+r[2][i]/1000000+'</p></div>';
                        
                        
                   // $("#tbl_chk").html(dt+'<br>' +r[3][i]/1e6+' / '+ (r[2][i]/1000000));
                    
                   // alert(r[3][i]/1e6);
                                        
                    //$("#avl_wlt").html(''+r[4]/1e6);
                       
                                    });   
                });
                    $("#cnt").html(""+html);
html="";

//  FOR AVLIABLE WITHDRAWL 

var wlt_amt = 0;
                self.contract.getInvestmentPlanByUID(self.uid).call().then(function(r){
                        
                    //$("#avl_wlt").html(''+r[4][0]/1e6);
                    
                    wlt_amt =  r[4][0]/1e6;     
                    
                });


                self.contract.getTotalInvestments().call().then(function(r){
                   
                    $("#total_trx_staked").html(''+r/1000000);
                                    
                });

                    
                if(self.uid > 0){
                    
                    
                    self.contract.getInvestorInfoByUID(self.uid).call().then( function(r){
                        self.refEarnings = r[0]/1e6;
                        self.availableRefEarnings = r[1]/1e6;
                        self.claimedDivs = 0;
                        self.newDivs = 0 ;
                        r[7].forEach(function(o){
                            self.newDivs += o/1e6;
                        })
                        r[6].forEach(function(o){
                            self.claimedDivs += o/1e6;
                        })
                         
                        self.totalDivs = self.claimedDivs + self.newDivs;
var avl_wallet= r[1]/1e6 + self.newDivs;
                        self.ref1Count = r[9]/1e6;
                        self.ref2Count = r[10]/1e6;
                        self.ref3Count = r[11]/1e6;
                        //alert(wlt_amt);
                        

                        
                    $("#avl_wlt").html((avl_wallet).toFixed(4));
                        
                    });

                    self.contract.getInvestmentPlanByUID(self.uid).call().then(function(r){

                        self.myTotalInvestement = 0 ;
                        r[2].forEach(function(o){
                            self.myTotalInvestement += o/1e6;
                        });
                        self.investements = [];
                        r[0].forEach(function(o,i){
                            self.investements.push({plan : r[0][i] ,interest : r[5][i] , amount : r[2][i]/1e6 ,time :  new Date(r[1][i]*1000), date : new Date(r[1][i]*1000).toLocaleString(),  payout :r[3][i]/1e6 , divs : r[4][i]/1e6 });
                        })

                    });
                }
            }


        },1000);
    }
 });
