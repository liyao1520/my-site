import { Application } from '@pixi/app';
import { InternalModel } from 'pixi-live2d-display';
import { Live2DModel } from 'pixi-live2d-display';

export declare interface IRenderOptions {
    /**
     * live2d模型配置文件路径
     */
    modelURL: string;
    /**
     * 背景透明度
     */
    backgroundAlpha?: number;
    /**
     * 背景颜色
     */
    backgroundColor?: number;
    /**
     * 自动交互 默认 false
     */
    autoInteract?: boolean;
    /**
     * 音频采样率,默认48000
     */
    samplesPerSec?: number;
    [key: string]: any;
}

export declare class Live2DModelLipSync {
    private static live2dModelView;
    static render(canvas: HTMLCanvasElement, options: IRenderOptions): Promise<Live2DModelView>;
}

export declare class Live2DModelView {
    readonly model: Live2DModel<InternalModel>;
    readonly app: Application;
    readonly motionSync: MotionSync;
    constructor(model: Live2DModel<InternalModel>, app: Application, motionSync: MotionSync);
    private modelUpdateWithMotionSync;
}

declare class MotionSync {
    private audioBuffer;
    private audioSource;
    private previousSamplePosition;
    private audioElapsedTime;
    private audioContextPreviousTime;
    private _motionSync;
    private _model;
    private soundBuffer;
    get audioContext(): AudioContext;
    constructor(model: any);
    private loadAudio;
    private loadAudioBuffer;
    private resetMouthStatus;
    reset(): void;
    play(src: string | AudioBuffer): Promise<void>;
    updateMotionSync(): void;
    private removeProcessedData;
    loadMotionSync(buffer: ArrayBuffer, size: number, samplesPerSec?: number): void;
}

export { }
