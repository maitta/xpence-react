import { SummaryType, ButtonType } from "../../services/Enum";

it("should make sure all summary types are there", () => {
    let st = SummaryType;    
    expect(Object.keys(st).length).toBe(3);
    expect(Object.keys(st)).toEqual(["SUBTOTAL", "PERCENTAGE", "TOTAL"]);
})

it("should make sure all button types are there", () => {
    let bt = ButtonType;
    expect(Object.keys(bt).length).toBe(2);
    expect(Object.keys(bt)).toEqual(["ADD", "NEW"])
})