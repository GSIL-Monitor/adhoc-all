
function NumAscSort(a,b)
{
    return a[0]-b[0];
}
function sortData(ddata)
{
	if(!ddata)
		{
		return ddata;
		}
	return ddata.sort(NumAscSort);
}

function makeAllSort(data)
{
	var rtn={};
	for(var p in data)
	{
		rtn[p]=sortData(data[p]);
				
	}
	
	return rtn;
}

function showresult(startData,endData,pidlistobj,strstartdata,strenddata)
{
	startData=makeAllSort(startData);
	endData=makeAllSort(endData);

		hideload();
		
		
		var labelName={};
		labelName["apv"]=["一跳PV","apv"];
		labelName["auv"]=["一跳UV","auv"];
		labelName["aclick"]=["一跳点击","aclick"];
		labelName["spv"]=["二跳PV","spv"];
		labelName["suv"]=["二跳UV","suv"];
		labelName["sclick"]=["二跳点击","sclick"];
		labelName["sclickuv"]=["二跳点击UV","sclickuv"];
		labelName["lead_click"]=["引导无线点击","lead_click"];
		labelName["lead_click_uv"]=["引导无线点击UV","lead_click_uv"];
		labelName["call_client_pv"]=["主客唤醒次数","call_client_pv"];
		labelName["call_client_uv"]=["主客唤醒次数UV","call_client_uv"];
		labelName["download_client_pv"]=["主客下载次数","download_client_pv"];
		labelName["download_client_uv"]=["主客下载次数UV","download_client_uv"];
		
		labelName["apv_sum"]=["一跳PV","apv"];
		labelName["auv_sum"]=["一跳UV","auv"];
		labelName["aclick_sum"]=["一跳点击","aclick"];
		labelName["spv_sum"]=["二跳PV","spv"];
		labelName["suv_sum"]=["二跳UV","suv"];
		labelName["sclick_sum"]=["二跳点击","sclick"];
		labelName["sclickuv_sum"]=["二跳点击UV","sclickuv"];
		labelName["lead_click_sum"]=["引导无线点击","lead_click"];
		labelName["lead_click_uv_sum"]=["引导无线点击UV","lead_click_uv"];
		labelName["call_client_pv_sum"]=["主客唤醒次数","call_client_pv"];
		labelName["call_client_uv_sum"]=["主客唤醒次数UV","call_client_uv"];
		labelName["download_client_pv_sum"]=["主客下载次数","download_client_pv"];
		labelName["download_client_uv_sum"]=["主客下载次数UV","download_client_uv"];
	

		
		labelName["promise_aclick"]=["当日承诺点击","promise_aclick"];
		labelName["promise_aclick_sum"]=["总承诺点击","promise_aclick_sum"];
		
		labelName["promise_aclick_day"]=["总承诺点击","promise_aclick"];
		labelName["zeroarr"]=["基线","zeroarr"];
		labelName["promise_aclick_rate"]=["点击达成率","promise_aclick_rate"];


			var sumstartdata=makeAllSum(startData);
		
		var sumenddata=makeAllSum(endData);

			var zeroarr=[];
		var promise_aclick=[];
		var promise_aclick_end=[];
		if(sumstartdata["spv"])
		{
			zeroarr=[];
			promise_aclick=[];
			promise_aclick_end=[];
			for(var i=0;i<sumstartdata['spv'].length;i++)
			{
				zeroarr.push([sumstartdata['spv'][i][0],0]);
				if(!g_issumByDay)
				{
					promise_aclick.push([sumstartdata['spv'][i][0],pidlistobj["promise_aclick_"+strstartdata]]);
					promise_aclick_end.push([sumstartdata['spv'][i][0],pidlistobj["promise_aclick_"+strenddata]]);
				}
			

			}
		}else if(sumstartdata["sclick"])
		{
			zeroarr=[];
			promise_aclick=[];
			promise_aclick_end=[];
			for(var i=0;i<sumstartdata['sclick'].length;i++)
			{
				zeroarr.push([sumstartdata['sclick'][i][0],0]);
				if(!g_issumByDay)
				{
					promise_aclick.push([sumstartdata['spv'][i][0],pidlistobj["promise_aclick_"+strstartdata]]);
					promise_aclick_end.push([sumstartdata['spv'][i][0],pidlistobj["promise_aclick_"+strenddata]]);
				}
				

			}
		}else if(sumstartdata["aclick"])
		{
			zeroarr=[];
			promise_aclick=[];
			promise_aclick_end=[];
			for(var i=0;i<sumstartdata['aclick'].length;i++)
			{
				zeroarr.push([sumstartdata['aclick'][i][0],0]);
				if(!g_issumByDay)
				{
					promise_aclick.push([sumstartdata['spv'][i][0],pidlistobj["promise_aclick_"+strstartdata]]);
					promise_aclick_end.push([sumstartdata['spv'][i][0],pidlistobj["promise_aclick_"+strenddata]]);
				}

			}
		}
		
		if(g_issumByDay)
			{
			promise_aclick=[];
			promise_aclick_end=[];
			
		var ttts_start=dayToTimestampDayHourMin("20140301","0000");

		for(var i=0;i<8;i++)
			{
				var dddddts=ttts_start+1000*3600*24*i;
				var ddddstr = parseDay(new Date(dddddts));
				promise_aclick.push([dddddts,pidlistobj["promise_aclick_"+ddddstr]]);
				promise_aclick_end.push([dddddts,pidlistobj["promise_aclick_"+ddddstr]]);
			}
		
			}
		
		

					
	
		
	sumstartdata["zeroarr"]=[zeroarr[0]];
	sumenddata["zeroarr"]=[zeroarr[0]];
	sumstartdata["promise_aclick"]=promise_aclick;
	sumstartdata["promise_aclick_day"]=promise_aclick;
	sumenddata["promise_aclick"]=promise_aclick_end;
	sumenddata["promise_aclick_day"]=promise_aclick_end;
	
	sumstartdata["promise_aclick_sum"]=sumData(promise_aclick);
	sumenddata["promise_aclick_sum"]=sumData(promise_aclick_end);
	if(g_issumByDay)
	{
		sumstartdata["promise_aclick_rate"]=makeClickRageNoCut(sumstartdata["aclick_sum"],makeMaxSingle(sumstartdata["promise_aclick_sum"]));
		sumenddata["promise_aclick_rate"]=makeClickRageNoCut(sumenddata["aclick_sum"],makeMaxSingle(sumenddata["promise_aclick_sum"]));
	}else{
		sumstartdata["promise_aclick_rate"]=makeClickRageNoCut(sumstartdata["aclick_sum"],makeMaxSingle(sumstartdata["promise_aclick"]));
		sumenddata["promise_aclick_rate"]=makeClickRageNoCut(sumenddata["aclick_sum"],makeMaxSingle(sumenddata["promise_aclick"]));
	}

	var keysObj=makeDataSet();
	datasets={};
	for(var p in keysObj)
	{
		if(sumstartdata[p]&&sumstartdata[p].length>0)
			{
		datasets[p]={'data':sortData(sumstartdata[p]),'label':labelName[p][0]+"　　","Y":labelName[p][1],"ischoose":keysObj[p]};
		if(!g_issumByDay)
			{
				datasets[p+"_cmp"]={'data':sortData(sumenddata[p]),'label':"对比"+labelName[p][0],"Y":labelName[p][1],"ischoose":keysObj[p]};
			}
		
			}else{
				
				datasets[p]={'data':sortData(sumstartdata["zeroarr"]),'label':labelName[p][0]+"　　","Y":"zeroarr","ischoose":keysObj[p]};
				if(!g_issumByDay)
					{
						datasets[p+"_cmp"]={'data':sortData(sumenddata["zeroarr"]),'label':"对比"+labelName[p][0],"Y":"zeroarr","ischoose":keysObj[p]};
					}
			}

	}
		
	    var yaxisobj={};
	    var yi=1;
	    var i = 0;
	    $.each(datasets, function(key, val) {
	    		
	          val.color = i;
	        	var kkkk=val.Y;
	       	 	var yindex=yaxisobj[kkkk];
	       	 	if(!yindex)
	       	 	{
	       	 		yindex=yi;
	       	 		yaxisobj[kkkk]=yindex;
	       	 		yi++;
	       	 	}
	       	 	
	          val.yaxis = yindex;
	           yaxis: { max: 1 }
	
	        ++i;
	    });
	    
	    
	    choiceContainer.empty();
	     $("#placeholder").unbind("plothover");
	     
	     var label_a="";
	     var label_b="";
	    $.each(datasets, function(key, val) {
	    	
	    	var strdisable="";
	    	if(key.indexOf("zeroarr")>=0)
	    	{
	    		strdisable='disabled="disabled"';
	    	}
	    	
	    	var strcheck="";
	    	if(val["ischoose"]&&val["ischoose"]=="1")
	    	{
	    		strcheck="checked=\"checked\"";
	    	}
	    	
	    	var strlabel=' <input type="checkbox" '+strdisable+' name="' + key +
            '"  '+strcheck+' id="id' + key + '">' +
            '<label for="id' + key + '">'
             + val.label + '</label>';
	    	if(val.label.indexOf("对比")>=0)
	    		{
	    		label_b+=strlabel;
	    		}else{
	    			
		    		label_a+=strlabel;
	    		}
	      }
	    
	    );
	    
	    choiceContainer.append(label_a+"<br>"+label_b);
	    choiceContainer.find("input").click(plotAccordingToChoices);
	    plotAccordingToChoices();
}




