var blocks;
var len;
var buildSetIDS = [];
var materialsIDS = [];
var madeBlocksIDS = [];
var materialUUIDArray = [];
var madeBlock;
var madeMaterialsIDS = [];
var buildsetScale = [];
var currentID;
var RayID;
var lineID;
var currentMaterialID;
var currentProps;
var leftEntitie; 
var rightEntitie; 
var leftEntProps; 
var rightEntProps; 
var scalingStarted = true;
var relativeDistance;
var startDistance;
var mesh_material = true;
var buildmode = "Started";
var hitObjectID; 

var leftSelectProps;

var rightGripped = false;
var leftGripped = false;
var modeLeft = "Enable";
var modeRight = "Position";
var counterLeft = 0;
var counterRight = 0;
var counterMesh = 0;
var counterMaterial = 0;
var counterPos = 0;
var frame = 0;
var resetLeft = true;
var resetRight = true;
var onceLeft = true;
var onceRight = true;

var movex= 0 ;
var movey= 0.8;
var movez= 0 ;

var moveLeftx = 0;
var moveLefty = 0.8;
var moveLeftz = 0;



var scalex = 0.2;
var scaley = 0.2;
var scalez = 0.2;
var leftSelectScalex = 0.2;
var leftSelectScaley = 0.2;
var leftSelectScalez = 0.2;

var rot = true;
var scale = true;
var view = true;
var pos = true;
var posgrid = false;
var rotgrid = false;
var scalegrid = false;
var direktie;
var firsthit = false;
var dx=0;
var dy=0;
var dz=0;
var mx=0;
var indexie = 0;

var rightpalm;
var leftpalm;
var hoek = 0;
var temp;
var distanceToSurface;

var SLOW_POSITION = 0.001;
var FAST_POSITION = 0.1;

var SLOW_ROTATION = 1;
var FAST_ROTATION = 5;

var SLOW_SCALE = 0.005;
var FAST_SCALE = 0.1;

var intersection;
var leftSelectIntersection;
var uiPosition;

var positiontemp;

var lastposition = {x:0,y:0,z:0};
var rx=0;
var ry=0;
var rz=0;
var rottoggle = true;

var up = Quat.fromPitchYawRollDegrees(0, 0, 0 );
var down = Quat.fromPitchYawRollDegrees(0, -180, 0 );
var left = Quat.fromPitchYawRollDegrees(90, 0, 0 );
var right = Quat.fromPitchYawRollDegrees(-90, 0, 0 );
var forward = Quat.fromPitchYawRollDegrees(0, 0, 90 );
var back = Quat.fromPitchYawRollDegrees(0, 0, -90 );

var newDistance;
var positie;
var modelName = [];
var MaterialArray =[];
var materialNames = [];
var currentMaterialName;
var currentName = ".....";

var newrotation;
var newposition;

var newLeftPosition = {x:0,y:0,z:0};
var newLeftRotation = {x:0,y:0,z:0};


var currentModeLeft = 0;
var currentModeRight = 0;

var button_A_State = 0; 
var button_B_State = 0; 
var rightStick_X_Value = 0;  
var rightStick_Y_Value = 0; 
var rightTrigger_State = 0; 

var button_X_State = 0; 
var button_Y_State = 0; 
var leftStick_X_Value = 0; 
var leftStick_Y_Value = 0; 
var leftTrigger_State = 0; 

var currentMapping = "buildMapping";


var overlayID = Overlays.addOverlay('text3d', {
  text: 'hover',
  visible: true,
  backgroundAlpha: 0,
  isFacingAvatar: true,
  lineHeight: 0.05,
  dimensions: {x:1,y:2,z:3},
  drawInFront:true
});

