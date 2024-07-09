interface ErrorData {
    message?: string;
    source?: string;
    lineno?: number;
    colno?: number;
    error?: Error | undefined;
}

interface PerformanceData {
    loadTime: number;
}

interface UserEvent {
    eventName: string;
    target: string;
}

class FrontendMonitoringSDK {
    private config: any; // 可根据需要具体指定类型
    private errors: ErrorData[];
    private performanceData: PerformanceData[];
    private userEvents: UserEvent[];

    constructor(config: any) {
        // 同样，config 类型可根据需要具体指定
        this.config = config;
        this.errors = [];
        this.performanceData = [];
        this.userEvents = [];
        this.init();
    }

    private init(): void {
        // 监听错误事件
        window.onerror = (message, source, lineno, colno, error) => {
            this.handleError({
                message,
                source,
                lineno,
                colno,
                error,
            });
        };

        // 监听页面加载事件
        window.addEventListener('load', () => {
            this.reportPerformance();
        });

        // 监听用户行为事件
        document.addEventListener('click', (event) => {
            this.trackUserEvent('click', (event.target as HTMLElement).tagName);
        });
    }

    private handleError(error: ErrorData): void {
        this.errors.push(error);
        this.reportError(error);
    }

    private reportError(error: ErrorData): void {
        throw new Error('Error reported: ' + error);
        // 发送错误报告到后端
        console.error('Error reported:', error);
    }

    private reportPerformance(): void {
        const timing = window.performance.timing;
        if (timing) {
            // 使用 domContentLoadedEventEnd 和 navigationStart 来计算页面加载时间
            const loadTime = timing.domContentLoadedEventEnd - timing.navigationStart;

            const performanceData: PerformanceData = {
                loadTime: loadTime,
            };

            this.performanceData.push(performanceData);
            console.log('Performance data reported:', performanceData);
        } else {
            console.error('Performance timing information is not available.');
        }
    }

    private trackUserEvent(eventName: string, target: string): void {
        // 记录用户行为事件
        const userEvent: UserEvent = {
            eventName,
            target,
        };
        this.userEvents.push(userEvent);
        console.log('User event tracked:', userEvent);
    }
}

export default FrontendMonitoringSDK;
