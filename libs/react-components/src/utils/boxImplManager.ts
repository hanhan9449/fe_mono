export class BoxImplManager {
    private static instance: BoxImplManager;
    private impls: Map<string, any>;
    private constructor() {
        this.impls = new Map<string, any>();
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
    public registerFallbackBoxImpl(boxImpl: any) {
        this.fallbackImpl = boxImpl
    }

    public getBoxImpl(data: any): any {
        return this.impls.get(data?.type) || this.fallbackImpl;
    }
}

    
        