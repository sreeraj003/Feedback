const ValidateData=(data)=>{
    const {usage,goals,rating,birthday} = data
    if(!usage || goals.length==0 ||!rating||!birthday){
        return "Please flll the fields"
    }
    return 'done'
  }
export default ValidateData