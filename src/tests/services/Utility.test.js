import Utility from "../../services/Utility";

it("should get the correct date", ()=>{
    let date = Utility.getDate();
    let d = new Date();
    let day = d.getDate(), month = d.getMonth() + 1, year = d.getFullYear();
    expect(date).toBe(`${day}/${month}/${year}`);
})