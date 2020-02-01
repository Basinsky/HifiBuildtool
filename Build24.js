var blocks;
var len;
var buildSetIDS = [];
var materialsIDS = [];
var madeBlocksIDS = [];
var materialIDS = [];
var parentModelsIDS = [];
var parentMaterialIDS = [];
var madeBlock;
var madeMaterialsIDS = [];
var buildsetScale = [];
var parentChildHighlight = [];

//handInterface
var handInterfaceID;
var handInterfaceIDs = [];
var distanceFingerTipToButton1 = 1000;
var distanceFingerTipToButton2 = 1000;
var distanceFingerTipToButton3 = 1000;
var handPalmUp = false;

//StateHandlers
var vrBuildEnable = false;
var gridBuildEnable = true;

var checkEntityModel = false;
var checkEntityMaterial = false;
var isBuild = false;


//ui
var UI_ROTATE_SLOW = 0.002;
var UI_ROTATE_FAST = 0.02;
var uiPosition;
var userHeight = MyAvatar.userHeight;
var uiScale = MyAvatar.getSensorToWorldScale();
var uiHeight = uiScale * userHeight * 0.3;
var UI_DISTANCE = 0.6 * uiScale;



var gridx; 
var gridy;
var gridz;
var gridsize = 0.1;
var gridRotation;
var closePlusX;
var closeMinusX;

var dotProduct;
var upvector;

var currentID;
var RayID;
var lineID;
var currentMaterialID;
var modelAboveHandGridID;
var materialAboveHandGridID;
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

var modelAboveHandPosition = {x:0,y:0,z:0};
var modelAboveHand;
var materialAboveHandID;

var blocksLoaded = false;

var modelAboveHandProps;
var materialAboveHandProps;

var modelbuildProps;
var materialBuildProps;


var grabbedLeftEntityID;
var grabbedRightEntityID;
var releasedLeftEntityID;
var releasedRightEntityID;
var grabbedRightURL;
var grabbedLeftURL;
var grabbedRightMaterial;
var grabbedLeftMaterial;
var grabbedRightDimensions;
var grabbedLeftDimensions;
var grabbedRightPosition = {x:0,y:0,z:0};
var grabbedLeftPosition = {x:0,y:0,z:0};

var action;
var rightHandReleasedEntity = false;

var rightGripped = false;
var leftGripped = false;
var modeLeft = "Loading";
var modeRight = "Loading";
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

var distanceToModel = 1000;
var distanceToEntityToBeDeleted = 1000;

var movex= 0 ;
var movey= 0.8;
var movez= 0 ;

var moveLeftx = 0;
var moveLefty = 0.8;
var moveLeftz = 0;

var displayPosition;


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
var UIRotate=0;
var indexie = 0;

var hoek = 0;
var temp;
var distanceToSurface;

var makeBlockPosition;
var makeBlockRotation;

var intersection;
var leftSelectIntersection;


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

var materialLibrairy = [];
var newrotation;
var newposition;
var uiPosition;
var UIModelRotate = 0;

var blocksResized = false;

var newLeftPosition = {x:0,y:0,z:0};
var newLeftRotation = {x:0,y:0,z:0};


var currentModeLeft = 0;
var currentModeRight = 0;

var angleBetweenModels = 0;
var angleBetweenMaterials = 0;

var RIGHT_HAND_INDEX2_INDEX = MyAvatar.getJointIndex("RightHandIndex2");
var LEFT_HAND_INDEX2_INDEX = MyAvatar.getJointIndex("LeftHandIndex2");
var LEFT_HAND_INDEX = MyAvatar.getJointIndex("LeftHand");
var RIGHT_HAND_INDEX = MyAvatar.getJointIndex("RightHand");
var RIGHT_HAND_INDEX_FINGER_END = MyAvatar.getJointIndex("RightHandIndex4");
var LEFT_FORE_ARM = MyAvatar.getJointIndex("LeftForeArm");


var mainLeftSelector = 0; 
var mainRightSelector = 0;
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
var channelName = "Hifi-Object-Manipulation";

var overlayID = Overlays.addOverlay('text3d', {
  text: 'hover',
  visible: true,
  backgroundAlpha: 0,
  collisionless:true,
  isFacingAvatar: true,
  lineHeight: 0.05,
  dimensions: {x:1,y:2,z:3},
  drawInFront:true,
  unlit:true
},"local");

function updateOverlay(overlayID) {
positie = Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, { x: 0, y: 2, z: -2 }));  
  var text = [       
      "ModeLeft:  " +  modeLeft + " " + currentModeLeft + "  MODESLECTOR " + mainLeftSelector + "resetleft " + resetLeft,
      "ModeRight:   " + modeRight + " " + currentModeRight,      
      "length     "  + parentModelsIDS.length,
      "fingertip:  " + distanceFingerTipToButton1.toFixed(2),
      "Distance to modhand: " + distanceToModel.toFixed(2),
      //"  upx:       " + upvector.x.toFixed(2) + "  upy:       " + upvector.y.toFixed(2) + "upz:       " + upvector.z.toFixed(2),// + "upw:       " + upvector.w.toFixed(2)
      //"gridrot:   " + JSON.stringify(gridRotation.x)+"   gridrot:   " + JSON.stringify(gridRotation.y)+"   gridrot:   " + JSON.stringify(gridRotation.z), 
      "close + x   " + closePlusX + "     close - x   " + closeMinusX, 
      
  ].filter(Boolean).join('\n');

  Overlays.editOverlay(overlayID, {
      text: text,
      position: positie      
  });
};

