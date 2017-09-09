
function formatListaCPU(vecArticulos,callback){
	var str="";
	for (var i = vecArticulos.length - 1; i >= 0; i--) {
		str+="<div class='col-sm-4 col-lg-4 col-md-4'> \n";
		str+="<div class='thumbnail'> \n";
		str+="<img src='http://placehold.it/320x150' alt=''> \n";
		str+="<div class='caption'> \n";
		str+="<div class='list-group'>";
		str+="<div class='list-group-item'>";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].info+"</span> \n";
		str+="<span class='text-muted small'><em>"+"Nombre"+"</em></span>";
		str+="</div>";
		str+="<div class='list-group-item'>";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].cache+" Mb</span> \n";
		str+="<span class=' text-muted small'><em>"+"Cache"+"</em></span>";
		
		str+="</div>";

		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].mhz+" 	</span> \n";
		str+="<span class=' text-muted small'><em>"+"Mhz"+"</em></span>";
		
		str+="</div>";
		str+="<div class='list-group-item'> \n";
		str+="<span class=' text-muted small'><em>"+"TurboBoost"+"</em></span>";
		if(vecArticulos[i].turbob===true){
			str+="<span class='pull-right text-muted '> Si </span> \n";
		}
		else{
			str+="<span class='pull-right text-muted '> No </span> \n";
		}
		str+="</div>";
		str+="</div>";
		str+="</div> \n";
		str+="<div class='ratings coloD'>";
		str+="<button class='btn btn-primary' id='"+vecArticulos[i].info+"' onClick='anadir(this.id)'>";
		str+="<i class='fa fa-shopping-cart' title='View 3 items in your shopping cart' aria-hidden='true'></i>";
		str+="<span>  </span>";
		str+="</button>";
		str+="<h5 class='pull-right'> \n";
		str+="$"+vecArticulos[i].precio+" \n";
		str+="</h5> \n";
		str+="</div>"
		str+="</div> \n";
		str+="</div> \n";
	}
	
	callback(null,str);
}

function formatListaTarjeta(vecArticulos,callback){
	var str="";
	for (var i = vecArticulos.length - 1; i >= 0; i--) {
		str+="<div class='col-sm-4 col-lg-4 col-md-4'> \n";
		str+="<div class='thumbnail'> \n";
		str+="<img src='http://placehold.it/320x150' alt=''> \n";
		str+="<div class='caption'> \n";
		str+="<div class='list-group'>";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].info+"</span> \n";
		str+="<span class='text-muted small'><em>"+"Nombre"+"</em></span>";
		str+="</div> \n";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].mhz+"</span> \n";
		str+="<span class='text-muted small'><em>"+"Mhz"+"</em></span>";
		str+="</div>";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].gb+"</span> \n";
		str+="<span class='text-muted small'><em>"+"GB"+"</em></span>";
		str+="</div>";
		str+="</div> \n";
		str+="</div> \n";
		str+="<div class='ratings coloD'>";
		
		str+="<button class='btn btn-primary' id='"+vecArticulos[i].info+"' onClick='anadir(this.id)'>";
		str+="<i class='fa fa-shopping-cart' title='View 3 items in your shopping cart' aria-hidden='true'></i>";
		str+="<span>  </span>";
		str+="</button>";
		str+="<h5 class='pull-right'> \n";
		str+="$"+vecArticulos[i].precio+" \n";
		str+="</h5> \n";
		str+="</div>"
		str+="</div> \n";
		str+="</div> \n";
	}
	
	callback(null,str);
}

function formatListaAlmacenamiento(vecArticulos,callback){
	var str="";
	for (var i = vecArticulos.length - 1; i >= 0; i--) {
		str+="<div class='col-sm-4 col-lg-4 col-md-4'> \n";
		str+="<div class='thumbnail'> \n";
		str+="<img src='http://placehold.it/320x150' alt=''> \n";
		str+="<div class='caption'> \n";
		
		str+="<div class='list-group'>";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].info+"</span> \n";
		str+="<span class='text-muted small'><em>"+"Nombre"+"</em></span>";
		str+="</div> \n";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].rpm+"</span> \n";
		str+="<span class='text-muted small'><em>"+"RPM"+"</em></span>";
		str+="</div>";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].gb+"</span> \n";
		str+="<span class='text-muted small'><em>"+"GB"+"</em></span>";
		str+="</div> \n";
		str+="</div> \n";
		str+="</div> \n";
		str+="<div class='ratings coloD'> \n";
		str+="<button class='btn btn-primary' id='"+vecArticulos[i].info+"' onClick='anadir(this.id)'>";
		str+="<i class='fa fa-shopping-cart' title='View 3 items in your shopping cart' aria-hidden='true'></i>";
		str+="<span> </span>";
		str+="</button>";
		
		str+="<h5 class='pull-right'> \n";
		str+="$"+vecArticulos[i].precio+" \n";
		str+="</h5> \n";
		str+="</div> \n"
		str+="</div> \n";
		str+="</div> \n";
	}
	
	callback(null,str);
}