function updateOverlay(overlayID) {
positie = Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, { x: 0, y: 2, z: -2 }));  
  var text = [
      "NewPosition: " + " X:" + newposition.x.toFixed(2) + " Y:" + newposition.y.toFixed(2) + " Z:" + newposition.z.toFixed(2),
      "NewRotation: " + " W:" + newrotation.w.toFixed(2) + " X:" + newrotation.x.toFixed(2) + " Y:" + newrotation.y.toFixed(2) + " Z:" + newrotation.z.toFixed(2),
      "NewDimension: " + " X:" + scalex.toFixed(2) + " Y:" + scaley.toFixed(2) + " Z:" + scalez.toFixed(2),       
      "Pos:  " + pos + " grid: " + posgrid,
      "Rot:  " + rot + " grid: " + rotgrid,
      "Scale " + scale + " grid: " + scalegrid,
      "DeltaPos:  " + " Dx: " + dx.toFixed(2) + " Dy: " + dy.toFixed(2)+ " Dz: " + dz.toFixed(2),
      "DeltaRot:  " + " Rx: " + rx.toFixed(2) + " Ry: " + ry.toFixed(2)+ " Rz: " + rz.toFixed(2),
      "Dimension: " + " Sx: " + scalex.toFixed(2) + " Sy: " + scaley.toFixed(2)+ " Sz: " + scalez.toFixed(2),
      "ModeLeft:  " +  modeLeft + " " + currentModeLeft,
      "ModeRight:   " + modeRight + " " + currentModeRight,
      "Mapping:   " + "Buildmapping",
      "Model:     " + currentName,
      "Material:  " + currentMaterialName,
      "DistToSurf: " + distanceToSurface
  ].filter(Boolean).join('\n');

  Overlays.editOverlay(overlayID, {
      text: text,
      position: positie      
  });
}

function loadBuildingBlocks(){
  blocks = Script.require(Script.resolvePath('Blocks.json?15'));
  
  for (var i = 0, len = blocks.buildingBlocks.length; i < len; i++) {    
    //var uiPosition = Vec3.multiplyQbyV(MyAvatar.orientation, { x:-1+i, y:-1, z:1 });
    //uiPosition = Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, { x:(-1+((2/(blocks.buildingBlocks.length-1))*i)), y:0, z:0.5 }));
    var distanceToUi = 1;
    var totalAnglelUiDeg = 360;
    var totalAngleUiRad =  (totalAnglelUiDeg/180)*Math.PI;
    var angleBetweenBlocks = totalAngleUiRad / blocks.buildingBlocks.length;
    var Uix = Math.cos(angleBetweenBlocks*i)*distanceToUi;
    var Uiz = Math.sin(angleBetweenBlocks*i)*distanceToUi;
    var uiPosition = Vec3.sum(MyAvatar.position,{x:Uix,y:0,z:Uiz} );

    var index = blocks.buildingBlocks[i].lastIndexOf("/")+1;
    modelName[i] = blocks.buildingBlocks[i].slice(index);    

    var blockID = Entities.addEntity({
      type: "Model",
      modelURL:blocks.buildingBlocks[i],
      //shapeType:"simple-compound", 
      colissionless:true,                      
      name:"Build"+i,        
      description:"",            
      position: uiPosition,      
      lifetime: -1,
      dimensions: {x:0.2,y:0.2,z:0.2},
      //cloneable:true,
      //cloneLimit:50,           
      userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": true}}"    
    });

    var naturalSize = Entities.getEntityProperties(blockID,["naturalDimensions"]).naturalDimensions;
    var largest = Math.max(naturalSize.x,naturalSize.y,naturalSize.z);
    var scalefactor = 0.1/largest;
    var updatedScaleDimension = {x:naturalSize.x*scalefactor,y:naturalSize.y*scalefactor,z:naturalSize.z*scalefactor}; 
 
    Entities.editEntity(blockID,{dimensions:updatedScaleDimension});
    buildsetScale.push(updatedScaleDimension);
    buildSetIDS.push(blockID);    
  }

  currentID = buildSetIDS[0];

  RayID = Entities.addEntity({
    type: "Shape",        
    shape: "Cone",                       
    name:"Raydirection",        
    description:"",            
    position: {x:0,y:0,z:0},      
    lifetime: -1,
    color:{r:200,g:0,b:200},
    alpha:0.8,
    dimensions: {x:0.2,y:0.2,z:0.2},
    colissionless:true,
    userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"    
  },"local");

  SelectLID = Entities.addEntity({
    type: "Shape",        
    shape: "Sphere",                       
    name:"SelectL",        
    description:"",            
    position: {x:0,y:0,z:0},      
    lifetime: -1,
    color:{r:200,g:0,b:0},
    alpha:0.2,
    dimensions: {x:0.01,y:0.01,z:0.01},
    colissionless:true,
    userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"    
  },"local");

  SelectRID = Entities.addEntity({
    type: "Shape",        
    shape: "Sphere",                       
    name:"SelectR",        
    description:"",            
    position: {x:0,y:0,z:0},      
    lifetime: -1,
    color:{r:0,g:0,b:200},
    alpha:0.2,
    dimensions: {x:0.01,y:0.01,z:0.01},
    colissionless:true,
    userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"    
  },"local");  
}