function createHandInterface(){    
  var protatione =Quat.fromPitchYawRollRadians(8.5*Math.PI/180,-17*Math.PI/180,52*Math.PI/180);    
    handInterfaceID = Entities.addEntity({
        type:"Text",
        text: 'Build/Model/Material',
        visible: true,
        unlit: true,
        parentID: MyAvatar.sessionUUID,   
        parentJointIndex: LEFT_HAND_INDEX,
        localPosition: { x: 0.045, y: 0.045, z: 0.045},
        localRotation: protatione,
        collisionless:true,        
        backgroundAlpha: 1,
        billboardMode:"none",
        font: "Roboto",
        lineHeight: 0.03,
        dimensions: {x:0.1,y:0.06,z:0.00},
        drawInFront:true,
        textColor:{r:255,g:255,b:255},
        lifetime:-1
      });
      handInterfaceIDs.push(handInterfaceID);

    handInterfaceButton1ID = Entities.addEntity({
        type: "Shape",        
        shape: "Cube",                       
        name:"Button1",        
        description:"",
        parentID: handInterfaceID,           
        localPosition: {x:-0.04,y:-0.02,z:0},      
        lifetime: -1,
        color:{r:255,g:0,b:0},
        alpha:1,
        dimensions: {x:0.02,y:0.02,z:0.01},
        collisionless:true,
        visible:true,
        userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"    
      });
      handInterfaceIDs.push(handInterfaceButton1ID);

      handInterfaceButton2ID = Entities.addEntity({
        type: "Shape",        
        shape: "Cube",                       
        name:"Button2",        
        description:"",
        parentID: handInterfaceID,           
        localPosition: {x:-0.02,y:-0.02,z:0},      
        lifetime: -1,
        color:{r:0,g:255,b:0},
        alpha:1,
        dimensions: {x:0.02,y:0.02,z:0.01},
        collisionless:true,
        visible:true,
        userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"    
      });
      handInterfaceIDs.push(handInterfaceButton2ID);;

      handInterfaceButton3ID = Entities.addEntity({
        type: "Shape",        
        shape: "Cube",                       
        name:"Button3",        
        description:"",
        parentID: handInterfaceID,           
        localPosition: {x:0.00,y:-0.02,z:0},      
        lifetime: -1,
        color:{r:0,g:0,b:255},
        alpha:1,
        dimensions: {x:0.02,y:0.02,z:0.01},
        collisionless:true,
        visible:true,
        userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"    
      });

      handInterfaceIDs.push(handInterfaceButton3ID);

      handInterfaceButton4ID = Entities.addEntity({
        type: "Shape",        
        shape: "Cube",                       
        name:"Button4",        
        description:"",
        parentID: handInterfaceID,           
        localPosition: {x:0.02,y:-0.02,z:0},      
        lifetime: -1,
        color:{r:0,g:255,b:255},
        alpha:1,
        dimensions: {x:0.02,y:0.02,z:0.01},
        collisionless:true,
        visible:true,
        userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"    
      });

      handInterfaceIDs.push(handInterfaceButton4ID);

      handInterfaceButton5ID = Entities.addEntity({
        type: "Shape",        
        shape: "Cube",                       
        name:"Button4",        
        description:"",
        parentID: handInterfaceID,           
        localPosition: {x:0.04,y:-0.02,z:0},      
        lifetime: -1,
        color:{r:255,g:255,b:0},
        alpha:1,
        dimensions: {x:0.02,y:0.02,z:0.01},
        collisionless:true,
        visible:true,
        userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"    
      });

      handInterfaceIDs.push(handInterfaceButton5ID);
};

function loadModels(){
  blocks = Script.require(Script.resolvePath('Blocks.json?16'));
  
  for (var i = 0, len = blocks.buildingBlocks.length; i < len; i++) {       
    angleBetweenModels = Math.PI * 2 / blocks.buildingBlocks.length;
    var Uix = Math.cos(angleBetweenModels*i)*UI_DISTANCE;
    var Uiz = Math.sin(angleBetweenModels*i)*UI_DISTANCE;
    uiPosition = Vec3.sum(MyAvatar.position,{x:Uix,y:uiHeight,z:Uiz} );

    var index = blocks.buildingBlocks[i].lastIndexOf("/")+1;
    modelName[i] = blocks.buildingBlocks[i].slice(index);    

    var blockID = Entities.addEntity({
      type: "Model",
      modelURL:blocks.buildingBlocks[i]+"?"+Date.now(),      
      collisionless:true,
      visible:false,                      
      name:"VRBuildModel_"+i,        
      description:"",            
      position: uiPosition,      
      lifetime: -1,
      dimensions: {x:0.1*uiScale,y:0.1*uiScale,z:0.1*uiScale},           
      userData:"{ \"grabbableKey\": { \"grabbable\": true, \"triggerable\": true}}"    
    });     
      buildSetIDS.push(blockID);    
  } 
};

function checkIfAllModelsAreLoaded(){
  var timer = Script.setInterval(function(){
    var counter = 0;
    for (i in buildSetIDS){
      if(Entities.isLoaded(buildSetIDS[i])){
        counter++
      }
      if(counter == buildSetIDS.length){
        blocksLoaded = true;
        Script.clearInterval(timer);
        print("models Loaded");
      }
    }  
  },1000);
};

function checkIfEntityIsInModelsMaterialUi(checkID){
  var check = false;       
        for(i in buildSetIDS){          
          if (buildSetIDS[i] == checkID){
            check = true;
          }
        }
        for(i in materialIDS){          
          if (buildSetIDS[i] == checkID){
            check = true;
          }
        }

        for(i in handInterfaceIDs){          
          if (handInterfaceIDs[i] == checkID){
            check = true;
          }
        }
        if(checkID == modelAboveHand){ check = true}

        if(checkID == materialAboveHandID){ check = true}

        if(checkID == modelAboveHandGridID){ check = true}

        if(checkID == materialAboveHandGridID){ check = true}

        if(checkID == RayID){ check = true}

        if(checkID == SelectLID){ check = true}

        if(checkID == SelectRID){ check = true}

        if(check){return true}
        else{return false}
};

function checkIfEntityIsInMadeBlocks(checkID){
    var check = false;       
          for(i in madeBlocksIDS){          
            if (madeBlocksIDS[i] == checkID){
              check = true;
            }
          }  
          if(check){return true}
          else{return false}
};

function checkIfEntityIsInParentModels(checkID){
    var check = false;       
          for(i in parentModelsIDS){          
            if (parentModelsIDS[i] == checkID){
              check = true;
              print("+++++++++++++++++++++++");
            }
          }  
          if(check){return true}
          else{return false}
}; 

