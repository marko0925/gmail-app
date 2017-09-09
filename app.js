var express= require("express");
var bodyparser= require("body-parser");
var negocio = require("./modelo/negocio/negocio.js")
var bd= require("./modelo/database/bd.js");
var jq= require("./modelo/database/jq.js");
var formatInfo = require("./modelo/formatearInfo/informacionFormateada.js");
var session = require("express-session");
//iniciarlizar el servidor express()
var app= express();
//configuramos e inicializamos la base de datos postgress

//configuraciones del servidor
app.set("view engine","jade");
app.use("/estatico",express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.set("views","views");
app.use(session({
	secret:"32131iri9rhr9",
	resave:"false",
	saveUninitialized:"false"
	
}));


//rutas GET
app.get("/",function(req,res){

	res.render("index",{url:"index"});
});

app.get("/design",function(req,res){
	negocio.obtenerComponentes(bd,jq,function(error,datos){
		if(error){
			res.render("error");
		}
		else{

			res.render("design",{url:"design",listaC:datos});
		}
		
	});
	
});


app.get("/administracion",function(req,res){
	

		negocio.obtenerComponentes(bd,jq,function(er,resul){
			var str="<div class='btn-group-vertical' role='group' aria-label='...'>";
  
			str+="<button type='button' class='btn btn-primary' name='g' onclick='añadir"+resul[0].nombre+"()'>Agregar "+resul[0].nombre+"</button>";
			str+="<button type='button' class='btn btn-primary' name='g' onclick='añadir"+resul[1].nombre+"()'>Agregar "+resul[1].nombre+"</button>";
			str+="<button type='button' class='btn btn-primary'  name='g' onclick='añadir"+resul[2].nombre+"()'>Agregar "+resul[2].nombre+"</button>";
			str+="<button type='button'class='btn btn-primary'  name='g' onclick='añadir"+resul[3].nombre+"()'>Agregar "+resul[3].nombre+"</button>";
			str+="<button type='button'class='btn btn-primary'  name='g' onclick='añadir"+resul[4].nombre+"()'>Agregar "+resul[4].nombre+"</button>";
			str+="<button type='button'class='btn btn-primary' name='g'  onclick='añadir"+resul[5].nombre+"()'>Agregar "+resul[5].nombre+"</button>";
			str+="<button type='button'class='btn btn-primary'  name='g' onclick='añadir"+resul[6].nombre+"()'>Agregar "+resul[6].nombre+"</button>";
			str+="<button type='button'class='btn btn-primary'  name='g' onclick='añadir"+resul[7].nombre+"()'>Agregar "+resul[7].nombre+"</button>";	
			str+="</div>";
			res.render("administracion",{dato:str});
	
	
	});
	
});

app.get("/admin",function(req,res){
	res.render("admin");

	
});

app.get("/info",function(req,res){
	res.render("info",{url:"info",war:req.session.info});
});

app.get("/comprar",function(req,res){
	console.log("PPPPPrecio "+req.session.precioNT);
	res.render("comprar",{url:"compra",precioC:req.session.precioNT});
});
//rutas POST

// obtener listado de CPUs

app.post("/administracion",function(req,res){
	var user=req.body.username;
	var pass=req.body.passwod;
	negocio.comprobarAdmin(bd,jq,user,pass,function(err,result){
		console.log("result: "+result);
		if(result){
			res.redirect("administracion");
		}else{
			res.redirect("admin");
		}
	});
});
app.post("/listArticulo",function(req,res){
	negocio.obtenerListaArticulo(bd,jq,req.body.articulo,function(error,datos){
		if(error){
			console.log("Este es el error: "+error);
		}
		else{
			if(req.body.articulo=='CPU'){
				formatInfo.formatListaCPU(datos,function(error,result){
					if(error){
						res.render("error");
					}
					else{
						res.send(result);
					}
				});
			}
			else if(req.body.articulo=='Tarjeta Grafica'){
				formatInfo.formatListaTarjeta(datos,function(error,result){
					if(error){
						res.render("error");
					}
					else{
						res.send(result);
					}
				});
			}
			else if(req.body.articulo=='Almacenamiento'){
				formatInfo.formatListaAlmacenamiento(datos,function(error,result){
					if(error){
						res.render("error");
					}
					else{
						res.send(result);
					}
				});
			}
			else if(req.body.articulo=='RAM'){
				formatInfo.formatListaRAM(datos,function(error,result){
					if(error){
						res.render("error");
					}
					else{
						res.send(result);
					}
				});
			}
			else if(req.body.articulo=='Audio'){
				formatInfo.formatListaAudio(datos,function(error,result){
					if(error){
						res.render("error");
					}
					else{
						res.send(result);
					}
				});
			}
			else if(req.body.articulo=='Pantalla'){
				formatInfo.formatListaPantalla(datos,function(error,result){
					if(error){
						res.render("error");
					}
					else{
						res.send(result);
					}
				});
			}
			else if(req.body.articulo=='Audifono'){
				formatInfo.formatListaAudifono(datos,function(error,result){
					if(error){
						res.render("error");
					}
					else{
						res.send(result);
					}
				});
			}
			else if(req.body.articulo=='Mouse'){
				formatInfo.formatListaMouse(datos,function(error,result){
					if(error){
						res.render("error");
					}
					else{
						res.send(result);
					}
				});
			}
		}
	});
	
});


app.post("/anadirCarrito",function(req,res){
	var str=req.body.producto;
		negocio.obtenerTipo(bd,jq,str,function(error,result){
			req.session.producto+="-"+result[0].nombre;
			negocio.obtenerPrecio(bd,jq,str,function(error,result){
			//producto tiene por defecto un undefined
			req.session.producto+="_"+str;
			var car="";
			car+="<a  class='list-group-item' > \n";
			car+="<i class='fa fa-file fa-fw'></i> "+str;
			car+="<div class='pull-right'>";
			car+="<label class=' label label-danger'><em>$ "+result+"</em>";
			car+="</label>";
			car+="</div>";
			car+="</a>";
			
			req.session.productoshtml+=car;
			res.send(req.session.productoshtml+" <br><a class='btn btn-primary ' onclick='quitarCarrito()'>Vaciar carrito</a><button class='btn btn-primary pull-right' onclick='modalComprar()'>Comprar</button>");



			});
		});
		
	

});

app.post("/quitarCarrito",function(req,res){
	var str="<a  class='list-group-item' > \n";
	str+="<i class='fa fa-file fa-fw'></i> No hay articulos en el carrito";
	str+="</a>";
	req.session.producto="";
	req.session.productoshtml="";
	req.session.precioTotal=0;
	res.send(str);
});
app.post("/precioTotal",function(req,res){
	negocio.obtenerPrecio(bd,jq,req.body.precioArt,function(error,result){
		if(req.session.precioTotal==null){
			req.session.precioTotal=result;
			res.send("<label class='label label-danger'>Precio total: $"+result+"</label>");

		}else{
			req.session.precioTotal=req.session.precioTotal+result;
			res.send("<label class='label label-danger'>Precio total: $"+req.session.precioTotal+"</label>");
		}
	});
});

app.post("/comprar",function(req,res){
	var aux=[0,0,0,0,0];
	var vec=req.session.producto.split("-");
	for (var i = vec.length - 1; i >= 1; i--) {
		var vec2=vec[i].split("_");
		if(vec2[0]==="CPU"){
			aux[0]=1;
		}
		else if(vec2[0]==="RAM"){
			aux[1]=1;
		}
		else if(vec2[0]==="Tarjeta Grafica"){
			aux[2]=1;
		}
		else if(vec2[0]==="Almacenamiento"){
			aux[3]=1;
		}
		else if(vec2[0]==="Audio"){
			aux[4]=1;
		}
	}
	var str="<div class='jumbotron'>";
	str+="<h1><font color=black>¡Ups!</font></h1>";
	str+="<p><font color=black>Para poder facturar un pc personalizado es necesario que tenga almenos los siguientes componentes</font>";
	str+="<ul>";
	str+="<font color=black><li><span class='glyphicon glyphicon-ok-sign'>CPU</span></li></font>";
	str+="<font color=black><li><font color=black><span class='glyphicon glyphicon-ok-sign'><font color=black>Ram</span></li></font>";
	str+="<font color=black><li><font color=black><span class='glyphicon glyphicon-ok-sign'><font color=black>Tarjeta Grafica</span></li></font>";
	str+="<font color=black><li><font color=black><span class='glyphicon glyphicon-ok-sign'><font color=black>Almacenamiento</span></li></font>";
	str+="<font color=black><li><font color=black><span class='glyphicon glyphicon-ok-sign'><font color=black>Audio</span></li></font>";
	str+"</ul>";
	str+="</p>";
	str+="<p><a class='btn btn-primary btn-lg' href='/design' role='button'>Volver</a></p>";
	str+="</div>";
	var j=0;
	while(j<aux.length){
		if(aux[j]===0){
			req.session.info=str;
			return res.redirect("info");
		}
		j++;
	}
	var articulos=req.session.producto.split("-");
	var nombrepc=req.body.nombrepc;
	var usuario= {
		nombre:req.body.nombrecliente,
		apellido:req.body.apellidocliente,
		cedula:req.body.cedulacliente,
		direccion:req.body.direccioncliente,
		telefono:req.body.telefonocliente
	};
	negocio.facturar(req,bd,jq,req.session.precioTotal,nombrepc,articulos,usuario,function(err,result){
		if(err){
			console.log("ERROR: ",err);
		}
		else{
			req.session.producto="";
			req.session.productoshtml="";
			req.session.precioTotal=0;
			console.log("precio: "+result);
			req.session.precioNT=""+result;
			res.redirect("comprar");
		}
	});		

});
app.post("/cargarFormularioPantalla",function(req,res){
	var str="<form action='/insertarPantalla' method='post'>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Nombre</font></label>";
	str+="<input type='text' class='form-control'  name='nombre' id='focusdireccion' placeholder='Nombre'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Tactil</font></label>";
	str+="<input type='text' class='form-control'  name='tactil' id='focusdireccion' placeholder='Tactil'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Antireflejo</font></label>";
	str+="<input type='text' class='form-control'  name='antireflejo' id='focusdireccion' placeholder='Antireflejo'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Resolucion</font></label>";
	str+="<input type='text' class='form-control'  name='resolucion' id='focusdireccion' placeholder='Resolucion'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Dimension</font></label>";
	str+="<input type='text' class='form-control'  name='dimension' id='focusdireccion' placeholder='Dimension'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Precio</font></label>";
	str+="<input type='text' class='form-control'  name='precio' id='focusdireccion' placeholder='Precio'>";
	str+="<input type='submit' class='btn btn-primary' value='Insertar'/>";
	str+="</form>";
	res.send(str);
});
app.post("/insertarPantalla",function(req,res){
	 
	var pantalla={
		nombre:req.body.nombre,
		precio:req.body.precio,
	 	tactil:req.body.tactil,
	 	antireflejo:req.body.antireflejo,
	 	dimension:req.body.dimension,
	 	resolucion:req.body.resolucion,
	};

	negocio.insertarPantalla(bd,jq,pantalla);
	res.redirect("administracion");
});



app.post("/cargarFormularioCPU",function(req,res){
	var str="<form action='/insertarCPU' method='post'>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Nombre</font></label>";
	str+="<input type='text' class='form-control'  name='nombre' id='focusdireccion' placeholder='Nombre'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Cache</font></label>";
	str+="<input type='text' class='form-control'  name='cache' id='focusdireccion' placeholder='Cache'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>TurboB</font></label>";
	str+="<input type='text' class='form-control'  name='turbo' id='focusdireccion' placeholder='TurboB'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Mhz</font></label>";
	str+="<input type='text' class='form-control'  name='mhz' id='focusdireccion' placeholder='Mhz'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Precio</font></label>";
	str+="<input type='text' class='form-control'  name='precio' id='focusdireccion' placeholder='Precio'>";
	str+="<input type='submit' class='btn btn-primary' value='Insertar'/>";
	str+="</div>";
	
	str+="</form>";
	res.send(str);
});
app.post("/insertarCPU",function(req,res){
	 
	var cpu={
		nombre:req.body.nombre,
		precio:req.body.precio,
	 	mhz:req.body.mhz,
	 	turbob:req.body.turbob,
	 	cache:req.body.cache,
	};

	negocio.insertarCPU(bd,jq,cpu);
	res.redirect("administracion");
});

app.post("/cargarFormularioRAM",function(req,res){
	var str="<form action='/insertarRAM' method='post'>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Nombre</font></label>";
	str+="<input type='text' class='form-control'  name='nombre' id='focusdireccion' placeholder='Nombre'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Mhz</font></label>";
	str+="<input type='text' class='form-control'  name='mhz' id='focusdireccion' placeholder='Mhz'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>GB</font></label>";
	str+="<input type='text' class='form-control'  name='gb' id='focusdireccion' placeholder='GB'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Precio</font></label>";
	str+="<input type='text' class='form-control'  name='precio' id='focusdireccion' placeholder='Precio'>";
	str+="</div>";
	
	str+="<input type='submit' class='btn btn-primary' value='Insertar'/>";
	str+="</div>";
	
	str+="</form>";
	res.send(str);
});
app.post("/insertarRAM",function(req,res){
	 
	var ram={
		nombre:req.body.nombre,
		precio:req.body.precio,
	 	mhz:req.body.mhz,
	 	turbob:req.body.gb,
	};

	negocio.insertarCPU(bd,jq,ram);
	res.redirect("administracion");
});

app.post("/cargarFormularioAUDIO",function(req,res){
	var str="<form action='/insertarAUDIO' method='post'>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Nombre</font></label>";
	str+="<input type='text' class='form-control'  name='nombre' id='focusdireccion' placeholder='Nombre'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Descripcion</font></label>";
	str+="<input type='text' class='form-control'  name='descripcion' id='focusdireccion' placeholder='Descripcion'>";
	str+="</div>";
	
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Precio</font></label>";
	str+="<input type='text' class='form-control'  name='precio' id='focusdireccion' placeholder='Precio'>";
	str+="</div>";
	
	str+="<input type='submit' class='btn btn-primary' value='Insertar'/>";
	str+="</div>";
	
	str+="</form>";
	res.send(str);
});

app.post("/insertarAUDIO",function(req,res){
	 
	var audio={
		nombre:req.body.nombre,
		precio:req.body.precio,
	 	descripcion:req.body.descripcion,
	};

	negocio.insertarCPU(bd,jq,audio);
	res.redirect("administracion");
});


app.post("/cargarFormularioAlmacenamiento",function(req,res){
	var str="<form action='/insertarAlmacenamiento' method='post'>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Nombre</font></label>";
	str+="<input type='text' class='form-control'  name='nombre' id='focusdireccion' placeholder='Nombre'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>RPM</font></label>";
	str+="<input type='text' class='form-control'  name='rpm' id='focusdireccion' placeholder='RPM'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>GB</font></label>";
	str+="<input type='text' class='form-control'  name='gb' id='focusdireccion' placeholder='GB'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Precio</font></label>";
	str+="<input type='text' class='form-control'  name='precio' id='focusdireccion' placeholder='Precio'>";
	str+="</div>";
	
	str+="<input type='submit' class='btn btn-primary' value='Insertar'/>";
	str+="</div>";
	
	str+="</form>";
	res.send(str);
});
app.post("/insertarAlmacenamiento",function(req,res){
	 
	var almacenamiento={
		nombre:req.body.nombre,
		precio:req.body.precio,
	 	rpm:req.body.rpm,
	 	gb:req.body.gb
	};

	negocio.insertarAlmacenamiento(bd,jq,almacenamiento);
	res.redirect("administracion");
});


app.post("/cargarFormularioTarjetaG",function(req,res){
	var str="<form action='/insertarTarjetaG' method='post'>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Nombre</font></label>";
	str+="<input type='text' class='form-control'  name='nombre' id='focusdireccion' placeholder='Nombre'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>GB</font></label>";
	str+="<input type='text' class='form-control'  name='gb' id='focusdireccion' placeholder='GB'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>MHZ</font></label>";
	str+="<input type='text' class='form-control'  name='mhz' id='focusdireccion' placeholder='MHZ'>";
	str+="</div>";
	str+="<div class='form-group has-feedback' id='hasErD'>";
	str+="<label for='focusdireccion'><font color='white'>Precio</font></label>";
	str+="<input type='text' class='form-control'  name='precio' id='focusdireccion' placeholder='Precio'>";
	str+="</div>";
	
	str+="<input type='submit' class='btn btn-primary' value='Insertar'/>";
	str+="</div>";
	
	str+="</form>";
	res.send(str);
});

app.post("/insertarTarjetaG",function(req,res){
	 
	var tarjeta={
		nombre:req.body.nombre,
		precio:req.body.precio,
	 	mhz:req.body.mhz,
	 	gb:req.body.gb
	 	
	};


	negocio.insertarTarjetaG(bd,jq,tarjeta);
	res.redirect("administracion");
});

//escuchando...
app.listen(8080);