function loadMaterials(){
    textures = Script.require(Script.resolvePath('Textures.json?15'));
    for (var i = 0, len = textures.materialTextures.length; i < len; i++) {
    var index2 = textures.materialTextures[i].lastIndexOf("/")+1;
    materialNames[i] = textures.materialTextures[i].slice(index2);
    var distanceToUi = 1;
    var totalAnglelUiDeg = 360;
    var totalAngleUiRad =  (totalAnglelUiDeg/180)*Math.PI;
    var angleBetweenBlocks = totalAngleUiRad / blocks.buildingBlocks.length;
    var Uix = Math.cos(angleBetweenBlocks*i)*distanceToUi;
    var Uiz = Math.sin(angleBetweenBlocks*i)*distanceToUi;
    var uiPosition = Vec3.sum(MyAvatar.position,{x:Uix,y:0,z:Uiz} );

    var materialID = Entities.addEntity({
        type: "Material",        
        name:"Material"+i,
        materialURL: "materialData",
        priority: 1,
        materialData: JSON.stringify({
            materialVersion: 1,
            materials: {
                // Value overrides entity's "color" property.
                albedo: [0.8, 0.8, 0.8],
                albedoMap: textures.materialTextures[i],            
                metallic: 0.5,
                metallicMap:"",
                roughness: 0.8,
                roughnessMap:"",                
            }
        }),
      });
    var materialUIID = Entities.addEntity({
        type:"Image",
        imageURL:textures.materialTextures[i],
        billboardMode:"full",
        position: uiPosition,
        name:"materialImage" +i,
        dimensions:{x:0.1,y:0.1,z:0.1}
    });

    materialUUIDArray.push(materialUIID);
    MaterialArray.push(materialID);
    }

}

function makeBlock(){
    //if(HMD.showTablet){Window.alert("Please close the tablet in order to make blocks!");}
  print("making block");
  if (Vec3.distance(lastposition,newposition) > 0.5 && resetRight == true && !HMD.showTablet){
  madeBlock = Entities.addEntity({
    type: "Model",
    modelURL:blocks.buildingBlocks[counterMesh],
    shapeType:"simple-compound",                       
    name:"BuildBlock",        
    description:"",            
    position: newposition,
    rotation: newrotation,      
    lifetime: -1,
    dimensions: {x:scalex,y:scaley,z:scalez},
    userData:"{ \"grabbableKey\": { \"grabbable\": true, \"triggerable\": true}}"    
  });

  madeBlocksIDS.push(madeBlock);

  var lastposition = newposition;

  var madeMaterial = Entities.addEntity({
      type: "Material",        
      name:"BuildMaterial",     
      parentID:madeBlock,
      materialURL: "materialData",
      priority: 1,
      materialData: JSON.stringify({
          materialVersion: 1,
          materials: {
              // Value overrides entity's "color" property.
              albedo: [0.8, 0.8, 0.8],
              albedoMap: textures.materialTextures[counterMaterial],            
              metallic: 0.5,
              metallicMap:"",
              roughness: 0.8,
              roughnessMap:"",                
          }
      }),
    });
    madeMaterialsIDS.push(madeMaterial)
    resetRight = false;   
  }
}

