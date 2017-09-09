
function listComponentes(cliente,callback){
	var query=cliente.query("select distinct nombre from articulo",function(error,result){
		if(error){
			callback(error,null);
		}
		else{
			callback(null,result.rows);
		}

	});
	query.on('end',function(){
		cliente.end();
	});
}

function listarArticuloCPU(cliente,callback){
	var str="select a.info,a.precio,cpu.cache,cpu.mhz,cpu.turbob from articulo a inner join cpu on cpu.id_cpu=a.serial";
	var query=cliente.query(str, function(err, results) {
  		if(err){
  			console.log("O este es el error: ",err);
  			callback(err,null);
  			
  		}
  		else{
  			callback(null,results.rows);
  		}
	});
	query.on('end',function(){
		cliente.end();
	});
}

function listarArticuloTarjeta(cliente,callback){
	var str="select a.info,a.precio,t.gb,t.mhz from articulo a inner join tarjeta_grafica t on t.id_tarjeta=a.serial";
	var query=cliente.query(str, function(err, results) {
  		if(err){
  			console.log("O este es el error: ",err);
  			callback(err,null);
  			
  		}
  		else{
  			callback(null,results.rows);
  		}
	});
	query.on('end',function(){
		cliente.end();
	});
}


function listarArticuloAlmacenamiento(cliente,callback){
	var str="select a.info,a.precio,al.gb,al.rpm from articulo a inner join almacenamiento al  on al.id_almacenamiento=a.serial";
	var query=cliente.query(str, function(err, results) {
  		if(err){
  			console.log("O este es el error: ",err);
  			callback(err,null);
  			
  		}
  		else{
  			callback(null,results.rows);
  		}
	});
	query.on('end',function(){
		cliente.end();
	});
}

function listarArticuloRAM(cliente,callback){
	var str="select a.info,a.precio,ram.mhz,ram.gb from articulo a inner join ram  on ram.id_ram=a.serial";
	var query=cliente.query(str, function(err, results) {
  		if(err){
  			console.log("O este es el error: ",err);
  			callback(err,null);
  			
  		}
  		else{
  			callback(null,results.rows);
  		}
	});
	query.on('end',function(){
		cliente.end();
	});
}



function listarArticuloAudio(cliente,callback){
	var str="select a.info,a.precio,audio.descripcion from articulo a inner join audio  on audio.id_audio=a.serial";
	var query=cliente.query(str, function(err, results) {
  		if(err){
  			console.log("O este es el error: ",err);
  			callback(err,null);
  			
  		}
  		else{
  			callback(null,results.rows);
  		}
	});
	query.on('end',function(){
		cliente.end();
	});
}


function listarArticuloPantalla(cliente,callback){
	var str="select a.info,a.precio,p.tactil, p.antireflectiva, p.resolucion, p.dimension from articulo a inner join Pantalla p  on p.serial=a.serial";
	var query=cliente.query(str, function(err, results) {
  		if(err){
  			console.log("O este es el error: ",err);
  			callback(err,null);
  			
  		}
  		else{
  			callback(null,results.rows);
  		}
	});
	query.on('end',function(){
		cliente.end();
	});
}


function listarArticuloAudifono(cliente,callback){
  var str="select a.info,a.precio, au.radiofre,au.descripcion from articulo a inner join Audifono au  on au.id_audifono=a.serial";
  var query=cliente.query(str, function(err, results) {
      if(err){
        console.log("O este es el error: ",err);
        callback(err,null);
        
      }
      else{
        callback(null,results.rows);
      }
  });
  query.on('end',function(){
    cliente.end();
  });
}


function listarArticuloMouse(cliente,callback){
  var str="select a.info,a.precio, m.inalambrico,m.descripcion from articulo a inner join Mouse m  on m.id_mouse=a.serial";
  var query=cliente.query(str, function(err, results) {
      if(err){
        console.log("O este es el error: ",err);
        callback(err,null);
      }
      else{
        callback(null,results.rows);
      }
  });
  query.on('end',function(){
    cliente.end();
  });
}


