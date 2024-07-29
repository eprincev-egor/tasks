import { ExtraMinutesPrecisionDomainError, NegativeHoursDomainError } from "../error";
import { HoursValueObject } from "../HoursValueObject";
import { strict } from "assert";

describe("HoursValueObject", () => {

    it("should reject negative hours", async () => {
        strict.throws(() => {
            HoursValueObject.create(-1);
        }, NegativeHoursDomainError);
    });

    it("should reject duration less than 30 minutes", async () => {
        strict.throws(() => {
            HoursValueObject.create(0.1);
        }, ExtraMinutesPrecisionDomainError);
    });

});