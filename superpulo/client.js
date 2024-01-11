let tick;

RegisterCommand('superpulo', async()=>{
    if(tick){
        clearTick(tick);
        tick = null;
    }else{
        tick = setTick(superPulo);
    }
})

function superPulo(){
    SetSuperJumpThisFrame(PlayerId());
}

