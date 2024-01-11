let tickCrescerJogador;

setTick(async()=>{
    let ped = PlayerPedId();
    let [x,y,z] = GetEntityCoords(ped, true);
    let distancia = GetDistanceBetweenCoords(x,y,z,peds[0].coords.x, peds[0].coords.y, peds[0].coords.z, true);
    if(distancia <=100){
            for(ped of peds){
                if(!ped.idPed || !DoesEntityExist(ped.idPed)){
                    await carregarModelo(ped.modelo);
                    let pedId = CreatePed(28, ped.modelo, ped.coords.x,ped.coords.y,ped.coords.z, false, false)
                    ped.idPed = pedId;
                    FreezeEntityPosition(pedId, true);
                    SetEntityInvincible(pedId, true);
                    SetBlockingOfNonTemporaryEvents(pedId, true);
                    SetEntityCollision(pedId, false);
                    
                    let animacao = ped.animacao;
                    await carregarAnimacao(animacao.dict)
                    TaskPlayAnim(pedId, animacao.dict, animacao.anim, 1000,1000,-1,1,0,true, true, true)
                    criarTickCrescerJogador();
                }
            }
    }else{
        if(tickCrescerJogador){
            clearTick(tickCrescerJogador);
            tickCrescerJogador = null;
            for(ped of peds){
                SetEntityAsNoLongerNeeded(ped.idPed);
                SetModelAsNoLongerNeeded(ped.modelo);
                DeleteEntity(ped.idPed);
                ped.idPed = null;
            } 
        }
        await Delay(5000);
    }
})


criarTickCrescerJogador = ()=>{
    if(!tickCrescerJogador){
        tickCrescerJogador = setTick(()=>{
            for( ped of peds){
                    let animacao = ped.animacao;
                    SetEntityMatrix(ped.idPed,0,5,0,5,0,0,0,0,5,ped.coords.x,ped.coords.y,ped.coords.z+4)
                    if(!IsEntityPlayingAnim(ped.idPed, animacao.dict, animacao.anim,3)){
                        TaskPlayAnim(ped.idPed, animacao.dict, animacao.anim, 1000,1000,-1,1,0,true, true, true)
                        SetBlockingOfNonTemporaryEvents(pedId, true);
                    }
                }
        })
    }
}

Delay = (ms) => new Promise(res => setTimeout(res, ms));
async function carregarModelo(modelo){
    RequestModel(modelo);
    while(!HasModelLoaded(modelo)){
      await Delay(500);
    }
}

async function carregarAnimacao(dict){
    RequestAnimDict(dict)
    while(!HasAnimDictLoaded(dict)){
        await Delay(100);
    }
}