function deleteBlock(value){
    if(value > 0.2 && resetRight){        
        if(leftEntProps.id){
            
          Entities.deleteEntity(hitObjectID);
         
        }
        }
        resetRight = false;
}

function parentBlock(){
}

function selectBlock(value){
    if (value < 0.15){
        rightGripped = false;
      }
      else
      {
        rightGripped = true;
      }  
    if(value > 0.2 && resetRight){                             
            if(leftEntProps.id && mesh_material){
                currentID = leftEntProps.id;
                var indexje = buildSetIDS.indexOf(currentID);
                counterMesh = indexje;
                currentName = modelName[counterMesh];
                print(leftEntProps.id);                
             }
             if(!mesh_material){
                counterMaterial = indexie;  
                currentMaterialID =  MaterialArray[counterMaterial];                
                currentMaterialName = materialNames[counterMaterial];
                print("currentMaterialName"+currentMaterialName);
                print("currentMaterialID"+currentMaterialID);
                for (var i = 0, len = MaterialArray.length; i < len; i++) {
                    Entities.editEntity(MaterialArray[i],{parentID:"00000000-0000-0000-0000-000000000000"});
                }
                
                Entities.editEntity(currentMaterialID,{parentID:currentID});
                print("...................update material")
             }               
     }
    resetRight = false;  
}

function onLeftStickX(value){
            if(value <= -0.5){mx = mx-0.02};
            if(value >= 0.5){mx= mx+0.02};
            if(value <= -0.9){mx = mx-1};
            if(value >= 0.9){mx = mx+1}; 
}

function onLeftStickY(value){    
        if(value <= -0.5){moveLefty = moveLefty+SLOW_POSITION};
        if(value > 0.5){moveLefty = moveLefty-SLOW_POSITION};        
        if(value <= -0.9){moveLefty = moveLefty+FAST_POSITION};
        if(value > 0.9){moveLefty = moveLefty-FAST_POSITION};
        if(movey<0.05){moveLefty = 0.05};   
}

function onLeftStickClick(value){
    if(value > 0.2 && resetLeft){
        mesh_material = !mesh_material;        
    }
    resetLeft = false;  

}

function onRightStickX(value){

    if(modeRight == "Position"){
            if(value <= -0.1){ry = ry-SLOW_ROTATION};
            if(value >= 0.1){ry = ry+SLOW_ROTATION};
            if(value <= -0.9){ry = ry-FAST_ROTATION};
            if(value >= 0.9){ry = ry+FAST_ROTATION};         
        
    }

    if(modeRight == "Rotation"){
        if (rot){
            if(value <= -0.1){rx = rx-SLOW_ROTATION};
            if(value >= 0.1){rx = rx+SLOW_ROTATION};
            if(value <= -0.9){rx = rx-FAST_ROTATION};
            if(value >= 0.9){rx = rx+FAST_ROTATION};
            
          }      
          if (!rot){
            if(value <= -0.1){ry = ry-SLOW_ROTATION};
            if(value >= 0.1){ry = ry+SLOW_ROTATION};
            if(value <= -0.9){ry = ry-FAST_ROTATION};
            if(value >= 0.9){ry = ry+FAST_ROTATION};    
          }   
    }
        if(modeRight == "Scale"){
            if (scale){
            if(value >= 0.1){scalez = scalez+SLOW_SCALE};
            if(value < -0.1){scalez = scalez-SLOW_SCALE};
            if(scalez<0.05){scalez = 0.05};    
          }
    }

}

