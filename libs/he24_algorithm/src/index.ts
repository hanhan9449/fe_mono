
enum CalcOpEnum {
    ADD= 'add',
    MINUS = 'minus',
    MUL = 'mul',
    DIV = 'div'
}
function mapStr(left: string, right: string, label: CalcOpEnum) {
    let big = left
    let small = right
    const ops = {
        [CalcOpEnum.ADD]: '+',
        [CalcOpEnum.MINUS]: '-',
        [CalcOpEnum.MUL]: '*',
        [CalcOpEnum.DIV]: '/',
    }
    function opCount(s: string) {
        const matched = s.matchAll(/[-+*\/]/g)
        return [...matched].length
    }
    if ([CalcOpEnum.ADD, CalcOpEnum.MUL].includes(label)) {
        [big, small] = [big, small].sort((a, b) => a < b ? 1 : -1)
        if (opCount(left) < opCount(right)) {
            [big, small] = [small, big]
        }

    }
    function wrap(s: string) {
        if (opCount(s) > 0) {
            return `(${s})`
        }
        return s
    }
    big = wrap(big)
    small = wrap(small)
    switch (label) {
        case CalcOpEnum.ADD:
        case CalcOpEnum.DIV:
        case CalcOpEnum.MINUS:
        case CalcOpEnum.MUL:
            return `${big} ${ops[label]} ${small}`
        default:
            return ''
    }

}
export const suan_list = [

    {
        label: CalcOpEnum.ADD, suan: (left: number, right: number) => {
            return left + right
        }, map_str: (left: any, right: any) => `(${left} + ${right})`
    },
    {
        label: CalcOpEnum.MINUS, suan: (left: number, right: number) => {
            return left - right
        }, map_str: (left: any, right: any) => `(${left} - ${right})`
    },
    // {
    //     label: 'minus-revert', suan: (left: number, right: number) => {
    //         return right - left
    //     }, map_str: (left: any, right: any) => `(${right} - ${left})`
    // },
    {
        label: CalcOpEnum.MUL, suan: (left: number, right: number) => {
            return left * right
        }, map_str: (left: any, right: any) => `(${left} * ${right})`
    },
    {
        label: CalcOpEnum.DIV, suan: (left: number, right: number) => {
            return left / right
        }, map_str: (left: any, right: any) => `(${left} / ${right})`
    },
    // {
    //     label: 'div-revert', suan: (left: number, right: number) => {
    //         return right / left
    //     }, map_str: (left: any, right: any) => `(${right} / ${left})`
    // },

]

export class Solution {
    private target = 24
    /**
     * @deprecated
     */
    used: { index: number, label: string }[] = []
    /**
     * @deprecated
     */
    result_list: { index: number, label: string }[][] = []
     result_list2: SolutionNode[] = []

    equal(a: number, b: number) {
        if (Math.abs(a - b) < 0.00001) {
            return true
        }
        return false
    }

    /**
     * @public
     * @param target
     * @param nums
     */
    real_solution(target: number, nums: number[]) {
        console.log('solution start==', target, nums)
        this.target = target
        this.solution2(nums.map(it => new SolutionNode(it)))

    }



    private solution2(nums: SolutionNode[]) {

        for (let i = 0; i < nums.length; ++i) {

            const first = nums[i]
            for (let k = 0; k < nums.length; ++k) {

                const second = nums[k]
                if (first === second) {
                    continue
                }
                for (let j = 0; j < suan_list.length; ++j) {
                    let suan1 = suan_list[j]
                    const result = new SolutionNode()
                    result.left = first
                    result.right = second
                    result.op = suan1

                    if (nums.length !== 2) {

                        const next = [...nums].filter(it => it !== first && it !== second)
                        next.push(result)

                        this.solution2(next)
                    } else {


                        const currentResult = result.getResult()
                        if (this.equal(this.target, currentResult)) {

                            this.result_list2.push(result)
                        }
                    }
                }
            }

        }
    }



    map_str_v2(it: SolutionNode) {
        return it.getPrintStr()
    }


}


export class SolutionNode {
    left?: SolutionNode
    right?: SolutionNode
    op?: (typeof suan_list)[number]
    result? = 0
    calc_result?: number
    calc_print_str?: string

    constructor(result?: number) {
        this.result = result
    }

    getResult(): number {
        if (!this.left || !this.right || !this.op) {
            return this.result!
        }
        if (this.calc_result === undefined) {


            this.calc_result = this.op.suan(this.left.getResult(), this.right.getResult())
        }
        return this.calc_result
    }
    getPrintStr(): string {
        if (!this.left || !this.right || !this.op) {
            return String(this.result)
        }
        if (!this.calc_print_str) {
            this.calc_print_str = mapStr(this.left.getPrintStr(), this.right.getPrintStr(), this.op.label)

        }
        return this.calc_print_str

    }

}