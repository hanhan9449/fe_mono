import {describe, expect, test} from "vitest";
import {CalcOpEnum, Solution, SolutionNode, suan_list} from "./index.ts";

describe('ability', () => {
    function test_he24(a: number,b: number,c: number,d: number) {
        const solution = new Solution()
        solution.real_solution(24,[a,b,c,d])
        // console.log(solution.result_list2)
        expect(solution.result_list2.length > 0).equal(true)
        for (const item of solution.result_list2) {
            expect(solution.equal(eval(solution.map_str_v2(item)),24)).equal(true)
        }
    }
    test('simple work', () => {
        test_he24(4,4,4,4)
    })
    test('simple work2', () => {
        test_he24(1,1,1,12)
        test_he24(1,1,1,13)
    })
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

describe('SolutionNode', () => {
    test('empty SolutionNode', () => {
        expect(new SolutionNode(0).getResult()).equal(0)
    })
    test('initia SolutionNode', () => {
        const solutionNode = new SolutionNode()
        solutionNode.result = 3
        expect(solutionNode.getResult()).equal(3)
    })
    test('SolutionNode op', () => {
        const solutionNode = new SolutionNode()
        solutionNode.left = new SolutionNode(3)
        solutionNode.right = new SolutionNode(4)
        solutionNode.op = suan_list.find(it => it.label = CalcOpEnum.ADD)
        expect(solutionNode.getResult()).equal(7)
    })
})