function resizeModelsBasedOnNaturalDimensions(id){  
    var naturalSize = Entities.getEntityProperties(id,["naturalDimensions"]).naturalDimensions;
    var largest = Math.max(naturalSize.x,naturalSize.y,naturalSize.z);
    var scalefactor = 0.1/largest;
    var updatedScaleDimension = {x:naturalSize.x*scalefactor,y:naturalSize.y*scalefactor,z:naturalSize.z*scalefactor};
    return updatedScaleDimension;
};

function loadMaterials(){
  materialLibrairy = Script.require("https://bas-skyspace.ams3.digitaloceanspaces.com/Build/Materials/materialLibrairyDefault5.json?"+Date.now());
  for (var i = 0, len = materialLibrairy.materialData.length; i < len; i++) {    
    angleBetweenMaterials = Math.PI * 2 / materialLibrairy.materialData.length;
    var Uix = Math.cos(angleBetweenMaterials*i)*UI_DISTANCE;
    var Uiz = Math.sin(angleBetweenMaterials*i)*UI_DISTANCE;
    uiPosition = Vec3.sum(MyAvatar.position,{x:Uix,y:uiHeight,z:Uiz} );
    var materialID = Entities.addEntity({
        type: "Material",        
        name:"VRBuildMaterial_"+i,
        position:uiPosition,
        materialURL: "materialData",
        priority: 0,        
        visible:false,
        collisionless:true,  
        materialData: JSON.stringify({
            materialVersion: 1,
            materials: {                
                albedo: {r:JSON.parse(materialLibrairy.materialData[i].albedo).r,g:JSON.parse(materialLibrairy.materialData[i].albedo).g,b:JSON.parse(materialLibrairy.materialData[i].albedo).b},
                albedoMap: materialLibrairy.materialData[i].albedoMap,            
                metallic: materialLibrairy.materialData[i].metallic,
                metallicMap:materialLibrairy.materialData[i].metallicMap,
                roughness: materialLibrairy.materialData[i].roughness,
                roughnessMap:materialLibrairy.materialData[i].roughnessMap,
                emissive:{r:JSON.parse(materialLibrairy.materialData[i].emissive).r,g:JSON.parse(materialLibrairy.materialData[i].emissive).g,b:JSON.parse(materialLibrairy.materialData[i].emissive).b},
                emissiveMap:materialLibrairy.materialData[i].emissiveMap,
                opacity:materialLibrairy.materialData[i].opacity,
                opacityMap:materialLibrairy.materialData[i].opacityMap,                              
                normalMap:materialLibrairy.materialData[i].normalMap,
                materialMappingScale:{x:JSON.parse(materialLibrairy.materialData[i].materialMappingScale).x,y:JSON.parse(materialLibrairy.materialData[i].materialMappingScale).y}        
            }
        }),
      });    

    materialIDS.push(materialID);   
  }
  //var filename = Window.save("Export entities to JSON file", "E:\Hifi data\PublicServer\Build", "*.json");
   // if (filename) {
  //      Clipboard.exportEntities(filename, materialIDS);
  //  }
};

function loadUi(){      
      modelAboveHand = Entities.addEntity({
        type: "Model",
        modelURL:blocks.buildingBlocks[1],
        parentID:MyAvatar.sessionUUID,
        parentJointIndex: LEFT_FORE_ARM,     
        collisionless:true,                      
        name:"VRBuildAboveHandModel",        
        description:"",            
        localPosition: { x: -0.17, y: 0.38, z:-0.17},      
        lifetime: -1,
        dimensions: {x:0.1,y:0.1,z:0.1},           
        userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"    
      });
      materialAboveHandID = Entities.addEntity({
        type: "Material",        
        name:"VRBuildAboveHandMaterial",        
        collisionless:true,     
        parentID:modelAboveHand,
        materialURL: "materialData",
        priority: 0,
        materialData: JSON.stringify({
            materialVersion: 1,
            materials: {
                // Value overrides entity's "color" property.
                albedo: [0.8, 0.8, 0.8],
                albedoMap: null,            
                metallic: 1,
                metallicMap:null,
                roughness: 0.2,
                roughnessMap:null,                
            }
        }),
      });
      
      modelAboveHandGridID = Entities.addEntity({
        type: "Model",
        modelURL:blocks.buildingBlocks[1],      
        collisionless:true,
        visible:true,                      
        name:"VRBuildAboveHandModelGrid",        
        description:"",            
        position: modelAboveHandPosition,      
        lifetime: -1,
        dimensions: {x:0.1,y:0.1,z:0.1},           
        userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"    
      });

      materialAboveHandGridID = Entities.addEntity({
        type: "Material",        
        name:"VRBuildAboveHandMaterialGrid",        
        collisionless:true,
        visible:true,     
        parentID:modelAboveHandGridID,
        materialURL: "materialData",
        priority: 0,
        userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}" ,
        materialData: JSON.stringify({
            materialVersion: 1,
            materials: {
                // Value overrides entity's "color" property.
                albedo: [0.0, 0.0, 1.0],
                albedoMap: null,            
                metallic: 0,
                metallicMap:null,
                roughness: 0.2,
                roughnessMap:null,
                opacity:0.2,                
            }
        }),
      });

      RayID = Entities.addEntity({
        type: "Shape",        
        shape: "Cone",                       
        name:"VRBuildRaydirection",        
        description:"",
        parentID:MyAvatar.sessionUUID,
        parentJointIndex:LEFT_HAND_INDEX,            
        localPosition: {x:0,y:0,z:0},      
        lifetime: -1,
        color:{r:200,g:0,b:200},
        alpha:0.8,
        dimensions: {x:0.2,y:0.2,z:0.2},
        collisionless:true,
        visible:false,
        userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"    
      });

      SelectLID = Entities.addEntity({
        type: "Shape",        
        shape: "Sphere",                       
        name:"VRBuildSelectLeft",
        parentID:MyAvatar.sessionUUID,
        parentJointIndex:LEFT_FORE_ARM,              
        description:"",            
        localPosition: { x: 0.17, y: 0.38, z:0.17},           
        lifetime: -1,
        color:{r:200,g:0,b:0},
        alpha:0.2,
        dimensions: {x:0.05,y:0.05,z:0.05},
        collisionless:true,
        visible:true,
        userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"    
      });

      SelectRID = Entities.addEntity({
        type: "Shape",        
        shape: "Sphere",                       
        name:"VRBuildSelectRight",
        parentID:MyAvatar.sessionUUID,
        parentJointIndex:RIGHT_HAND_INDEX_FINGER_END,        
        description:"",            
        localPosition: {x:0,y:0,z:0},      
        lifetime: -1,
        color:{r:0,g:0,b:200},
        alpha:1,
        dimensions: {x:0.01,y:0.01,z:0.01},
        collisionless:true,
        visible:true,
        userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"    
      });  
};

