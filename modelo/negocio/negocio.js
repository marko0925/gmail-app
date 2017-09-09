
 function obtenerComponentes(bd,jq,callback){
	var cliente=bd.ConBD();
	jq.listComponentes(cliente,function(error,datos){
		if(error){
			callback(error,null);
		}
		else{
			callback(null,datos);
		}
	});
}


function obtenerListaArticulo(bd,jq,articulo,callback){
	var cliente=bd.ConBD();
	if(articulo=='CPU'){
		var res=jq.listarArticuloCPU(cliente,function(error,datos){
			if(error){
				callback(error,null);
			}
			else{
				callback(null,datos);
			}
		});
	}
	else if(articulo=='Tarjeta Grafica'){
		var res=jq.listarArticuloTarjeta(cliente,function(error,datos){
			if(error){
				callback(error,null);
			}
			else{
				callback(null,datos);
			}
		});
	}
	else if(articulo=='Almacenamiento'){
		var res=jq.listarArticuloAlmacenamiento(cliente,function(error,datos){
			if(error){
				callback(error,null);
			}
			else{
				callback(null,datos);
			}
		});
	}
	else if(articulo=='RAM'){
			var res=jq.listarArticuloRAM(cliente,function(error,datos){
			if(error){
				callback(error,null);
			}
			else{
				callback(null,datos);
			}
		});
	}
	else if(articulo=='Audio'){
		var res=jq.listarArticuloAudio(cliente,function(error,datos){
			if(error){
				callback(error,null);
			}
			else{
				callback(null,datos);
			}
		});
	}
	else if(articulo=='Audifono'){
		var res=jq.listarArticuloAudifono(cliente,function(error,datos){
			if(error){
				callback(error,null);
			}
			else{
				callback(null,datos);
			}
		});
	}
	else if(articulo=='Mouse'){
		var res=jq.listarArticuloMouse(cliente,function(error,datos){
			if(error){
				callback(error,null);
			}
			else{
				callback(null,datos);
			}
		});
	}
	else if(articulo=='Pantalla'){
		var res=jq.listarArticuloPantalla(cliente,function(error,datos){
			if(error){
				callback(error,null);
			}
			else{
				callback(null,datos);
			}
		});
	}


}

function obtenerTipo(bd,jq,articulo,callback){
	var cliente=bd.ConBD();
	jq.obtenerTipo(cliente,articulo,function(err,result){
		if(err){
			callback(err,null);
		}
		else{
			callback(null,result);
		}
	});
}

function obtenerPrecio(bd,jq,articulo,callback){
	var cliente=bd.ConBD();
	jq.obtenerPrecio(cliente,articulo,function(error,result){
		if(error){
			callback(error,null);
		}
		else{
			callback(null,result);
		}
	});
}

var componentes="";
var accesorios="";
function facturar(req,bd,jq,precioT,nombrepc,articulos,usuario,callback){
	var cliente=null;
	req.session.auxArtc=articulos;

	function otra(id_factura,id_pc,i,req,callback){
		cliente=bd.ConBD();
		jq.obtenerIds(cliente,req.session.auxArtc[i].split("_")[1],function(err,result){
			if(err){
				console.log("ERROR: "+err);
			}else{
				var cliente=bd.ConBD();
				jq.obtenerTipoId(cliente,result[0].serial,function(error,result1){
					var cliente=bd.ConBD();
							if(result1[0].nombre=="CPU"){
								var cliente=bd.ConBD();
								jq.insertarCompo(cliente,result1[0].nombre,result[0].serial,id_pc);
							}
							else if(result1[0].nombre=="RAM"){
								var cliente=bd.ConBD();
								jq.insertarCompo(cliente,result1[0].nombre,result[0].serial,id_pc);
							}
							else if(result1[0].nombre=="Tarjeta Grafica"){
								var cliente=bd.ConBD();
								jq.insertarCompo(cliente,result1[0].nombre,result[0].serial,id_pc);
							}
							else if(result1[0].nombre=="Audio"){
								var cliente=bd.ConBD();
								jq.insertarCompo(cliente,result1[0].nombre,result[0].serial,id_pc);
							}
							else if(result1[0].nombre=="Almacenamiento"){
								var cliente=bd.ConBD();
								jq.insertarCompo(cliente,result1[0].nombre,result[0].serial,id_pc);
							}
							else if(result1[0].nombre=="Mouse"){
								var cliente=bd.ConBD();
								jq.insertarAcce(cliente,result[0].serial,id_factura);
							}
							else if(result1[0].nombre=="Pantalla"){
								var cliente=bd.ConBD();
								jq.insertarAcce(cliente,result[0].serial,id_factura);
							}
							else if(result1[0].nombre=="Audifono"){
								var cliente=bd.ConBD();
								jq.insertarAcce(cliente,result[0].serial,id_factura);
							}

							//seguir...
						});
			}
			
		
		});
		callback(null,true);
	}
	cliente=bd.ConBD();
	jq.insertarPC(cliente,nombrepc,function(err2,result2){
		req.session.id_pc=result2[0].id_pc;
		cliente=bd.ConBD();
		jq.insertarCliente(cliente,usuario,req.session.pc,function(error,result1){
			req.session.cedula=result1[0].id;
			cliente=bd.ConBD();
			var date = new Date;
			var seconds = date.getSeconds();
			var minutes = date.getMinutes();
			var hour = date.getHours();

			var year = date.getFullYear();
			var month = date.getMonth()+1; 
			var day = date.getDate();
			var str=year+"/"+month+"/"+day+"/"+hour+":"+minutes;
			jq.insertarFactura(cliente,str,req.session.cedula,req.session.id_pc,function(err3,result3){
				req.session.id_factura=result3[0].id_factura;
				for (var i = articulos.length - 1; i >= 1; i--) {
					otra(req.session.id_factura,req.session.id_pc,i,req,function(err,result){
						if(i==1){
							cliente=bd.ConBD();

							jq.insertPrecioFactura(cliente,precioT,result3[0].id_factura);
							// jq.obtenerPrecioFactura(cliente,result3[0].id_factura,function(err4,result4){
							// 	if(err4){
							// 		console.log("ERROR: ",err4);
							// 	}else{
							// 		req.session.precioF=result4;
							// 		cliente=bd.ConBD();
							// 		jq.insertPrecioFactura(cliente,result4,result3[0].id_factura);
							// 	}	
							// });
						}
					});
				}
				
				
			});
		});
	});
	callback(null,precioT);
}


