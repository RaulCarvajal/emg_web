import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { Router } from "@angular/router";
import { PlantasService } from 'src/app/services/plantas.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-mis-lineas',
  templateUrl: './mis-lineas.component.html',
  styleUrls: ['./mis-lineas.component.css']
})
export class MisLineasComponent implements OnInit {

  constructor(private router:Router, private plantas:PlantasService, private auth:AuthService, private alert: AlertService) { }

  ngOnInit() {
    this.loadPlants();
    this.alert.alert('Primero seleccionar planta para que mueste las líneas correspondientes a esa planta.');
  }

  planta:Plant[];
  clns:User[];
  lines:Lines[];

  load:boolean=false;
  id_planta;
  busq:String="";

  sinPlantas:boolean=false;
  sinLineas:boolean=false;

  loadPlants(){
    this.id_planta='';
    this.plantas.getAllPlantas(this.auth.getEmpresaId()).subscribe(
    (data)=>{
      this.lines=[];
      this.planta=data.detail;
      if( this.planta.length == 0 ){
        this.sinPlantas = true;
      }else{
        this.sinPlantas = false;
      }
    },
    (err)=>{
      console.log(err)
    });
  }
  vacio():boolean{
    if(this.lines.length==0){
      return true;
    }else{
      return false;
    }
  }
  plantDet(id:string){
    this.router.navigateByUrl('mislineas/'+this.id_planta+"/"+id);
  }
  goNewLine(){
    this.router.navigateByUrl('mislineas/nueva/'+this.id_planta);
  }
  loadLineas(){
    this.planta.forEach(el=>{
      if(el._id==this.id_planta){
        this.lines=el.lines;
        //console.log(el);
      }
      this.load=true;
    });
  }
  busqueda(){
    if(this.busq==""){
      this.loadLineas();
    }else{
      var regex = new RegExp(this.busq.toLowerCase());
      let temp:Lines[]=this.lines;
      this.lines=temp.filter(lns => lns.name.toLowerCase().match(regex))
    }
  }
}