function changeVisiblityBasedOnPalmRotation(){
    var palmOrientation = MyAvatar.getLeftHandPose().rotation;
    upvector = Quat.getFront(palmOrientation);    
    if(upvector.y < -0.8){
      handPalmUp = true;
    }
    else{
      handPalmUp = false;      
    }
    
    var currentVisibleState = Entities.getEntityProperties(modelAboveHand,["visible"]).visible;
    if(handPalmUp && !currentVisibleState){
      Entities.editEntity(modelAboveHand,{visible:true,userData:"{ \"grabbableKey\": { \"grabbable\": true, \"triggerable\": false}}"});
      Entities.editEntity(SelectLID,{visible:true});
      for (var i = 0, len = handInterfaceIDs.length; i < len; i++) {            
        Entities.editEntity(handInterfaceIDs[i],{visible:true});               
      } 
    }
    
    if(!handPalmUp && currentVisibleState){
      Entities.editEntity(modelAboveHand,{visible:false,userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"});
      Entities.editEntity(SelectLID,{visible:false});
      for (var i = 0, len = handInterfaceIDs.length; i < len; i++) {            
        Entities.editEntity(handInterfaceIDs[i],{visible:false});               
      } 
    }    
};

function makeBlock(){    
  print("making block");    
    if(gridBuildEnable){
        makeBlockPosition = {x:gridx,y:gridy,z:gridz};
        makeBlockRotation = gridRotation;
    }
    else{
        makeBlockPosition = modelbuildProps.position;
        makeBlockRotation = modelbuildProps.rotation
    }

    madeBlock = Entities.addEntity({
        type: "Model",
        modelURL:modelbuildProps.modelURL,    
        //shapeType:"simple-compound",                       
        name:"VRBuildModel",        
        description:"",
        collisionless:true,              
        position: makeBlockPosition,
        rotation: makeBlockRotation,      
        lifetime: -1,
        dimensions: modelbuildProps.dimensions,
        userData:"{ \"grabbableKey\": { \"grabbable\": true, \"triggerable\": true}}"    
    });
    madeBlocksIDS.push(madeBlock);

  var madeMaterial = Entities.addEntity({
      collisionless:true,  
      type: "Material",        
      name:"VRBuildMaterial",     
      parentID:madeBlock,
      materialURL: "materialData",
      ignorePickIntersection : true,  
      priority: 0,
      materialData: materialBuildProps.materialData
    });
    madeMaterialsIDS.push(madeMaterial);
    Entities.editEntity(modelAboveHand,{localPosition:{x: -0.17, y: 0.38, z:-0.17}});   
};

function makeParent(entityID){ 
    var checkGrabbedInParent = checkIfEntityIsInParentModels(entityID);
    if(checkGrabbedInParent){
      var entityProps = Entities.getEntityProperties(entityID);
      print("in blocks");
      Entities.editEntity(entityID,{userData:"{ \"grabbableKey\": { \"grabbable\": true, \"triggerable\": false}}"   });
      Entities.editEntity(entityID,{name:"VRfinishedModelParent"});
      print("parent = " + entityID);  
      for(i in parentModelsIDS){          
          var tempProps = Entities.getEntityProperties(parentModelsIDS[i]);
          if(tempProps.id != entityID){
              var newLocalPosition = Entities.worldToLocalPosition(tempProps.position, entityID);
              print(JSON.stringify(newLocalPosition));
              print("child " + parentModelsIDS[i] );
              Entities.editEntity(parentModelsIDS[i],{
                parentID:entityID,
                localPosition:newLocalPosition,
                userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}",
                name:"VRfinishedModelChild"
              });              
          }
      }
      for (var j = 0, len = parentChildHighlight.length; j < len; j++) {
        Entities.deleteEntity(parentChildHighlight[j]);        
      }
      parentChildHighlight = [];
      parentModelsIDS = [];
      parentMaterialIDS = [];
      isBuild = true;

      var parentSelectID = Entities.addEntity({
        type: "Model",
        parentID:entityID,
        modelURL:entityProps.modelURL,      
        collisionless:true,
        visible:true,                      
        name:"VRBuildParentSelect",        
        description:"",        
        rotation: entityProps.rotation,      
        lifetime: 5,
        dimensions: Vec3.multiply(entityProps.dimensions,1.5),                         
        userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"    
      });

      var parentSelectMaterialID = Entities.addEntity({
        type: "Material",        
        name:"VRBuildParentSelectMatertial",        
        collisionless:true,
        visible:true,     
        parentID:parentSelectID,
        materialURL: "materialData",
        priority: 0,
        userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}" ,
        materialData: JSON.stringify({
            materialVersion: 1,
            materials: {
                // Value overrides entity's "color" property.
                albedo: [0.0, 1.0, 1.0],
                albedoMap: null,            
                metallic: 0,
                metallicMap:null,
                roughness: 0.2,
                roughnessMap:null,
                opacity:0.1,                
            }
        }),
      });                
    }  
};

function onLeftStickX(value){
  if(value <= -0.5){UIModelRotate = UIModelRotate-UI_ROTATE_SLOW};
  if(value >= 0.5){UIModelRotate= UIModelRotate+UI_ROTATE_SLOW};
  if(value <= -0.9){UIModelRotate = UIModelRotate-UI_ROTATE_FAST};
  if(value >= 0.9){UIModelRotate = UIModelRotate+UI_ROTATE_FAST};  
};

function onLeftStickY(value){    
};

function onRightStickX(value){
  if(value <= -0.5){UIRotate = UIRotate-UI_ROTATE_SLOW};
  if(value >= 0.5){UIRotate= UIRotate+UI_ROTATE_SLOW};
  if(value <= -0.9){UIRotate = UIRotate-UI_ROTATE_FAST};
  if(value >= 0.9){UIRotate = UIRotate+UI_ROTATE_FAST}; 
};