function formatListaRAM(vecArticulos,callback){
	var str="";
	for (var i = vecArticulos.length - 1; i >= 0; i--) {
		str+="<div class='col-sm-4 col-lg-4 col-md-4'> \n";
		str+="<div class='thumbnail'> \n";
		str+="<img src='http://placehold.it/320x150' alt=''> \n";
		str+="<div class='caption'> \n";
		str+="<div class='list-group'>";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].info+"</span> \n";
		str+="<span class='text-muted small'><em>"+"Nombre"+"</em></span>";
		str+="</div> \n";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].mhz+"</span> \n";
		str+="<span class='text-muted small'><em>"+"Mhz"+"</em></span>";
		str+="</div>";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].gb+"</span> \n";
		str+="<span class='text-muted small'><em>"+"GB"+"</em></span>";
		str+="</div> \n";
		str+="</div> \n";
		str+="</div> \n";
		str+="<div class='ratings coloD'>";
		
		str+="<button class='btn btn-primary' id='"+vecArticulos[i].info+"' onClick='anadir(this.id)'>";
		str+="<i class='fa fa-shopping-cart' title='View 3 items in your shopping cart' aria-hidden='true'></i>";
		str+="<span> </span>";
		str+="</button>";
		str+="<h5 class='pull-right'> \n";
		str+="$"+vecArticulos[i].precio+" \n";
		str+="</h5> \n";
		str+="</div>"
		str+="</div> \n";
		str+="</div> \n";
	}
	
	callback(null,str);
}


function formatListaAudio(vecArticulos,callback){
	var str="";
	for (var i = vecArticulos.length - 1; i >= 0; i--) {
		str+="<div class='col-sm-4 col-lg-4 col-md-4'> \n";
		str+="<div class='thumbnail'> \n";
		str+="<img src='http://placehold.it/320x150' alt=''> \n";
		str+="<div class='caption'> \n";
		str+="<div class='list-group'>";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].info+"</span> \n";
		str+="<span class='text-muted small'><em>"+"Nombre"+"</em></span>";
		str+="</div> \n";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].descripcion+"</span> \n";
		str+="<span class='text-muted small'><em>"+"Descripcion"+"</em></span>";
		str+="</div> \n";
		str+="</div> \n";
		str+="</div> \n";
		str+="<div class='ratings coloD'>";
		
		str+="<button class='btn btn-primary' id='"+vecArticulos[i].info+"' onClick='anadir(this.id)'>";
		str+="<i class='fa fa-shopping-cart' title='View 3 items in your shopping cart' aria-hidden='true'></i>";
		str+="<span> </span>";
		str+="</button>";
		str+="<h5 class='pull-right'> \n";
		str+="$"+vecArticulos[i].precio+" \n";
		str+="</h5> \n";
		str+="</div>"
		str+="</div> \n";
		str+="</div> \n";
	}
	
	callback(null,str);
}


function formatListaPantalla(vecArticulos,callback){
	var str="";
	for (var i = vecArticulos.length - 1; i >= 0; i--) {
		str+="<div class='col-sm-4 col-lg-4 col-md-4'> \n";
		str+="<div class='thumbnail'> \n";
		str+="<img src='http://placehold.it/320x150' alt=''> \n";
		str+="<div class='caption'> \n";
		str+="<div class='list-group'>";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].info+"</span> \n";
		str+="<span class='text-muted small'><em>"+"Nombre"+"</em></span>";
		str+="</div> \n";
		str+="<div class='list-group-item'> \n";
		if(vecArticulos[i].tactil===true){
			str+="<span class='pull-right text-muted '> Si</span> \n";
		str+="<span class='text-muted small'><em>"+"Tactil"+"</em></span>";
		}
		else{
			str+="<span class='pull-right text-muted '>No</span> \n";
		str+="<span class='text-muted small'><em>"+"Tactil"+"</em></span>";
		}
		str+="</div> \n";
		str+="<div class='list-group-item'> \n";
		if(vecArticulos[i].antireflectiva===true){
			str+="<span class='pull-right text-muted '>Si</span> \n";
		str+="<span class='text-muted small'><em>"+"Antireflectiva"+"</em></span>";
		}
		else{
			str+="<span class='pull-right text-muted '>No</span> \n";
		str+="<span class='text-muted small'><em>"+"Antireflectiva"+"</em></span>";
		}
		str+="</div> \n";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].resolucion+"</span> \n";
		str+="<span class='text-muted small'><em>"+"Resolucion"+"</em></span>";
		str+="</div> \n";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].dimension+"</span> \n";
		str+="<span class='text-muted small'><em>"+"Dimension"+"</em></span>";
		str+="</div> \n";
		str+="</div> \n";
		str+="</div> \n";
		str+="<div class='ratings coloD'>";
		
		str+="<button class='btn btn-primary' id='"+vecArticulos[i].info+"' onClick='anadir(this.id)'>";
		str+="<i class='fa fa-shopping-cart' title='View 3 items in your shopping cart' aria-hidden='true'></i>";
		str+="<span> </span>";
		str+="</button>";
		str+="<h5 class='pull-right'> \n";
		str+="$"+vecArticulos[i].precio+" \n";
		str+="</h5> \n";
		str+="</div>"
		str+="</div> \n";
		str+="</div> \n";
	}
	
	callback(null,str);
}


