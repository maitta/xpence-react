import db from "../../db/DataAccess";

it("should fail if not executed in a browser", () => {
    try{
        db();
    }catch(e){
        //console.log(e.message)
        expect(e.message).toBe("openDatabase is not defined")
    }    
});