function obtenerPrecio(cliente,articulo,callback){
  var str="select articulo.precio from articulo where articulo.info='"+articulo+"'";
  var query=cliente.query(str,function(err,result){
    if(err){
      callback(err,null);
    }
    else{
      callback(null,result.rows[0].precio);
    }
  });
  query.on('end',function(){
    cliente.end();
  });
}

function obtenerTipo(cliente,articulo,callback){
  var str="select nombre from articulo where info='"+articulo+"'";
  var query=cliente.query(str,function(err,result){
    if(err){
      callback(err,null);

    }else{
      callback(null,result.rows);
    }
  });
}

function obtenerTipoId(cliente,articulo,callback){
  var str="select nombre from articulo where serial='"+articulo+"'";
  var query=cliente.query(str,function(err,result){
    if(err){
      callback(err,null);

    }else{
      callback(null,result.rows);
    }
  });
}


function obtenerIds(cliente,articulo,callback){
  var str="select serial from articulo where info='"+articulo+"'";
  var query=cliente.query(str,function(err,result){
    if(err){
      console.log("ERROR: ",err);
    }
    else{
      callback(null,result.rows);
    }
  });
  query.on('end',function(){
    cliente.end();
  });
}


function insertarPC(cliente,nombre,callback){
  console.log("nombre: "+nombre);
  var str="insert into pc(id_pc,nombre) values(nextval('pc_id_pc_seq'::regclass),'"+nombre+"') returning id_pc";
  var query=cliente.query(str,function(err,result){
    if(err){
      callback(err,null);
    }
    else{
      callback(null,result.rows);
    }
  });
  query.on('end',function(){
    cliente.end();
  });
}

function insertarCompo(cliente,tipo,componente,idpc,callback){
  console.log(tipo+" "+componente);
  console.log(idpc);
  var str="";
  if(tipo=="Tarjeta Grafica"){
    str="insert into pc_tarjeta (id,id_pc,id_tarjeta) values(nextval('pc_tarjeta_id_seq'::regclass),"+idpc+","+componente+")";
  }
  else{
    var inf=tipo.toLowerCase();
    str="insert into pc_"+inf+" (id,id_pc,id_"+inf+") values(nextval('pc_"+inf+"_id_seq'::regclass),"+idpc+","+componente+")";
  }
  var query=cliente.query(str);
   query.on('end',function(){
    cliente.end();
  });
}


function insertarCliente(cliente,usuario,idpc,callback){
  var str="insert into cliente(id,cedula,nombre,apellido,telefono,direccion) values(nextval('cliente_id_seq'::regclass),'"+usuario.cedula+"','"+usuario.nombre+"','"+usuario.apellido+"','"+usuario.telefono+"','"+usuario.direccion+"') returning id";
  var query=cliente.query(str,function(err,result){
    if(err){
      console.log("ERROR: ",err);
    }
    else{
      callback(null,result.rows);
    }
  });
  query.on('end',function(){
    cliente.end();
  })
}


function insertarFactura(cliente,fecha,cedula,idpc,callback){

  var str="insert into factura(id_factura,id_cliente,pc,fecha) values("+idpc+","+cedula+","+idpc+",'"+fecha+"') returning id_factura";
  var query=cliente.query(str,function(err,result){
    if(err){
      console.log("ERROR: ",err);
    }
    else {
      callback(null,result.rows);
    }
  });
  query.on('end',function(){
    cliente.end();
  });
}

/*function obtenerCantidadArticulos(cliente,callback){
  var str="select count(a.nombre)cont from(select distinct nombre from articulo)a group by a.nombre";
  var query=cliente.query(str,function(er,result){
    if(er){
      callback(er,null);
    }else{
      callback(null,result.rows[0].cont);
    }
  });
  query.on('end',function(){
    cliente.end();
  })
}*/
function insertarAcce(cliente,accesorio,factura){
  var str="insert into factura_articulo(id_factura,id_articulo) values("+factura+","+accesorio+")";
  var query=cliente.query(str);
  query.on('end',function(){
    cliente.end();
  });
}

// function obtenerPrecioFactura(cliente,id_factura,callback){
//   console.log("id factura: "+id_factura);
  