function formatListaAudifono(vecArticulos,callback){
	var str="";
	for (var i = vecArticulos.length - 1; i >= 0; i--) {
		str+="<div class='col-sm-4 col-lg-4 col-md-4'> \n";
		str+="<div class='thumbnail'> \n";
		str+="<img src='http://placehold.it/320x150' alt=''> \n";
		str+="<div class='caption'> \n";
		str+="<div class='list-group'>";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].info+"</span> \n";
		str+="<span class='text-muted small'><em>"+"Nombre"+"</em></span>";
		str+="</div> \n";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].radiofre+"</span> \n";
		str+="<span class='text-muted small'><em>"+"RadioFrecuencia"+"</em></span>";
		str+="</div> \n";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].descripcion+"</span> \n";
		str+="<span class='text-muted small'><em>"+"Descripcion"+"</em></span>";
		str+="</div> \n";
		str+="</div> \n";
		str+="</div> \n";
		str+="<div class='ratings coloD'>";
		
		str+="<button class='btn btn-primary' id='"+vecArticulos[i].info+"' onClick='anadir(this.id)'>";
		str+="<i class='fa fa-shopping-cart' title='View 3 items in your shopping cart' aria-hidden='true'></i>";
		str+="<span></span>";
		str+="</button>";
		str+="<h5 class='pull-right'> \n";
		str+="$"+vecArticulos[i].precio+" \n";
		str+="</h5> \n";
		str+="</div>"
		str+="</div> \n";
		str+="</div> \n";
	}
	
	callback(null,str);
}

function formatListaMouse(vecArticulos,callback){
	var str="";
	for (var i = vecArticulos.length - 1; i >= 0; i--) {
		str+="<div class='col-sm-4 col-lg-4 col-md-4'> \n";
		str+="<div class='thumbnail'> \n";
		str+="<img src='http://placehold.it/320x150' alt=''> \n";
		str+="<div class='caption'> \n";
		str+="<div class='list-group'>";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].info+"</span> \n";
		str+="<span class='text-muted small'><em>"+"Nombre"+"</em></span>";
		str+="</div> \n";
		str+="<div class='list-group-item'> \n";
		if(vecArticulos[i].inalambrico==true){
			str+="<span class='pull-right text-muted '>Si</span> \n";
		str+="<span class='text-muted small'><em>"+"Inalambrico"+"</em></span>";
		}else{
			str+="<span class='pull-right text-muted '>No</span> \n";
		str+="<span class='text-muted small'><em>"+"Inalambrico"+"</em></span>";
		}
		str+="</div> \n";
		str+="<div class='list-group-item'> \n";
		str+="<span class='pull-right text-muted '>"+vecArticulos[i].descripcion+"</span> \n";
		str+="<span class='text-muted small'><em>"+"Descripcion"+"</em></span>";
		str+="</div> \n";
		str+="</div> \n";
		str+="</div> \n";
		str+="<div class='ratings coloD'>";
		
		str+="<button class='btn btn-primary' id='"+vecArticulos[i].info+"' onClick='anadir(this.id)'>";
		str+="<i class='fa fa-shopping-cart' title='View 3 items in your shopping cart' aria-hidden='true'></i>";
		str+="<span> </span>";
		str+="</button>";
		
		
		str+="<h5 class='pull-right'> \n";
		str+="$"+vecArticulos[i].precio+" \n";
		str+="</h5> \n";
		
		str+="</div>";
		str+="</div>"
		str+="</div> \n";
		str+="</div> \n";
	}
	
	callback(null,str);
}




module.exports.formatListaCPU=formatListaCPU;
module.exports.formatListaTarjeta=formatListaTarjeta;
module.exports.formatListaAlmacenamiento=formatListaAlmacenamiento;
module.exports.formatListaRAM=formatListaRAM;
module.exports.formatListaAudio=formatListaAudio;
module.exports.formatListaPantalla=formatListaPantalla;
module.exports.formatListaAudifono=formatListaAudifono;
module.exports.formatListaMouse=formatListaMouse;