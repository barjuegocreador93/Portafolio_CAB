/// <reference path="typings/jquery/jquery.d.ts"/>
//creado por Camilo Barbosa
function isJQ(html,html2)
{
	return $(html).is(html2);
}
function isReady(html)
{	
	return isJQ(html,":visible");	
}
//id activ(#) + class scla(#)
function actv(id)
{
	this.name="activ_";
	this.scla="scla_";	
	this.levl=0;	
	this.nsca=0;	
	this.id=id;
	this.pres=0;
	this.run=function()	
	{
		var name=this.name;
		var scla=this.scla;
		var id=this.id;
		var level=this.levl;
		$("#"+this.name+this.id+"").addClass("btn-default");
		var css= $("h1").css("font-size");
		var css_n=parseInt(css);
		css_n=css_n-2;
		css= toString(css_n);
		
		$(".btn").css({"font-size":""+css+""});
					
		$("#"+name+id+"").click(function()
		{
			for(i=1;isReady("."+scla+i+"")||isJQ("."+scla+i+"",":not(:visible)");i++)
			{
				if(id===i)
				{
					if(isJQ("#"+name+id+"",".activ_togg"))
					{
						$("."+scla+id+"").slideToggle();
					}
					else
					{
						$("#"+name+id+"").hide();
						$("."+scla+id+"").slideDown();
					}
					
				}
				else
				{
					$("#"+name+i+"").slideDown();			
					$("."+scla+i+"").hide();
				}
				
			}			
				
		});		
		this.print();
		var tit = name+id+"";
		var bool=1;
		for(var i=1;i<=6;i++)
			{
				if(isJQ("."+this.scla+this.id+"",".Tit_"+i+""))
				{					
					$("."+this.scla+this.id+"").filter(".Tit_"+i+"").prepend("<h"+i+">"+$("#"+tit).text()+"</h"+i+">");
					bool=0;
				}
				
			}
		if(bool&&!isJQ("."+this.scla+this.id+"",".scla_noTit")&&itms.addTitulos_bool)
		{
			if(tit.length===7)			
			$("."+this.scla+this.id+"").prepend("<h2>"+$("#"+tit).text()+"</h2>");
			else if(tit.length===9)			
			$("."+this.scla+this.id+"").prepend("<h3>"+$("#"+tit).text()+"</h3>");
			else if(tit.length===11)			
			$("."+this.scla+this.id+"").prepend("<h4>"+$("#"+tit).text()+"</h4>");
			else if(tit.length===13)			
			$("."+this.scla+this.id+"").prepend("<h5>"+$("#"+tit).text()+"</h5>");
			else if(tit.length===15)			
			$("."+this.scla+this.id+"").prepend("<h6>"+$("#"+tit).text()+"</h6>");			
		}		
	};	
	this.print=function()
	{
		
		if(this.pres)
		{
			
			if(isJQ("#"+this.name+this.id+"",".activ_togg"))
			{
				$("."+this.scla+this.id+"").slideToggle();
			}				
			else
			{
				$("#"+this.name+this.id+"").hide();
				$("."+this.scla+this.id+"").slideDown();
			}			
		}		
		else 
		{
			$("#"+this.name+this.id+"").slideDown();			
			$("."+this.scla+this.id+"").hide();
		}		
	};
}
//------------------------
//html JQueryCAB
function doc(id,clase)
{
	this.ele=[];	
	this.max_lvl=0;	
	this.addTitulos_bool=1;
	this.name=id
	this.scla=clase;
	
	this.add=function(docs)
	{					
		this.ele.push(docs);		
	};
	this.prints= function(level)
	{
		for(var i=0;i < this.ele.length; i++)
		{
			if(this.ele[i].levl===level)this.ele[i].print();						
		}	
	};
	this.sh_itm_index=function(scla, id)
	{
		for(var i=0;i < this.ele.length; i++)
		{
			if(this.ele[i].scla===scla&&this.ele[i].id===id)return i;						
		}
		
	};
	this.sh_Name_id=function(name, id, press)
	{		
		for(var i=0;i < this.ele.length; i++)
		{			
			if(this.ele[i].name===name&&this.ele[i].id===id&&press===1)this.ele[i].pres=press;
			else if(this.ele[i].name===name&&this.ele[i].id!==id)
			{
				
				this.ele[i].pres=0;
								
			}								
		}		
	};		
	this.acction=function()
	{
		for(var i=0;i < this.ele.length; i++)
		{
			this.ele[i].run();						
		}
	};
	this.main=function()
	{
		for(var i=1;isReady("#"+this.name+i+""); i++)
		{
			var x=new actv(i);
			x.name=this.name;
			x.scla=this.scla;
			this.max_lvl=x.levl=1;
			if(isJQ("#"+x.name+x.id+"",".activ_on"))x.pres=1;		
			this.add(x);
			delete x;
		}
		for(var i=0;i<this.ele.length;i++)
		{		
			for(var j=1;isReady("#"+this.ele[i].name+this.ele[i].id+"_"+j+"");j++)
			{
				var x1= new actv(j);
				x1.name=this.ele[i].name+this.ele[i].id+"_";
				x1.scla=this.ele[i].scla+this.ele[i].id+"_";
				if(isJQ("#"+x1.name+x1.id+"",".activ_on"))x1.pres=1;
				if(this.ele[i].nsca===0)this.max_lvl++;
				this.ele[i].nsca++;
				x1.levl=this.max_lvl;						
				this.add(x1);			
				delete x1;			
			}				
		}		
		itms.acction();
	};
	
}

var itms= new doc("activ_","scla_");
//ACTIVAR TITULOS: 
//-----------------------------!!!!!!!!!!!!!
		itms.addTitulos_bool=1;
//-----------------------------!!!!!!!!!!!!!
//O puede usar una clase scla_noTiti al lado de su scla_#.
//Para hacer un activ_# toggle use la clase activ_togg.
$(document).ready(function()
{
	itms.main();	
});


