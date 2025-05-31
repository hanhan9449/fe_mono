import React, {useState, useEffect, useRef} from 'react';
import './InteractiveCircles.css';

export const ReactInteractiveCircles = () => {
    const [circle1Position, setCircle1Position] = useState({x: '60%', y: '50%'});
    const [circle2Position, setCircle2Position] = useState({x: '40%', y: '50%'});
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        // 初始位置（重叠）
        setCircle1Position({x: '60%', y: '50%'});
        setCircle2Position({x: '40%', y: '50%'});

        // 鼠标移动事件处理
        const handleMouseMove = (e: any) => {
            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // 计算鼠标偏离中心的比例（-1 到 1）
            const deltaX = ((mouseX / rect.width) - 0.5) * 2;
            const deltaY = ((mouseY / rect.height) - 0.5) * 2;

            // 计算距离中心的距离（0 到 1）
            const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // 应用对数变换 - 使用对数函数使外圈移动更困难
            // 我们需要对距离进行归一化处理，因为log(1) = 0，log(0) 无定义
            const normalizedDistance = 0.9 * distanceFromCenter; // 将距离缩放到0.9以内，避免log(1)
            const logFactor = normalizedDistance === 0
                ? 0
                : (Math.log(1 + normalizedDistance) / Math.log(2)); // 使用以2为底的对数


            // 计算归一化方向
            const normalizedX = deltaX / (distanceFromCenter || 1); // 避免除以零
            const normalizedY = deltaY / (distanceFromCenter || 1);

            // 最大偏移量（百分比）
            const maxOffsetPercent = 10;

            // 计算最终偏移量（百分比）
            const offsetXPercent = normalizedX * logFactor * maxOffsetPercent;
            const offsetYPercent = normalizedY * logFactor * maxOffsetPercent;

            // 设置圆圈位置
            const circle1XPercent = 50 - offsetXPercent;
            const circle1YPercent = 50 - offsetYPercent;
            const circle2XPercent = 50 + offsetXPercent;
            const circle2YPercent = 50 + offsetYPercent;

            // 更新状态
            setCircle1Position({x: `${circle1XPercent}%`, y: `${circle1YPercent}%`});
            setCircle2Position({x: `${circle2XPercent}%`, y: `${circle2YPercent}%`});
        };

        // 触摸设备支持
        const handleTouchMove = (e: any) => {
            e.preventDefault();
            const rect = container.getBoundingClientRect();
            const touch = e.touches[0];
            handleMouseMove({clientX: touch.clientX, clientY: touch.clientY, currentTarget: container});
        };

        // 窗口大小变化事件处理
        const handleResize = () => {
            // 重新设置初始位置
            setCircle1Position({x: '50%', y: '50%'});
            setCircle2Position({x: '50%', y: '50%'});
        };

        // 添加事件监听器
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('touchmove', handleTouchMove, {passive: false});
        window.addEventListener('resize', handleResize);

        // 清理函数
        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="interactive-container"
        >

            <div className="center-marker"></div>

            {/* 蓝色圆圈 */}
            <div
                className="circle circle1"
                style={{
                    left: circle1Position.x,
                    top: circle1Position.y
                }}
            >AwemeBlog</div>

            {/* 粉色圆圈 */}
            <div
                className="circle circle2"
                style={{
                    left: circle2Position.x,
                    top: circle2Position.y
                }}
            >Welcome</div>
        </div>
    );
};