//   var str="select sum(articulo.precio) from articulo,pc_ram,factura where articulo.serial=pc_ram.id_ram and factura.id_factura=pc_ram.id_pc and factura.id_factura="+String(id_factura);
//   var query= cliente.query(str,function(err,results){
//     if(err){
//       console.log("ERROR: "+err)
//       callback(err,null);
//     }
//     else{
//       console.log(results);
//       callback(null,results.rows[0]);
//     }
//   });

//   query.on('end',function(){
//   cliente.end();
// });
// }


function insertPrecioFactura(cliente,precio,id_factura){
  var str="update factura set precio="+precio+" where id_factura= "+id_factura;
  var query=cliente.query(str);
  query.on('end',function(){
    cliente.end();
  });
}

function comprobarAdmin(cliente,user,pass,callback){
  var str="select nombre from cliente where cliente.nombre='"+user+"' and "+" cliente.cedula='"+pass+"'";
  var query=cliente.query(str,function(err,result){
    if(err){
      console.log("ERROR: "+err);
    }
    else{
      if(result.rowCount===0){
        console.log(false);
        callback(null,false);
      }else{
        console.log(true)
        callback(null,true);
      }
    }
  });
  query.on('end',function(){
    cliente.end();
  })
}

function insertarPantalla(cliente,pantalla,callback){

  var str="insert into articulo(serial,info,nombre,precio) values(nextval('articulo_serial_seq'::regclass),'"+pantalla.nombre+"','Pantalla',"+pantalla.precio+") returning serial";
  var query=cliente.query(str,function(err,result){
      if(err){
        console.log("ERROR: "+err);
      }
      else{
        callback(null,result.rows[0].serial);
      }
  });
  query.on('end',function(){
    cliente.end();
  });
}

function insertarPantallaC(cliente,id,pantalla){
  console.log("id: "+id);
  var str="insert into pantalla(serial,tactil,antireflectiva,resolucion,dimension) values("+id+","+pantalla.tactil+","+pantalla.antireflejo+",'"+pantalla.resolucion+"','"+pantalla.dimension+"')";
  var query=cliente.query(str);
  query.on('end',function(){
    cliente.end();
  });
}


function insertarCPU(cliente,cpu,callback){

  var str="insert into articulo(serial,info,nombre,precio) values(nextval('articulo_serial_seq'::regclass),'"+cpu.nombre+"','CPU',"+cpu.precio+") returning serial";
  var query=cliente.query(str,function(err,result){
      if(err){
        console.log("ERROR: "+err);
      }
      else{
        callback(null,result.rows[0].serial);
      }
  });
  query.on('end',function(){
    cliente.end();
  });
}

function insertarCPUC(cliente,id,cpu){
  console.log(cpu);
  var str="insert into cpu(id_cpu,mhz,turbob,cache) values("+id+","+cpu.mhz+","+cpu.turbob+","+cpu.cache+")";
  var query=cliente.query(str);
  query.on('end',function(){
    cliente.end();
  });
}
//module.exports.obtenerPrecioFactura=obtenerPrecioFactura;


function insertarRAM(cliente,ram,callback){

  var str="insert into articulo(serial,info,nombre,precio) values(nextval('articulo_serial_seq'::regclass),'"+ram.nombre+"','RAM',"+ram.precio+") returning serial";
  var query=cliente.query(str,function(err,result){
      if(err){
        console.log("ERROR: "+err);
      }
      else{
        callback(null,result.rows[0].serial);
      }
  });
  query.on('end',function(){
    cliente.end();
  });
}

function insertarRAMC(cliente,id,ram){
  console.log(ram);
  var str="insert into ram(id_ram,mhz,gb) values("+id+","+ram.mhz+","+ram.gb+")";
  var query=cliente.query(str);
  query.on('end',function(){
    cliente.end();
  });
}


function insertarAUDIO(cliente,audio,callback){

  var str="insert into articulo(serial,info,nombre,precio) values(nextval('articulo_serial_seq'::regclass),'"+audio.nombre+"','Audio',"+audio.precio+") returning serial";
  var query=cliente.query(str,function(err,result){
      if(err){
        console.log("ERROR: "+err);
      }
      else{
        callback(null,result.rows[0].serial);
      }
  });
  query.on('end',function(){
    cliente.end();
  });
}