function onRightStickY(value){
};   

function definemappings(){
    var buildmapping = Controller.newMapping("buildMapping");
    buildmapping.from(Controller.Standard.RY).to(onRightStickY);
    buildmapping.from(Controller.Standard.RX).to(onRightStickX);     
    buildmapping.from(Controller.Standard.LY).to(onLeftStickY);
    buildmapping.from(Controller.Standard.LX).to(onLeftStickX);    
};

//Heartbeat reset
var resetTimer = Script.setInterval(function () {
  resetLeft = true;
  resetRight = true;   
}, 500);

function initDisable(){
  Controller.disableMapping(("buildMapping"));
  for (var i = 0, len = buildSetIDS.length; i < len; i++) {            
      Entities.editEntity(buildSetIDS[i],{visible:false,userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"});               
  }
  for (var j = 0, len = materialIDS.length; j < len; j++) {
      Entities.editEntity(materialIDS[j],{visible:false,userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"});
    }
    for (var k = 0, len = madeBlocksIDS.length; k < len; k++) {
      Entities.editEntity(madeBlocksIDS[k],{visible:true,userData:"{ \"grabbableKey\": { \"grabbable\": true, \"triggerable\": false}}"});
    }
  Entities.editEntity(modelAboveHand,{userData:"{ \"grabbableKey\": { \"grabbable\": true, \"triggerable\": false}}"   });
  print("Build");
};

function initModelMode(){
  Controller.enableMapping("buildMapping");
  for (var i = 0, len = buildSetIDS.length; i < len; i++) {            
    Entities.editEntity(buildSetIDS[i],{visible:true,userData:"{ \"grabbableKey\": { \"grabbable\": true, \"triggerable\": false}}"});               
  }    
  for (var j = 0, len = materialIDS.length; j < len; j++) {
    Entities.editEntity(materialIDS[j],{visible:false,userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"});
  }
  for (var k = 0, len = madeBlocksIDS.length; k < len; k++) {
    Entities.editEntity(madeBlocksIDS[k],{visible:false,userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"});
  }
  Entities.editEntity(modelAboveHand,{userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"   });
  print("Model");
};

function initMaterialMode(){
  Controller.enableMapping("buildMapping");   
  for (var j = 0, len = blocks.buildingBlocks.length; j < len; j++) {
    if (buildSetIDS[j] != currentID){  
    Entities.editEntity(buildSetIDS[j],{visible:false,userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"});
    }
  }
  for (var j = 0, len = materialIDS.length; j < len; j++) {
    Entities.editEntity(materialIDS[j],{visible:true,userData:"{ \"grabbableKey\": { \"grabbable\": true, \"triggerable\": false}}"});
  }
  for (var k = 0, len = madeBlocksIDS.length; k < len; k++) {
    Entities.editEntity(madeBlocksIDS[k],{visible:false,userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"});
  }

  Entities.editEntity(modelAboveHand,{userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"   });
  print("Material");
};

function initParentMode(){
    Controller.disableMapping(("buildMapping"));
    for (var j = 0, len = blocks.buildingBlocks.length; j < len; j++) {
      if (buildSetIDS[j] != currentID){  
      Entities.editEntity(buildSetIDS[j],{visible:false,userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"});
      }
    }
    for (var j = 0, len = materialIDS.length; j < len; j++) {
      Entities.editEntity(materialIDS[j],{visible:false,userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"});
    }
    for (var k = 0, len = madeBlocksIDS.length; k < len; k++) {
      Entities.editEntity(madeBlocksIDS[k],{visible:true,userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"});
    }
  
    Entities.editEntity(modelAboveHand,{userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"   });
    print("Parent");
    isBuild = false;
};

function onInputEvent(input, value) {
    if (Controller.Hardware.Vive ) {
    if(input == Controller.Standard.LSCenter && value == 1 && resetLeft){
      currentModeLeft++;
      if(currentModeLeft>=4){currentModeLeft=0;}
      resetLeft = false;
      onceLeft = true; 
    }
    if(input == Controller.Standard.RSCenter && value == 1 && resetRight){
      currentModeRight++;
      if(currentModeRight>=4){currentModeRight=0;}
      resetRight = false;
      onceRight = true;     
    }    
  }

  if (Controller.Hardware.OculusTouch ) {
    if(input == Controller.Standard.LS && value == 1 && resetLeft){       
        currentModeLeft++;
        if(currentModeLeft>=4){currentModeLeft=0;}
        resetLeft = false;
        onceLeft = true;     
    }
    if(input == Controller.Standard.RS && value == 1 && resetRight){      
      currentModeRight++;
      if(currentModeRight>=4){currentModeRight=0;}
      resetRight = false;
      onceRight = true;       
    }      
  }   
};
  
//MAIN UPDATE LOOP
function startBuilding(deltatime){
//wait for buildingBlocks to be resized to their natural proportions
  if (blocksLoaded && !blocksResized){
        for (i in buildSetIDS){
          var updatedDimensions = resizeModelsBasedOnNaturalDimensions(buildSetIDS[i]);
          Entities.editEntity(buildSetIDS[i],{dimensions:updatedDimensions})
        }
    blocksResized = true;
  }
// main loop after natural sizes have been updated
  if(blocksResized){ 
    modelAboveHandProps = Entities.getEntityProperties(modelAboveHand);
    materialAboveHandProps = Entities.getEntityProperties(materialAboveHandID);  
   
    //if grabbed get props of grabbed entity
    if(grabbedRightEntityID){
        
      grabbedRightEntityProps = Entities.getEntityProperties(grabbedRightEntityID);

      if(grabbedRightEntityProps.type == "Model"){
        grabbedRightPosition = grabbedRightEntityProps.position;
        grabbedRightURL = grabbedRightEntityProps.modelURL;
        grabbedRightDimensions = grabbedRightEntityProps.dimensions;
      }
      if(grabbedRightEntityProps.type == "Material"){ 
        grabbedRightPosition = grabbedRightEntityProps.position;    
        grabbedRightMaterial = grabbedRightEntityProps.materialData;        
      }
      
    }
    else{        
    }
    if(grabbedRightEntityID && grabbedRightEntityID == modelAboveHand && gridBuildEnable){
        Entities.editEntity(modelAboveHandGridID,{visible:true});
    }
    else{
        Entities.editEntity(modelAboveHandGridID,{visible:false});
    }

  if(modeRight == "Build" && releasedRightEntityID == modelAboveHand && rightHandReleasedEntity == true){
    print("Released..............................................................."); 
          
    print("placing block"); 
    modelbuildProps = Entities.getEntityProperties(modelAboveHand);
    materialBuildProps = Entities.getEntityProperties(materialAboveHandID);
    makeBlock();       
    rightHandReleasedEntity = false;    
  }
    //reposition uiModels
  if(modeRight == "Model"){               
          for (var i = 0, len = blocks.buildingBlocks.length; i < len; i++) {           
              var Uix = Math.cos(angleBetweenModels*i+UIRotate)*UI_DISTANCE;
              var Uiz = Math.sin(angleBetweenModels*i+UIRotate)*UI_DISTANCE;
              var Uip = Vec3.sum(MyAvatar.position,{x:Uix,y:uiHeight,z:Uiz} );    
              if (buildSetIDS[i] != currentID){
                  Entities.editEntity(buildSetIDS[i],{position:Uip});
              }
          }   
  }

  //reposition uiMaterials
  if(modeRight == "Material"){      
            for (var i = 0, len = materialIDS.length; i < len; i++) {              
                var Uix = Math.cos(angleBetweenMaterials*i+UIRotate)*UI_DISTANCE;
                var Uiz = Math.sin(angleBetweenMaterials*i+UIRotate)*UI_DISTANCE;
                var Uip = Vec3.sum(MyAvatar.position,{x:Uix,y:uiHeight,z:Uiz} );                          
                    Entities.editEntity(materialIDS[i],{position:Uip});
                }         
  }

  //ModeSelector left  
  switch(true) {
      case currentModeLeft == 0 && onceLeft:      
      print("Mode right 0 - Build ");
      modeLeft = "Build";
      onceLeft = false;                       
      break;

      case currentModeLeft == 1 && onceLeft:
        print("Mode right 1 - Parent");
        modeLeft = ""; 
        onceLeft = false;           
        break;        
          
      case currentModeLeft == 2 && onceLeft:
        print("Mode 2 Right - Delete");
        modeLeft = ""; 
        onceLeft = false;                 
        break;    
  }

  //Mode selector right
  switch(true) {
      case currentModeRight == 0 && onceRight && modeRight != "Build" :
        initDisable();
        modeRight = "Build";
        print("Mode right 0 - Build ");
        Entities.editEntity(handInterfaceID,{text:"Build"});
        onceRight = false;                   
        break;

      case currentModeRight == 1 && onceRight && modeRight != "Model":
        initModelMode();        
        modeRight = "Model"; 
        print("Mode right 1 - Model ");
        Entities.editEntity(handInterfaceID,{text:"Model"});
        onceRight = false;                 
        break;       
        
      case currentModeRight == 2 && onceRight && modeRight != "Material":            
        initMaterialMode();
        modeRight = "Material";
        print("Mode right 2 - Material ");
        Entities.editEntity(handInterfaceID,{text:"Material"}); 
        onceRight = false;                      
        break;

      case currentModeRight == 3 && onceRight && modeRight != "Parent":            
        initParentMode();
        modeRight = "Parent";
        print("Mode right 3 - Parent ");
        Entities.editEntity(handInterfaceID,{text:"Parent"}); 
        onceRight = false;                      
        break;
    }    
    
    //Superimpose an entity that is at the grid location
    if(gridBuildEnable){
        var gridposStart  = Entities.getEntityProperties(modelAboveHand,["position"]).position;
        gridx =Math.round(gridposStart.x/gridsize)*gridsize;
        gridy =Math.round(gridposStart.y/gridsize)*gridsize;
        gridz =Math.round(gridposStart.z/gridsize)*gridsize;     

        var gridRotStart = Entities.getEntityProperties(modelAboveHand,["rotation"]).rotation;      
        var eulerAngles = Quat.safeEulerAngles(Entities.worldToLocalRotation(gridRotStart, MyAvatar.sessionUUID));
        gridRotation = Quat.fromPitchYawRollDegrees(Math.round(eulerAngles.x/45)*45,Math.round(eulerAngles.y/45)*45,Math.round(eulerAngles.z/45)*45);      
        Entities.editEntity(modelAboveHandGridID,{position:{ x: gridx, y: gridy, z: gridz },rotation:gridRotation});
    }

    var button1Position = Entities.getEntityProperties(handInterfaceButton1ID,["position"]).position; 
    var button1ColorTemp = Entities.getEntityProperties(handInterfaceButton1ID,["color"]).color.g;
    var button2Position = Entities.getEntityProperties(handInterfaceButton2ID,["position"]).position; 
    var button2ColorTemp = Entities.getEntityProperties(handInterfaceButton2ID,["color"]).color.b;
    var button3Position = Entities.getEntityProperties(handInterfaceButton3ID,["position"]).position; 
    var button3ColorTemp = Entities.getEntityProperties(handInterfaceButton3ID,["color"]).color.r;
    var button4Position = Entities.getEntityProperties(handInterfaceButton4ID,["position"]).position; 
    var button4ColorTemp = Entities.getEntityProperties(handInterfaceButton4ID,["color"]).color.r;
    var button5Position = Entities.getEntityProperties(handInterfaceButton5ID,["position"]).position; 
    var button5ColorTemp = Entities.getEntityProperties(handInterfaceButton5ID,["color"]).color.b;    

    var tempLocalPosition = Entities.getEntityProperties(modelAboveHand,["localPosition"]).localPosition;
    var tempWorldPosition = Entities.localToWorldPosition( tempLocalPosition, MyAvatar.sessionUUID, LEFT_FORE_ARM, true );
    distanceToModel = Vec3.distance(tempWorldPosition, grabbedRightPosition);

    var tempLocalPosition = Entities.getEntityProperties(SelectLID,["localPosition"]).localPosition;
    var tempWorldPosition = Entities.localToWorldPosition( tempLocalPosition, MyAvatar.sessionUUID, LEFT_FORE_ARM, true );
    distanceToEntityToBeDeleted = Vec3.distance(tempWorldPosition, grabbedRightPosition);

    distanceFingerTipToButton1 = Vec3.distance(button1Position, MyAvatar.getJointPosition(RIGHT_HAND_INDEX_FINGER_END));
    distanceFingerTipToButton2 = Vec3.distance(button2Position, MyAvatar.getJointPosition(RIGHT_HAND_INDEX_FINGER_END));
    distanceFingerTipToButton3 = Vec3.distance(button3Position, MyAvatar.getJointPosition(RIGHT_HAND_INDEX_FINGER_END));
    distanceFingerTipToButton4 = Vec3.distance(button4Position, MyAvatar.getJointPosition(RIGHT_HAND_INDEX_FINGER_END));
    distanceFingerTipToButton5 = Vec3.distance(button5Position, MyAvatar.getJointPosition(RIGHT_HAND_INDEX_FINGER_END));


    if(distanceFingerTipToButton1 < 0.03){
        var tempcolor = 255 - ((distanceFingerTipToButton1/0.03)*255);
        Entities.editEntity(handInterfaceButton1ID,{color:{r:255,g:tempcolor,b:tempcolor}});    
    }
    if(distanceFingerTipToButton1 > 0.03 && button1ColorTemp != 0){        
        Entities.editEntity(handInterfaceButton1ID,{color:{r:255,g:0,b:0}});    
    }
        
    if(distanceFingerTipToButton1 < 0.01){
        Controller.triggerHapticPulse(1, 200, 1);
        currentModeRight = 0;
        onceRight = true;
        resetRight = false;          
    }

    if(distanceFingerTipToButton2 < 0.03){
        var tempcolor = 255 - ((distanceFingerTipToButton2/0.03)*255);
        Entities.editEntity(handInterfaceButton2ID,{color:{r:tempcolor,g:255,b:tempcolor}});    
    }

    if(distanceFingerTipToButton2 > 0.03 && button2ColorTemp != 0){        
        Entities.editEntity(handInterfaceButton2ID,{color:{r:0,g:255,b:0}});    
    }    
    
    if(distanceFingerTipToButton2 < 0.01 && resetRight){
        Controller.triggerHapticPulse(1, 200, 1);
        currentModeRight = 1;
        onceRight = true;
        resetRight = false;     
    }

    if(distanceFingerTipToButton3 < 0.03){
        var tempcolor = 255 - ((distanceFingerTipToButton3/0.03)*255);
        Entities.editEntity(handInterfaceButton3ID,{color:{r:tempcolor,g:tempcolor,b:255}});    
    }

    if(distanceFingerTipToButton3 > 0.03 && button3ColorTemp != 0){        
        Entities.editEntity(handInterfaceButton3ID,{color:{r:0,g:0,b:255}});    
    }    
    
    if(distanceFingerTipToButton3 < 0.01){
        Controller.triggerHapticPulse(1, 200, 1);
        currentModeRight = 2;
        onceRight = true;
        resetRight = false;          
    }

    if(distanceFingerTipToButton4 < 0.03){
        var tempcolor = 255 - ((distanceFingerTipToButton4/0.03)*255);
        Entities.editEntity(handInterfaceButton4ID,{color:{r:tempcolor,g:255,b:255}});    
    }

    if(distanceFingerTipToButton4 > 0.03 && button4ColorTemp != 0){        
        Entities.editEntity(handInterfaceButton4ID,{color:{r:0,g:255,b:255}});    
    }    
    
    if(distanceFingerTipToButton4 < 0.01 && resetRight){
        Controller.triggerHapticPulse(1, 200, 1);
        gridBuildEnable = !gridBuildEnable;
        if(gridBuildEnable){Entities.editEntity(handInterfaceID,{text:"Grid On"}); }
        if(!gridBuildEnable){Entities.editEntity(handInterfaceID,{text:"Grid Off"}); }
        onceRight = true;
        resetRight = false;          
    }

    if(distanceFingerTipToButton5 < 0.03){
        var tempcolor = 255 - ((distanceFingerTipToButton5/0.03)*255);
        Entities.editEntity(handInterfaceButton5ID,{color:{r:255,g:255,b:tempcolor}});    
    }

    if(distanceFingerTipToButton5 > 0.03 && button5ColorTemp != 0){        
        Entities.editEntity(handInterfaceButton5ID,{color:{r:255,g:255,b:0}});    
    }    
    
    if(distanceFingerTipToButton5 < 0.01 && resetRight){
        Controller.triggerHapticPulse(1, 200, 1);
        currentModeRight = 3;
        onceRight = true;
        resetRight = false;         
    }
  
    if(distanceToModel < 0.1){        
        if(grabbedRightEntityProps.type == "Model"){          
          var modelSwap = grabbedRightURL;            
          //var resizedDim = resizeModelsBasedOnNaturalDimensions(grabbedRightEntityProps.id);
          var resizedDim = grabbedRightEntityProps.dimensions;                          
          Entities.editEntity(modelAboveHand,{modelURL:modelSwap,
                                              dimensions:resizedDim});
        Entities.editEntity(modelAboveHandGridID,{modelURL:modelSwap,
        dimensions:resizedDim});          
        } 
        if(grabbedRightEntityProps.type == "Material"){            
          Entities.editEntity(materialAboveHandID,{materialData:grabbedRightMaterial});
        }             
  }
    
    //check if entity is close to delete object and if so delete entity
    if (distanceToEntityToBeDeleted < 0.1){    
        if(grabbedRightEntityProps){
            if(grabbedRightEntityProps.type == "Model"){
                var check = checkIfEntityIsInModelsMaterialUi(grabbedRightEntityProps.id);
                var checkIfInMadeBlocks = checkIfEntityIsInMadeBlocks(grabbedRightEntityProps.id);
                if(!check && checkIfInMadeBlocks){
                    Entities.deleteEntity(grabbedRightEntityProps.id);
                    grabbedRightEntityID = null;
                    grabbedRightEntityProps = null;
                }
            } 
        }       
    }        
  changeVisiblityBasedOnPalmRotation();
  updateOverlay(overlayID);
  }
};

Script.scriptEnding.connect(function () {  
  Overlays.deleteOverlay(overlayID);    
  Controller.disableMapping("buildMapping");
  Controller.inputEvent.disconnect(onInputEvent);
  print("disconnecting.............."); 
  for (var i = 0, len = blocks.buildingBlocks.length; i < len; i++) {
      Entities.deleteEntity(buildSetIDS[i]); 
  }
  for (var i = 0, len = madeBlocksIDS.length; i < len; i++) {
      Entities.deleteEntity(madeBlocksIDS[i]); 
  }
  for (var i = 0, len = madeMaterialsIDS.length; i < len; i++) {
      Entities.deleteEntity(madeMaterialsIDS[i]); 
  }
  for (var i = 0, len = materialIDS.length; i < len; i++) {
      Entities.deleteEntity(materialIDS[i]); 
  }
    for (var i = 0, len = materialsIDS.length; i < len; i++) {
        Entities.deleteEntity(materialsIDS[i]);
  }
  for (var i = 0, len = handInterfaceIDs.length; i < len; i++) {
    Entities.deleteEntity(handInterfaceIDs[i]);
}
  Entities.deleteEntity(RayID);
  Entities.deleteEntity(SelectLID);
  Entities.deleteEntity(SelectRID); 
  Entities.deleteEntity(modelAboveHand);
  Messages.messageReceived.disconnect(onMessageReceived);
  Entities.mousePressOnEntity.disconnect(onMousePressOnEntity);
  Messages.unsubscribe(channelName);
  Script.clearInterval(resetTimer);  
  Script.update.disconnect(startBuilding);
});

Entities.hoverOverEntity.connect(function (entityID, event) { 
    if(modeRight == "Parent"){
      var entityProps = Entities.getEntityProperties(entityID);
        var childMaterialID = null;
        var check = checkIfEntityIsInMadeBlocks(entityID);
        if(check){
            var children = Entities.getChildrenIDs(entityID);
            for (i in children){
                var childProps = Entities.getEntityProperties(children[i]);
                if(childProps.type == "Material"){
                    childMaterialID = childProps.id;
                }
            }
            //Entities.editEntity(entityID,{userData:"{ \"grabbableKey\": { \"grabbable\": true, \"triggerable\": true}}"   });
            print("moved entity to parentids");
            parentModelsIDS.push(entityID);
            if(childMaterialID != null){parentMaterialIDS.push(childMaterialID);}
            var index = madeBlocksIDS.indexOf(entityID);
            madeBlocksIDS.splice(index,1);
            var index2 = madeMaterialsIDS.indexOf(childMaterialID);
            if(index2>-1){
                madeMaterialsIDS.splice(index2,1);
            }
            var parentSelectID = Entities.addEntity({
              type: "Model",
              parentID:entityID,
              modelURL:entityProps.modelURL,      
              collisionless:true,
              visible:true,                      
              name:"VRBuildParentSelect",        
              description:"",             
              rotation: entityProps.rotation,      
              lifetime: -1,
              dimensions: Vec3.multiply(entityProps.dimensions,1.2),
              ignorePickIntersection :true,                         
              userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}"    
            });
            parentChildHighlight.push(parentSelectID);

            var parentSelectMaterialID = Entities.addEntity({
              type: "Material",        
              name:"VRBuildParentSelectMatertial",        
              collisionless:true,
              visible:true,     
              parentID:parentSelectID,
              materialURL: "materialData",
              priority: 0,
              ignorePickIntersection : true,     
              userData:"{ \"grabbableKey\": { \"grabbable\": false, \"triggerable\": false}}" ,
              materialData: JSON.stringify({
                  materialVersion: 1,
                  materials: {
                      // Value overrides entity's "color" property.
                      albedo: [1.0, 1.0, 0.0],
                      albedoMap: null,            
                      metallic: 0,
                      metallicMap:null,
                      roughness: 0.2,
                      roughnessMap:null,
                      opacity:0.1,                
                  }
              }),
            });
                      
        }

        
      }  
});

function onMousePressOnEntity(entityID, event) {
    print("triggerpress "+entityID);
    if(modeRight == "Parent" && isBuild == false){
      print("0+" +entityID);       
      makeParent(entityID);      
      
    }
     
};


function onMessageReceived(channel, message) {
  if(channel == channelName){   
  action = JSON.parse(message).action;
  print(JSON.stringify(JSON.parse(message)));
  var actionHand = JSON.parse(message).joint;  
  if(action == "grab"){
    if(actionHand == "LeftHand"){
        grabbedLeftEntityID = JSON.parse(message).grabbedEntity;
        print("Left grabbed entity: " + grabbedLeftEntityID);
    }
    if(actionHand == "RightHand"){
      grabbedRightEntityID = JSON.parse(message).grabbedEntity;
      print("Right grabbed entity: " + grabbedRightEntityID);
    }
  }
  if(action == "release"){
    if(actionHand == "LeftHand"){
        releasedLeftEntityID = JSON.parse(message).grabbedEntity;
        print("Left released entity: " + releasedLeftEntityID);
        grabbedLeftEntityID = null;
    }
    if(actionHand == "RightHand"){
        releasedRightEntityID = JSON.parse(message).grabbedEntity;
        print("Right released entity: " + releasedRightEntityID);
        
      rightHandReleasedEntity = true;        
      grabbedRightEntityID = null;
    }
  }
  }
};

MyAvatar.sensorToWorldScaleChanged.connect(function (scale) {
  uiHeight = scale * userHeight * 0.3;
  UI_DISTANCE = scale * 0.6;
  for (i in buildSetIDS){
    var updatedDimensions = resizeModelsBasedOnNaturalDimensions(buildSetIDS[i]); 
    Entities.editEntity(buildSetIDS[i],{dimensions:{x:updatedDimensions.x*scale,y:updatedDimensions.y*scale,z:updatedDimensions.z*scale}});
  }
  
});

//MAIN PROGRAM STARTS HERE
//init
definemappings();
createHandInterface();
loadModels();
loadMaterials();
loadUi();
checkIfAllModelsAreLoaded();

//Connect
Messages.subscribe(channelName);
Messages.messageReceived.connect(onMessageReceived);
Controller.inputEvent.connect(onInputEvent);
Entities.mousePressOnEntity.connect(onMousePressOnEntity);

//Update loop
Script.update.connect(startBuilding);
