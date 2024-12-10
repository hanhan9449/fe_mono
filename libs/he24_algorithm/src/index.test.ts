import {describe, expect, test} from "vitest";
import {Solution} from "./index.ts";

describe('ability', () => {
    function test_he24(a: number,b: number,c: number,d: number) {
        const solution = new Solution()
        solution.real_solution(24,[a,b,c,d])
        expect(solution.result_list.length > 0)
        for (const item of solution.result_list) {
            expect(solution.equal(eval(solution.map_str(item)),24)).equal(true)
        }
    }
    test('work', () => {
        test_he24(4,4,4,4)
        test_he24(2,2,5,5)
        test_he24(1,2,3,4)
        test_he24(1,3,2,4)
        test_he24(5,5,5,1)
        test_he24(5,1,5,1)
        test_he24(6,9,9,10)
        test_he24(1,6,11,13)
        test_he24(2,5,5,10)
        test_he24(3,3,8,8)
    })
})