function insertarAUDIOC(cliente,id,audio){
  console.log(audio);
  var str="insert into audio(id_audio,descripcion) values("+id+",'"+audio.descripcion+"')";
  var query=cliente.query(str);
  query.on('end',function(){
    cliente.end();
  });
}


function insertarAlmacenamiento(cliente,almacenamiento,callback){

  var str="insert into articulo(serial,info,nombre,precio) values(nextval('articulo_serial_seq'::regclass),'"+almacenamiento.nombre+"','Audio',"+almacenamiento.precio+") returning serial";
  var query=cliente.query(str,function(err,result){
      if(err){
        console.log("ERROR: "+err);
      }
      else{
        callback(null,result.rows[0].serial);
      }
  });
  query.on('end',function(){
    cliente.end();
  });
}

function insertarAlmacenamientoC(cliente,id,almacenamiento){
  console.log(almacenamiento);
  var str="insert into almacenamiento(id_almacenamiento,gb,rpm) values("+id+","+almacenamiento.gb+","+almacenamiento.rpm+")";
  var query=cliente.query(str);
  query.on('end',function(){
    cliente.end();
  });
}


function insertarTarjetaG(cliente,tarjeta,callback){

  var str="insert into articulo(serial,info,nombre,precio) values(nextval('articulo_serial_seq'::regclass),'"+tarjeta.nombre+"','Audio',"+tarjeta.precio+") returning serial";
  var query=cliente.query(str,function(err,result){
      if(err){
        console.log("ERROR: "+err);
      }
      else{
        callback(null,result.rows[0].serial);
      }
  });
  query.on('end',function(){
    cliente.end();
  });
}

function insertarTarjetaGC(cliente,id,tarjeta){
  console.log(tarjeta);
  var str="insert into tarjeta_grafica(id_tarjeta,gb,mhz) values("+id+","+tarjeta.gb+","+tarjeta.mhz+")";
  var query=cliente.query(str);
  query.on('end',function(){
    cliente.end();
  });
}
module.exports.insertarTarjetaG=insertarTarjetaG;
module.exports.insertarTarjetaGC=insertarTarjetaGC;
module.exports.insertarAlmacenamiento=insertarAlmacenamiento;
module.exports.insertarAlmacenamientoC=insertarAlmacenamientoC;
module.exports.insertarAUDIO=insertarAUDIO;
module.exports.insertarAUDIOC=insertarAUDIOC;
module.exports.insertarRAM=insertarRAM;
module.exports.insertarRAMC=insertarRAMC;
module.exports.insertarCPUC=insertarCPUC;
module.exports.insertarCPU=insertarCPU;
module.exports.insertarPantallaC=insertarPantallaC;
module.exports.insertarPantalla=insertarPantalla;
module.exports.comprobarAdmin=comprobarAdmin;
//module.exports.obtenerCantidadArticulos=obtenerCantidadArticulos;
module.exports.insertPrecioFactura=insertPrecioFactura;
module.exports.obtenerTipoId=obtenerTipoId;
module.exports.insertarPC=insertarPC;
module.exports.insertarAcce=insertarAcce;
module.exports.insertarFactura=insertarFactura;
module.exports.insertarCliente=insertarCliente;
module.exports.obtenerIds=obtenerIds;
module.exports.listComponentes=listComponentes;
module.exports.listarArticuloCPU=listarArticuloCPU;
module.exports.listarArticuloTarjeta=listarArticuloTarjeta;
module.exports.listarArticuloAlmacenamiento=listarArticuloAlmacenamiento;
module.exports.listarArticuloRAM=listarArticuloRAM;
module.exports.listarArticuloAudio=listarArticuloAudio;
module.exports.listarArticuloPantalla=listarArticuloPantalla;
module.exports.listarArticuloMouse=listarArticuloMouse;
module.exports.listarArticuloAudifono=listarArticuloAudifono;
module.exports.obtenerPrecio=obtenerPrecio;
module.exports.obtenerTipo=obtenerTipo;
module.exports.insertarCompo=insertarCompo;
