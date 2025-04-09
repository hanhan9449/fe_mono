export class BoxImplManager {
    private static instance: BoxImplManager;
    private impls: Map<string, any>;
    private extraImpls: Map<string, {matcher: any, impl: any}[]>
    private constructor() {
        this.impls = new Map<string, any>();
        this.extraImpls = new Map();
    }
    private fallbackImpl: any;
    public static getInstance(): BoxImplManager {
        if (!BoxImplManager.instance) {
            BoxImplManager.instance = new BoxImplManager();
        }
        return BoxImplManager.instance
    }

    public registerBoxImpl(boxName: string, boxImpl: any) {
        this.impls.set(boxName, boxImpl);
    }
    public registerBoxImplByRecord(boxImplMap: Record<string, any>) {
        for (const [key, impl] of Object.entries(boxImplMap)) {
            this.impls.set(key, impl);
        }
       
    }
    public registerExtraBoxImpl(boxName: string, boxImpl: any, matcher: any) {
        const list = this.extraImpls.get(boxName) || []
        list.push({matcher, impl: boxImpl})
        this.extraImpls.set(boxName, list)

    }
    public registerFallbackBoxImpl(boxImpl: any) {
        this.fallbackImpl = boxImpl
    }

    public getBoxImpl(data: any): any {
        const extraImplList = this.extraImpls.get(data?.type)
        if (extraImplList) {


        for (const implObj of extraImplList) {
            if (implObj.matcher(data)) {
                return implObj.impl
            }
        }
        }
        return this.impls.get(data?.type) || this.fallbackImpl;
    }
}

    
        