function onRightStickY(value){

    if(modeRight == "Position"){
        if(value <= -0.5){movey = movey+SLOW_POSITION};
        if(value > 0.5){movey = movey-SLOW_POSITION};        
        if(value <= -0.9){movey = movey+FAST_POSITION};
        if(value > 0.9){movey = movey-FAST_POSITION};
        if(movey<0.05){movey = 0.05};       
    }
    if(modeRight == "Rotation"){
        if (rot){      
            if(value <= -0.1){rz = rz-SLOW_ROTATION};
            if(value >= 0.1){rz = rz+SLOW_ROTATION};
            if(value <= -0.9){rz = rz-FAST_ROTATION};
            if(value >= 0.9){rz = rz+FAST_ROTATION};   
        }      
        if (!rot){
            if(value <= -0.1){rz = rz-SLOW_ROTATION};
            if(value >= 0.1){rz = rz+SLOW_ROTATION};
            if(value <= -0.9){rx = rx-FAST_ROTATION};
            if(value >= 0.9){rx = rx+FAST_ROTATION};        
        }
    }
    if(modeRight == "Scale"){
        if (scale){
            if(value >= 0.1){scalex = scalex+SLOW_SCALE};
            if(value < -0.1){scalex = scalex-SLOW_SCALE};
            if(scalex<0.05){scalex = 0.05};
          }
          if (!scale){
            if(value >= 0.1){scaley = scaley+SLOW_SCALE};
            if(value < -0.1){scaley = scaley-SLOW_SCALE};
            if(scaley<0.01){scaley = 0.01};
            if(scaley>100){scaley = 100}; 
          }
    }
}    

function onRightStickClick(value){
    if(modeRight == "Position"){
        if(value > 0.9 && resetRight){        
            pos = !pos;                      
        }
        resetRight = false;          
    }

    if(modeRight == "Rotation"){
        if(value > 0.9 && resetRight){        
            rot = !rot;
            rx = 0;
            ry = 0;
            rz = 0;                       
        }
        resetRight = false;  
      
    }
    if(modeRight == "Scale"){
        if(value > 0.9 && resetRight){        
            scale = !scale;                      
        }
        resetRight = false;       
    }
    

}

function definemappings(){
    var buildmapping = Controller.newMapping("buildMapping");

    buildmapping.from(Controller.Standard.RY).to(onRightStickY);
    buildmapping.from(Controller.Standard.RX).to(onRightStickX);
    buildmapping.from(Controller.Standard.RS).to(onRightStickClick);
    buildmapping.from(Controller.Standard.RightGrip).to(deleteBlock);
    buildmapping.from(Controller.Standard.RTClick).to(makeBlock);
      
    buildmapping.from(Controller.Standard.LY).to(onLeftStickY);
    buildmapping.from(Controller.Standard.LX).to(onLeftStickX);
    buildmapping.from(Controller.Standard.LS).to(onLeftStickClick);
    buildmapping.from(Controller.Standard.LeftGrip).to(selectBlock);
    buildmapping.from(Controller.Standard.LTClick).to(parentBlock);    
}

Script.setTimeout(function () {  
}, 1000);

//Heartbeat reset
Script.setInterval(function () {
  resetLeft = true;
  resetRight = true;  
}, 1000);