function searchData(strtype,data,pidlistobj,mystrdate)
{

	//realtime_end
	//hour_start
	
	g_result_thedate[strtype]=mystrdate;

	g_result[strtype]=data;
	
	if(!g_result["realtime_end"]||!g_result["realtime_start"]||!g_result["hour_start"]||!g_result["hour_end"])
	{
		return ;
	}
	

	var filterdata={};
	for(var p in g_result)
	{
		var dddata=g_result[p];
		var newdddata={};
		for(var pp in dddata)
		{
			newdddata[pp]=filterData(dddata[pp],p,g_result_thedate[p]);
		}
		filterdata[p]=newdddata;
	}
	
	
	var startData=mergerdata(filterdata["hour_start"],filterdata["realtime_start"]);
	var endData=mergerdata(filterdata["hour_end"],filterdata["realtime_end"]);

	showresult(startData,endData,pidlistobj,g_result_thedate["hour_start"],g_result_thedate["hour_end"]);
	
}

function mergerdata(hourdata,realtimedata)
{
	var result={};
	for(var p in hourdata)
	{
		result[p]=hourdata[p]
		 if(!realtimedata[p])
		 {
		 	continue;
		}
		
		for(var i=0;i<realtimedata[p].length;i++)
		{
			result[p].push(realtimedata[p][i]);
		}
	}
	
	return result;
	
}





	 updateLegendTimeout = null;
	 latestPosition = null;
	  var previousPoint = null;

		
		 var plot=null;




	
	

