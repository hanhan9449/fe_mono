const start_suan = {label: 'start', suan: (_left: number, right: number) => {return right}, map_str: (_left: any, right: any) => `${right}`}
export const suan_list = [

    {label: 'add', suan: (left: number, right: number) => {return left + right}, map_str: (left: any, right: any) => `(${left} + ${right})`},
    {label: 'minus', suan: (left: number, right: number) => {return left - right}, map_str: (left: any, right: any) => `(${left} - ${right})`},
    {label: 'minus-revert', suan: (left: number, right: number) => {return right - left}, map_str: (left: any, right: any) => `(${right} - ${left})`},
    {label: 'mul', suan: (left: number, right: number) => {return left * right}, map_str: (left: any, right: any) => `(${left} * ${right})`},
    {label: 'div', suan: (left: number, right: number) => {return left / right}, map_str: (left: any, right: any) => `(${left} / ${right})`},
    {label: 'div-revert', suan: (left: number, right: number) => {return right / left}, map_str: (left: any, right: any) => `(${right} / ${left})`},

]

export class Solution {
    target = 24
    nums = [1,2,3,4]
    used: {index: number, label: string}[] = []
    result_list: {index: number, label: string}[][] = []
    result_list2: SolutionNode[] = []
    equal(a: number, b: number) {
        if (Math.abs(a - b) < 0.00001) {
            return true
        }
        return false
    }
    real_solution(target: number, nums: number[]) {
        console.log('solution start==', target, nums)
        this.used = []
        this.result_list = []
        this.target = target
        this.nums = nums
        // this.solution()
        this.solution2(nums.map(it => new SolutionNode(it)))
        this.print_solution_list()
    }


    solution2(nums: SolutionNode[]) {
        
        for (let i = 0; i < nums.length; ++i) {
            const pre = [...nums]
            const first = nums.splice(i, 1)[0]
            
            for (let k = 0; k < nums.length; ++k) {
                const pre2 = [...nums]
                const second = nums.splice(k, 1)[0]
                for (let j = 0; j < suan_list.length; ++j) {
                    let suan1 = suan_list[j]
                    const {label, suan} = suan1
                    const result = new SolutionNode()
                    result.left = first
                    result.right = second
                    result.op = suan1
                    nums.push(result)
                    if (nums.length !== 1) {
                        this.solution2(nums)
                    }
                    if (this.equal(this.target, result.getResult())) {
                        this.result_list2.push(result)
                    }
                }
                nums = pre2
            }
            nums = pre
            
        }
    }
    solution(current: null | number = null) {
        for (let i = 0; i < this.nums.length; ++i) {
            if (this.used.find(it => it.index === i)) {
                continue
            }

            for (let j = 0; j < suan_list.length; ++j) {
                let suan1 = suan_list[j]
                if (current === null) {
                    suan1 = start_suan
                }
                const {label, suan} = suan1

                const result = suan(current as any, this.nums[i])
                this.used.push({index: i, label})
                if (this.used.length !== this.nums.length) {
                    this.solution(result)
                }
                if (this.equal(this.target, result) && this.used.length === this.nums.length) {
                    this.result_list.push([...this.used])
                    this.used.pop()
                    return this.used
                }
                this.used.pop()
            }
        }
        return this.result_list
    }
    map_str(it: {index: number, label: string}[]) {
        let result = '0'
        for (const item of it) {
            const map_str = [start_suan, ...suan_list].find(it => it.label === item.label)?.map_str

            result = map_str?.(result, this.nums[item.index]) || 'bad_case'

        }
        return result
    }
    print_solution_list() {
        let list = []
        // console.log(this.result_list)
        for (let i = 0; i < this.result_list.length; ++i) {
            let result = '0'
            for (const item of this.result_list[i]) {
                const map_str = [start_suan, ...suan_list].find(it => it.label === item.label)?.map_str

                result = map_str?.(result, this.nums[item.index]) || 'bad_case'

            }
            list.push(result)
        }
        console.log(Array.from(new Set(list)))
    }
}
// const a = new Solution()
// a.real_solution(24,[1,2,3,4])
// // a.real_solution(24,[2,4,3,1])
// a.real_solution(24,[5,5,5,1])
// // a.real_solution(24,[5,1,5,1])
// a.real_solution(24, [4,4,10,10])
// a.real_solution(24,[6,9,9,10])
// a.real_solution(24,[1,6,11,13])
// a.real_solution(24,[2,5,5,10])
// // a.real_solution(24, [3,3,8,8])

export class SolutionNode {
    left?: SolutionNode
    right?: SolutionNode
    op?: (typeof suan_list)[number]
    result = 0
    constructor(result?: number) {
        this.result = result
    }
    getResult(): number {
        if (!this.left || !this.right || !this.op) {
            return this.result
        }
        return this.op.suan(this.left.getResult(), this.right.getResult())

    }

}