function startBuilding(deltatime){
  frame++;
  
  currentProps = Entities.getEntityProperties(currentID);
  leftSelectProps = Entities.getEntityProperties(SelectLID);
  
  //reposition uiBuild blocks
if(modeLeft == "Enable" && mesh_material){
    Entities.editEntity(currentID,{visible:true});    
  if(frame % 5 == 0){    
        for (var i = 0, len = blocks.buildingBlocks.length; i < len; i++) {  
            var distanceToUi = 0.6;
            var totalAnglelUiDeg = 360;
            var totalAngleUiRad =  (totalAnglelUiDeg/180)*Math.PI;
            var angleBetweenBlocks = totalAngleUiRad / blocks.buildingBlocks.length;
            var Uix = Math.cos(angleBetweenBlocks*i+mx)*distanceToUi;
            var Uiz = Math.sin(angleBetweenBlocks*i+mx)*distanceToUi;
            var uiPosition = Vec3.sum(MyAvatar.position,{x:Uix,y:0.4,z:Uiz} );            
            var naturalSize = Entities.getEntityProperties(buildSetIDS[i],["naturalDimensions"]).naturalDimensions;
            var largest = Math.max(naturalSize.x,naturalSize.y,naturalSize.z);
            var scalefactor = 0.1/largest;
            var updatedScaleDimension = {x:naturalSize.x*scalefactor,y:naturalSize.y*scalefactor,z:naturalSize.z*scalefactor};
            if (buildSetIDS[i] != currentID){
                Entities.editEntity(buildSetIDS[i],{position:uiPosition,dimensions:updatedScaleDimension,visible:true});
            }
        }
        for (var j = 0, len = materialUUIDArray.length; j < len; j++) {
            Entities.editEntity(materialUUIDArray[j],{visible:false});
          }
    }
}

if(modeLeft == "Enable" && !mesh_material){
    Entities.editEntity(currentID,{visible:true});    
    if(frame % 5 == 0){    
          for (var i = 0, len = materialUUIDArray.length; i < len; i++) {  
              var distanceToUi = 0.6;
              var totalAnglelUiDeg = 360;
              var totalAngleUiRad =  (totalAnglelUiDeg/180)*Math.PI;
              var angleBetweenBlocks = totalAngleUiRad / materialUUIDArray.length  ;
              var Uix = Math.cos(angleBetweenBlocks*i+mx)*distanceToUi;
              var Uiz = Math.sin(angleBetweenBlocks*i+mx)*distanceToUi;
              var uiPosition = Vec3.sum(MyAvatar.position,{x:Uix,y:0.4,z:Uiz} );            
                  Entities.editEntity(materialUUIDArray[i],{position:uiPosition,visible:true});
              }
              for (var j = 0, len = blocks.buildingBlocks.length; j < len; j++) {
                if (buildSetIDS[j] != currentID){  
                Entities.editEntity(buildSetIDS[j],{visible:false});
                }
              }
            
          }
      }
  


if(modeLeft == "Disable"){
    if(frame % 5 == 0){    
          for (var i = 0, len = blocks.buildingBlocks.length; i < len; i++) {              
                  Entities.editEntity(buildSetIDS[i],{visible:false});            
            }
            for (var j = 0, len = materialUUIDArray.length; j < len; j++) {
                Entities.editEntity(materialUUIDArray[j],{visible:false});
              }
    }
}


  
  //read controllers
  button_A_State = Controller.getValue(Controller.Standard.A);
  button_X_State = Controller.getValue(Controller.Standard.X);  
  
  if(button_X_State == 1 && resetLeft){
    currentModeLeft++;
    if(currentModeLeft>=2){currentModeLeft=0;}
    resetLeft = false;
    onceLeft = true;       
  }

  if(button_A_State == 1 && resetRight){
    currentModeRight++;
    if(currentModeRight>=3){currentModeRight=0;}
    resetRight = false;
    onceRight = true;       
  }
  
    switch(true) {     
      
    case currentModeLeft == 0 && onceLeft:
        print("Enable");
        modeLeft = "Enable"; 
        onceLeft = false;
        
        Controller.enableMapping("buildMapping");             
        break;

    case currentModeLeft == 1 && onceLeft:
        print("Disable");
        modeLeft = "Disable"; 
        onceLeft = false;
        Controller.disableMapping(("buildMapping"));              
        break;   
  }

    switch(true) {    

    case currentModeRight == 0 && onceRight:
        print("Mode right 0 - Position ");
        modeRight = "Position"; 
        onceRight = false;                    
        break;

    case currentModeRight == 1 && onceRight:
        print("Mode right 1 - Rotation");
        modeRight = "Rotation";
        onceRight = false;              
        break;           
      
    case currentModeRight == 2 && onceRight:            
        print("Mode 2 Right - Scale");
        modeRight = "Scale"; 
        onceRight = false;                 
        break;       
  }

  var jointIndex1 = MyAvatar.getJointIndex("RightHandIndex2");
  var jointIndex2 = MyAvatar.getJointIndex("LeftHandIndex2");
  rightpalm =  MyAvatar.getRightPalmRotation();
  leftpalm = MyAvatar.getLeftPalmRotation();
  var handRightPosition = Vec3.sum(MyAvatar.getJointPosition(jointIndex1),Vec3.multiplyQbyV(rightpalm, { x: 0, y: 0.01, z: 0}));
  var handLeftPosition = Vec3.sum(MyAvatar.getJointPosition(jointIndex2),Vec3.multiplyQbyV(leftpalm, { x: 0, y: 0.01, z: 0}));

  leftEntitie = Entities.findClosestEntity(handLeftPosition, 0.2);
  rightEntitie = Entities.findClosestEntity(handRightPosition, 0.2);
  

  if(buildSetIDS.indexOf(leftEntitie) > -1){
     if(mesh_material){
        leftEntProps = Entities.getEntityProperties(leftEntitie)
     }
    };

  if(materialUUIDArray.indexOf(leftEntitie) > -1){
    if(!mesh_material){
    indexie =  materialUUIDArray.indexOf(leftEntitie);              
        print("indexie"+indexie);
  }      
  }

  //newLeftPosition =  Vec3.sum(MyAvatar.getJointPosition(jointIndex2), Vec3.multiplyQbyV(leftpalm, { x:0, y: moveLefty, z: 0 }));
  var leftSelectDirection = Vec3.normalize(Quat.getUp(leftpalm));
  var pickRayLeftSelect = { origin: handLeftPosition, direction: leftSelectDirection};
  //var pickRayLeftSelect = { origin: handLeftPosition, direction: leftpalm};
  leftSelectIntersection = Entities.findRayIntersection(pickRayLeftSelect, true,[],[SelectLID,overlayID,MyAvatar.sessionUUID,RayID]);  
  if(leftSelectIntersection.intersects) {
      hitObjectID = leftSelectIntersection.entityID;
        if(madeBlocksIDS.indexOf(hitObjectID) !=-1){
      //var hitObjectProps = Entities.getEntityProperties(hitObjectID);
      newLeftRotation = Entities.getEntityProperties(hitObjectID,["rotation"]).rotation;
      newLeftPosition  = Entities.getEntityProperties(hitObjectID,["position"]).position;
         var leftSelectScale = Entities.getEntityProperties(hitObjectID,["dimensions"]).dimensions;
        // var largestSelectLeft = Math.max(leftSelectScale.x,leftSelectScale.y,leftSelectScale.z);
         
         leftSelectScalex = leftSelectScale.x*1.5;
         leftSelectScaley = leftSelectScale.y*1.5;
         leftSelectScalez = leftSelectScale.z*1.5;
         if (leftSelectScalex > 20){leftSelectScalex = 20;}
         if (leftSelectScaley > 20){leftSelectScaley = 20;}
         if (leftSelectScalez > 20){leftSelectScalez = 20;}
        }
        else
        {
            newLeftPosition = handLeftPosition;
            leftSelectScalex = 0.01;
            leftSelectScaley = 0.01;
            leftSelectScalez = 0.01;
            
        }

  }

  if (rot){
     // print("SubMode rotation true ");      
    newrotation = (rightpalm);
    rottoggle = true;          
  }

  if (!rot){    
    if (rottoggle){
        temp = Quat.safeEulerAngles(rightpalm);
        rottoggle = false;
    }    
    newrotation = Quat.fromPitchYawRollDegrees(temp.x+rx, temp.y+ry, temp.z+rz );
    //newrotation = Quat.fromPitchYawRollDegrees(0, temp.y+ry, 0 ); 
    
    }

  if (pos){
    //print("SubMode position true ");
      newposition =  Vec3.sum(MyAvatar.getJointPosition(jointIndex1), Vec3.multiplyQbyV(rightpalm, { x:0, y: movey, z: 0 }));
      //temp = Quat.safeEulerAngles(Quat.inverse(rightpalm));
     newrotation = leftpalm;
      //newrotation = Quat.fromPitchYawRollDegrees(temp.x+rx, temp.y+ry, temp.z+rz+90 );      
  }

  if(!pos){    
    var pickRay = { origin: currentProps.position, direction: Vec3.normalize(Vec3.multiply(Quat.getForward(newrotation),-1))};
    //var pickRay = { origin: currentProps.position, direction: Vec3.normalize(Vec3.subtract(currentProps.position, MyAvatar.getJointPosition(jointIndex1)))};
    //var pickRay = { origin: currentProps.position, direction: rightpalm};
    intersection = Entities.findRayIntersection(pickRay, true,[],[currentID,overlayID,MyAvatar.sessionUUID,RayID,madeBlocksIDS,buildSetIDS,materialsIDS]);    
    
    if(intersection.intersects) {             
        //distanceToSurface = Vec3.distance(intersection.intersection,currentProps.position);        
        //if (distanceToSurface > 0.2 ){
        //  newposition = Vec3.mix(currentProps.position,intersection.intersection,0.8);
        //} 
        //else{
        //  newposition = {x:newposition.x+dx,y:newposition.y+dy,z:newposition.z+dz};          
        //}
        
        newrotation = Quat.rotationBetween({x: 0, y: 1, z: 0}, intersection.surfaceNormal);        
        newposition = Vec3.sum(intersection.intersection, Vec3.multiplyQbyV(newrotation, { x:0, y: (scaley/2)+movey, z: 0 }));
        Entities.editEntity(RayID,{ position:intersection.intersection,
                                      rotation:newrotation});
        
                                     // temp = Quat.safeEulerAngles(newrotation);
                                      //newrotation = Quat.fromPitchYawRollDegrees(0, temp.y+rx, 0 );           
    }   
  }
  
if(scalex < 0.02){ scalex =0.02;}
if(scaley < 0.02){ scaley =0.02;}
if(scalez < 0.02){ scalez =0.02;}

if(modeLeft == "Enable" ){
    Entities.editEntity(currentID, {position: newposition,
                                  rotation: newrotation,
                                  dimensions: {x:scalex,y:scaley,z:scalez}});
    Entities.editEntity(SelectLID, {position: newLeftPosition,
                                    rotation: newLeftRotation,
                                    dimensions: {x:leftSelectScalex,y:leftSelectScaley,z:leftSelectScalez}
                                    });
  
}



//Entities.editEntity(SelectLID, {position: handLeftPosition});
Entities.editEntity(SelectRID, {position: handRightPosition});

updateOverlay(overlayID);

if (frame % 100 == 0){
    print(hitObjectID+"hitObjectID");
    print("handLeftPosition.x" + handLeftPosition.x);
    print("leftSelectDirection.x" + leftSelectDirection.x);
    print("leftSelectDirection.y" + leftSelectDirection.y);
    print("leftSelectDirection.z" + leftSelectDirection.z);
}
if(frame >1000 ){frame = 0;}

}

Script.scriptEnding.connect(function () {  
    Overlays.deleteOverlay(overlayID);
    
    Controller.disableMapping("buildMapping");
    print("disconnecting..............");
    Script.update.disconnect(startBuilding);  
 
    for (var i = 0, len = blocks.buildingBlocks.length; i < len; i++) {
        Entities.deleteEntity(buildSetIDS[i]); 
    }

    for (var i = 0, len = madeBlocksIDS.length; i < len; i++) {
        Entities.deleteEntity(madeBlocksIDS[i]); 
    }

    for (var i = 0, len = madeMaterialsIDS.length; i < len; i++) {
      Entities.deleteEntity(madeMaterialsIDS[i]); 
  }

  for (var i = 0, len = materialUUIDArray.length; i < len; i++) {
    Entities.deleteEntity(materialUUIDArray[i]); 

    for (var i = 0, len = MaterialArray.length; i < len; i++) {
        Entities.deleteEntity(MaterialArray[i]); 
    }
}

  Entities.deleteEntity(RayID);
  Entities.deleteEntity(SelectLID);
  Entities.deleteEntity(SelectRID);


});

definemappings();
loadBuildingBlocks();
loadMaterials();

Script.update.connect(startBuilding);