/*
function obtenerCantidadArticulos(bd,jq,callback){
	var cliente=bd.ConBD();
	jq.obtenerCantidadArticulos(cliente,function(err,result){
		if(result){
			callback(null,result);
		}
	});
}*/

function comprobarAdmin(bd,jq,user,pass,callback){
	var cliente=bd.ConBD();
	jq.comprobarAdmin(cliente,user,pass,function(err,result){
		if(result){
			console.log("resultado: "+result);
			callback(null,result);
		}else{
			callback(null,result);
		}
	});
}

function insertarPantalla(bd,jq,pantalla){
	var cliente=bd.ConBD();
	jq.insertarPantalla(cliente,pantalla,function(err,result){
		if(result){
			cliente=bd.ConBD();
			jq.insertarPantallaC(cliente,result,pantalla);
		}
	});
}


function insertarCPU(bd,jq,cpu){
	var cliente=bd.ConBD();
	jq.insertarCPU(cliente,cpu,function(err,result){
		if(result){
			cliente=bd.ConBD();
			jq.insertarCPUC(cliente,result,cpu);
		}
	});
}

function insertarRAM(bd,jq,ram){
	var cliente=bd.ConBD();
	jq.insertarCPU(cliente,ram,function(err,result){
		if(result){
			cliente=bd.ConBD();
			jq.insertarCPUC(cliente,result,ram);
		}
	});
}
function insertarAUDIO(bd,jq,audio){
	var cliente=bd.ConBD();
	jq.insertarAUDIO(cliente,audio,function(err,result){
		if(result){
			cliente=bd.ConBD();
			jq.insertarAUDIOC(cliente,result,audio);
		}
	});
}
function insertarAlmacenamiento(bd,jq,almacenamiento){
	var cliente=bd.ConBD();
	jq.insertarAlmacenamiento(cliente,almacenamiento,function(err,result){
		if(result){
			cliente=bd.ConBD();
			jq.insertarAlmacenamientoC(cliente,result,almacenamiento);
		}
	});
}

function insertarTarjetaG(bd,jq,tarjeta){
	var cliente=bd.ConBD();
	jq.insertarTarjetaG(cliente,tarjeta,function(err,result){
		if(result){
			cliente=bd.ConBD();
			jq.insertarTarjetaGC(cliente,result,tarjeta);
		}
	});
}

module.exports.insertarTarjetaG=insertarTarjetaG;
module.exports.insertarAlmacenamiento=insertarAlmacenamiento;
module.exports.insertarAUDIO=insertarAUDIO;
module.exports.insertarRAM=insertarRAM;
module.exports.insertarCPU=insertarCPU;
module.exports.insertarPantalla=insertarPantalla;
module.exports.comprobarAdmin=comprobarAdmin;
//module.exports.obtenerCantidadArticulos=obtenerCantidadArticulos;
module.exports.obtenerPrecio=obtenerPrecio;
module.exports.obtenerComponentes=obtenerComponentes;
module.exports.obtenerListaArticulo=obtenerListaArticulo;
module.exports.obtenerTipo=obtenerTipo;
module.exports.facturar=facturar;
